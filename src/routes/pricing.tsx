import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { ContactSection, InteriorHero } from "@/components/sections";
import { Eyebrow } from "@/components/layout";
import { priceTiers } from "@/lib/site";

export const Route = createFileRoute("/pricing")({ component: PricingPage });

function PricingPage() {
  return (
    <>
      <InteriorHero
        kicker="Pricing"
        title={
          <>
            Clear packages. <em>Scoped to the books.</em>
          </>
        }
        intro="Monthly accounting starts from R1,000. The right package depends on the size of the entity, transaction volume, payroll and the services you need — we confirm that before any work begins."
        index="08"
      />
      <section className="pricing-tiers">
        <div className="section-inner pricing-grid">
          {priceTiers.map((tier) => (
            <article key={tier.size} className={tier.featured ? "pricing-card pricing-card-featured" : "pricing-card"} data-reveal>
              {tier.featured ? <span className="pricing-flag">Typical starting range</span> : null}
              <Eyebrow>{tier.size}</Eyebrow>
              <strong>{tier.price}</strong>
              <p>{tier.detail}</p>
              {"quote" in tier && tier.quote ? (
                <Link to="/contact" className="button button-dark">
                  Request a quote <ArrowRight aria-hidden="true" />
                </Link>
              ) : (
                <Link to="/contact" className="text-link">
                  Talk about this package <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </article>
          ))}
        </div>
        <p className="section-inner pricing-note">
          Figures are example monthly starting points, excluding VAT where applicable. Final fees are confirmed after
          we see the software, the volume and the deadlines.
        </p>
      </section>
      <section className="pricing-includes">
        <div className="section-inner pricing-includes-inner">
          <div>
            <Eyebrow>What a package typically covers</Eyebrow>
            <h2>
              The work that keeps you <em>compliant.</em>
            </h2>
            <p>
              Every engagement is scoped. The list below is the core of most monthly retainers — we add or leave out
              according to the entity.
            </p>
          </div>
          <ul>
            {[
              "Monthly bookkeeping and bank reconciliations",
              "SARS, VAT, PAYE and related returns as scoped",
              "CIPC housekeeping kept on the calendar",
              "Payroll, UIF/uFiling and COIDA where required",
              "A pack you can actually use — not just a file dump",
            ].map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="band-dark">
        <div className="section-inner band-copy">
          <Eyebrow>Farm packages</Eyebrow>
          <h2>Farm accounting packages from R1,500 per month</h2>
          <p>Pricing is based on farm size, transaction volume, payroll and services required.</p>
          <Link to="/agricultural-accounting" className="text-link text-link-light">
            See agricultural accounting <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
