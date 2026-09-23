import { createFileRoute } from "@tanstack/react-router";
import { ContactSection, FitSection, InteriorHero } from "@/components/sections";
import { Eyebrow } from "@/components/layout";

export const Route = createFileRoute("/who-we-help")({ component: WhoWeHelpPage });

function WhoWeHelpPage() {
  return (
    <>
      <InteriorHero
        kicker="Who we help"
        title={
          <>
            Ambition, with the <em>foundations</em> to match.
          </>
        }
        intro="Compliant Bookkeeping SA is for people building something real — with enough momentum to need better answers, and enough care to want them done properly."
        index="03"
      />
      <FitSection />
      <section className="profile-section">
        <div className="section-inner profile-grid">
          <div>
            <Eyebrow>Different stages. Same standard.</Eyebrow>
            <h2>Wherever you are, the question is usually the same.</h2>
          </div>
          <div className="profile-notes">
            <div data-reveal>
              <span>01</span>
              <h3>“Can we see what is really happening?”</h3>
              <p>For founders hiring, investing or preparing to scale.</p>
            </div>
            <div data-reveal>
              <span>02</span>
              <h3>“How do we make the next call well?”</h3>
              <p>For established teams navigating a new chapter.</p>
            </div>
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
