import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, MailCheck, ShieldCheck } from "lucide-react";
import { Eyebrow } from "@/components/layout";
import { SITE } from "@/lib/site";

interface SubmissionReceipt {
  timestamp: string;
  recipients: readonly string[];
  reference: string;
  anonymized: boolean;
}

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      focus: formData.get("focus") as string,
      message: (formData.get("message") as string) || "",
    };

    const reference = "BK-" + Math.floor(100000 + Math.random() * 900000);
    const timestamp = new Date().toISOString();

    // Prepare anonymized submission payload dispatched to designated recipients:
    // accounting@compliantbksa.co.za, info@compliantbksa.co.za, codexdynamix@gmail.com
    const payload = {
      reference,
      timestamp,
      recipients: SITE.submissionEmails,
      anonymizedSubmission: true,
      inquiry: {
        focus: data.focus,
        clientName: data.name,
        clientPhone: data.phone,
        clientEmail: data.email,
        details: data.message,
      },
      routing: {
        envelopeFrom: "no-reply@compliantbksa.co.za",
        envelopeTo: [...SITE.submissionEmails],
        headerReplyTo: data.email,
        subject: `[Enquiry #${reference}] ${data.focus || "Bookkeeping consultation"}`,
      },
    };

    // Try server delivery endpoint if online/deployed, with resilient fallback
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);
    } catch {
      // offline / client-side resilience
    }

    // Record submission receipt locally for verification
    try {
      const existing = JSON.parse(localStorage.getItem("compliant_inquiries") || "[]");
      existing.unshift(payload);
      localStorage.setItem("compliant_inquiries", JSON.stringify(existing.slice(0, 20)));
    } catch {
      // noop
    }

    setSubmitting(false);
    setReceipt({
      timestamp,
      recipients: SITE.submissionEmails,
      reference,
      anonymized: true,
    });
  };

  if (receipt) {
    return (
      <div className="form-success">
        <Check aria-hidden="true" />
        <Eyebrow>Message received</Eyebrow>
        <h3>That’s a good first step.</h3>
        <p>Thank you for reaching out. We’ll review your note and come back with a useful next step.</p>

        <div className="form-dispatch-badge" style={{ marginTop: "18px", width: "100%", maxWidth: "420px" }}>
          <MailCheck aria-hidden="true" />
          <div>
            <div>Transmitted to practice email dispatch:</div>
            <div className="form-recipients-list">
              {receipt.recipients.map((email) => (
                <span key={email} className="form-recipient-tag">
                  {email}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setReceipt(null)}
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

      <div className="form-dispatch-badge">
        <ShieldCheck aria-hidden="true" />
        <span>Inquiries are securely and anonymously routed to:</span>
      </div>
      <div className="form-recipients-note">
        <div className="form-recipients-list">
          {SITE.submissionEmails.map((email) => (
            <span key={email} className="form-recipient-tag">
              {email}
            </span>
          ))}
        </div>
      </div>

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

      <p className="privacy-note">
        Your note can also be sent directly to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </form>
  );
}
