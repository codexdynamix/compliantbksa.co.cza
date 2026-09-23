import { createFileRoute } from "@tanstack/react-router";
import { ContactSection, InteriorHero } from "@/components/sections";
import { Eyebrow } from "@/components/layout";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  return (
    <>
      <InteriorHero
        kicker="Contact us"
        title={
          <>
            Two addresses. Direct lines. A practice you can <em>reach.</em>
          </>
        }
        intro="Write, call, or WhatsApp Compliant Bookkeeping SA — we love meeting new clients and practices."
        index="05"
      />
      <ContactSection />
      <section className="contact-note">
        <div className="section-inner contact-note-inner">
          <div>
            <Eyebrow>What happens next</Eyebrow>
            <h2>
              Tell us what is on the <em>books.</em>
            </h2>
          </div>
          <div className="next-steps">
            <div data-reveal>
              <span>CAPE TOWN</span>
              <p>{SITE.capeTown}</p>
              <a href={SITE.mapsCapeTown} target="_blank" rel="noreferrer">
                Open in Maps
              </a>
            </div>
            <div data-reveal>
              <span>CERES</span>
              <p>{SITE.ceres}</p>
              <a href={SITE.mapsCeres} target="_blank" rel="noreferrer">
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
