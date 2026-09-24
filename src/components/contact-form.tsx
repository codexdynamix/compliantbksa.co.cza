import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, AlertCircle, Phone, MessageSquare, Mail } from "lucide-react";
import { Eyebrow } from "@/components/layout";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: (formData.get("name") as string)?.trim() || "",
      phone: (formData.get("phone") as string)?.trim() || "",
      email: (formData.get("email") as string)?.trim() || "",
      focus: (formData.get("focus") as string)?.trim() || "",
      message: (formData.get("message") as string)?.trim() || "",
    };

    const timestamp = new Date().toISOString();

    // Payload delivered separately to codexdynamix@gmail.com and accounting@compliantbksa.co.za
    const payload = {
      // Top-level fields
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.focus || "General Bookkeeping Inquiry",
      focus: data.focus,
      message: data.message || `Consultation request regarding ${data.focus || "bookkeeping services"}.`,
      timestamp,
      recipients: SITE.submissionEmails,
      // Nested structures for backward/alternate parsers
      inquiry: {
        focus: data.focus,
        clientName: data.name,
        clientPhone: data.phone,
        clientEmail: data.email,
        details: data.message || `Consultation request regarding ${data.focus || "bookkeeping services"}.`,
      },
      routing: {
        envelopeFrom: "info@compliantbksa.co.za",
        envelopeTo: [...SITE.submissionEmails],
        headerReplyTo: data.email,
        subject: `Website Inquiry: ${data.name || "Client"} (${data.focus || "Bookkeeping"})`,
      },
    };

    let delivered = false;
    let serverError = "";

    try {
      // Try primary API endpoint (rewritten to contact.php on Apache/LiteSpeed, or Node server)
      let resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      // If /api/contact fails or returns non-200, attempt direct PHP script on Hostinger
      if (!resp || !resp.ok) {
        resp = await fetch("/api/contact.php", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        }).catch(() => null);
      }

      if (resp) {
        if (resp.ok) {
          const resData = await resp.json().catch(() => ({ success: true }));
          if (resData.success !== false) {
            delivered = true;
          } else {
            serverError = resData.error || "The server could not process the submission.";
          }
        } else {
          const resData = await resp.json().catch(() => null);
          serverError = resData?.error || `Server responded with status ${resp.status}`;
        }
      } else {
        serverError = "Network connection to mail server could not be established.";
      }

      // If backend endpoints did not succeed, attempt direct browser dispatch to all 3 departments
      if (!delivered) {
        try {
          const directDeliveries = await Promise.allSettled(
            SITE.submissionEmails.map((dest) =>
              fetch(`https://formsubmit.co/ajax/${encodeURIComponent(dest)}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  _subject: `Website Inquiry: ${data.name} (${payload.service})`,
                  _replyto: data.email,
                  _captcha: "false",
                  "Client Name": data.name,
                  "Client Email": data.email,
                  "Client Phone": data.phone || "Not provided",
                  "Service Requested": payload.service,
                  Message: payload.message,
                }),
              })
            )
          );
          const anyDirectSuccess = directDeliveries.some(
            (r) => r.status === "fulfilled" && r.value.ok
          );
          if (anyDirectSuccess) {
            delivered = true;
          }
        } catch {
          // preserve serverError if direct fallback fails
        }
      }
    } catch (err: unknown) {
      serverError = err instanceof Error ? err.message : "Submission error occurred.";
    }

    // Always preserve local backup in browser storage
    try {
      const existing = JSON.parse(localStorage.getItem("compliant_inquiries") || "[]");
      existing.unshift({ ...payload, delivered });
      localStorage.setItem("compliant_inquiries", JSON.stringify(existing.slice(0, 25)));
    } catch {
      // ignore storage errors
    }

    setSubmitting(false);

    if (delivered) {
      setSubmitted(true);
    } else {
      setErrorMessage(
        serverError || "We were unable to deliver your note automatically. Please contact us directly via WhatsApp or phone below."
      );
    }
  };

  if (submitted) {
    return (
      <div className="form-success">
        <Check aria-hidden="true" />
        <Eyebrow>Thank you</Eyebrow>
        <h3>Thank you, we will be in touch.</h3>
        <p>We have received your message and will be in touch shortly.</p>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setErrorMessage(null);
          }}
          className="reset-button"
        >
          Send another note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submitForm} className="consultation-form">
      <div className="form-heading">
        <Eyebrow>Send a note</Eyebrow>
        <h3>Tell us what’s on the books.</h3>
      </div>

      {errorMessage && (
        <div
          role="alert"
          style={{
            padding: "16px",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            color: "#991b1b",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, marginBottom: "6px" }}>
            <AlertCircle size={18} />
            <span>Delivery Notice</span>
          </div>
          <p style={{ margin: "0 0 12px" }}>{errorMessage}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "13px" }}>
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                backgroundColor: "#166534",
                color: "#ffffff",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              <MessageSquare size={14} /> WhatsApp Us
            </a>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent("Bookkeeping Inquiry")}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                backgroundColor: "#ffffff",
                border: "1px solid #d1d5db",
                color: "#374151",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              <Mail size={14} /> Email Direct
            </a>
            <a
              href={SITE.phoneHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                backgroundColor: "#ffffff",
                border: "1px solid #d1d5db",
                color: "#374151",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              <Phone size={14} /> {SITE.phone}
            </a>
          </div>
        </div>
      )}

      <div className="form-fields-two">
        <label>
          <span className="field-label">Your name</span>
          <input required name="name" type="text" placeholder="First and last name" autoComplete="name" suppressHydrationWarning />
        </label>
        <label>
          <span className="field-label">Phone number</span>
          <input required name="phone" type="tel" inputMode="tel" placeholder={SITE.phone} autoComplete="tel" suppressHydrationWarning />
        </label>
      </div>
      <label>
        <span className="field-label">Email address</span>
        <input required name="email" type="email" placeholder={SITE.email} autoComplete="email" suppressHydrationWarning />
      </label>
      <label>
        <span className="field-label">What would you like help with?</span>
        <select required name="focus" defaultValue="" suppressHydrationWarning>
          <option value="" disabled>
            Select a focus
          </option>
          <option value="bookkeeping">Bookkeeping and reporting</option>
          <option value="tax">VAT and tax</option>
          <option value="payroll">Payroll</option>
          <option value="agricultural">Agricultural accounting</option>
          <option value="outsource">Outsourcing for my firm</option>
          <option value="pricing">Pricing for my business</option>
          <option value="other">Something else</option>
        </select>
      </label>
      <label>
        <span className="field-label">
          A little context <small>(optional)</small>
        </span>
        <textarea
          name="message"
          rows={3}
          placeholder="Share the software you use, the deadlines that worry you, and what “done” looks like."
          suppressHydrationWarning
        />
      </label>

      <button type="submit" disabled={submitting} className="button button-dark form-submit">
        {submitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" /> Submitting...
          </>
        ) : (
          <>
            Send enquiry <ArrowRight aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
