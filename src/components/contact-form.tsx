import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Eyebrow } from "@/components/layout";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success">
        <Check aria-hidden="true" />
        <Eyebrow>Message received</Eyebrow>
        <h3>That’s a good first step.</h3>
        <p>Thank you for reaching out. We’ll review your note and come back with a useful next step.</p>
        <button type="button" onClick={() => setSubmitted(false)} className="reset-button">
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
      <button type="submit" className="button button-dark form-submit">
        Send enquiry <ArrowRight aria-hidden="true" />
      </button>
      <p className="privacy-note">
        Your note can also be sent directly to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </form>
  );
}
