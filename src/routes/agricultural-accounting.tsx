import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ContactSection, InteriorHero } from "@/components/sections";
import { Eyebrow } from "@/components/layout";
import { agriculturalServices } from "@/lib/site";

export const Route = createFileRoute("/agricultural-accounting")({ component: AgriculturalPage });

function AgriculturalPage() {
  return (
    <>
      <InteriorHero
        kicker="Specialist desk"
        title={
          <>
            Agricultural <em>accounting.</em>
          </>
        }
        intro="Helping farmers stay compliant, financially organised and finance-ready. Farming has its own calendar, its own cash cycle, and its own SARS questions."
        index="06"
      />
      <section className="source-feature-section">
        <div className="section-inner source-feature-grid">
          <div className="source-feature-copy" data-reveal>
            <Eyebrow>Services include</Eyebrow>
            <h2>
              Built around the farming <em>year.</em>
            </h2>
            <p>This is the specialist desk for agricultural accounting — from record keeping to funding proposals.</p>
            <img src="/site/farm-mast.webp" alt="Western Cape farmland" />
          </div>
          <ol className="source-ledger-list">
            {agriculturalServices.map(([title, text], index) => (
              <li key={title} data-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="source-season-section">
        <div className="section-inner source-season-inner" data-reveal>
          <Eyebrow>Why it is different</Eyebrow>
          <h2>
            The season is the real financial <em>year.</em>
          </h2>
          <ul>
            <li>Books that follow planting, livestock and payout cycles</li>
            <li>VAT, diesel and farming tax treated as specialist work</li>
            <li>Lender-ready statements, models and cash-flow notes</li>
          </ul>
          <img src="/site/farm-banner.webp" alt="Western Cape farmland at dusk" />
        </div>
      </section>
      <section className="band-light">
        <div className="section-inner band-copy">
          <Eyebrow>Farm packages</Eyebrow>
          <h2>Farm accounting packages from R1,500 per month</h2>
          <p>Pricing is based on farm size, transaction volume, payroll and services required.</p>
          <Link to="/contact" className="text-link">
            Agricultural enquiry <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
