import { createFileRoute } from "@tanstack/react-router";
import { ContactSection, InteriorHero } from "@/components/sections";
import { Eyebrow } from "@/components/layout";
import { outsourceServices } from "@/lib/site";

export const Route = createFileRoute("/outsource")({ component: OutsourcePage });

function OutsourcePage() {
  const steps = [
    ["Call us", "Book a conversation. We learn the software, the review standard, and where the bottleneck is."],
    ["We plan", "A package that suits the size of the file, the industry, and how you like work delivered."],
    ["You sleep easy", "We get to work. You review. Your clients stay yours."],
  ] as const;

  return (
    <>
      <InteriorHero
        kicker="For practices"
        title={
          <>
            Outsource to us. <em>Keep the client.</em>
          </>
        }
        intro="Hassle-free accounting, tax & bookkeeping — on your terms. We handle the numbers so your business or practice can take flight."
        index="07"
      />
      <section className="outsource-belief">
        <div className="section-inner">
          <Eyebrow>Need extra capacity without hiring more staff?</Eyebrow>
          <h2>
            Focus on serving your clients. <em>We will handle the numbers.</em>
          </h2>
          <p>
            You did not build a practice to live in working papers. Time spent catching up books, payroll and VAT
            is time you are not spending on the relationships that grow the firm. Outsource the production. Keep
            the client.
          </p>
        </div>
      </section>
      <section className="source-scope-section">
        <div className="section-inner">
          <div className="source-scope-heading">
            <Eyebrow>What we take on</Eyebrow>
            <h2>
              A full-service team, behind your <em>name.</em>
            </h2>
          </div>
          <div className="source-scope-list">
            {outsourceServices.map(([title, text]) => (
              <div key={title} data-reveal>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="source-plan-section">
        <div className="section-inner">
          <Eyebrow>The 3-step plan</Eyebrow>
          <h2>
            The building blocks for extra <em>capacity.</em>
          </h2>
          <div className="source-plan-grid">
            {steps.map(([title, text], index) => (
              <div key={title} data-reveal>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <ul className="source-benefits">
            <li>Overflow in peak VAT and year-end without a permanent hire</li>
            <li>Workpapers prepared to your review notes</li>
            <li>Sage Accounting, Sage Payroll and Xero — no software migration required</li>
          </ul>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
