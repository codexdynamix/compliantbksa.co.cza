import { createFileRoute } from "@tanstack/react-router";
import { ContactSection, FitSection, InteriorHero, ServicesList } from "@/components/sections";
import { Eyebrow } from "@/components/layout";

export const Route = createFileRoute("/services")({ component: ServicesPage });

function ServicesPage() {
  return (
    <>
      <InteriorHero
        kicker="What we do"
        title={
          <>
            The right detail. The wider <em>view.</em>
          </>
        }
        intro="From the first transaction to a finished set of statements, we bring specialist focus to accuracy, deadlines and a pack you can take into the next conversation."
        index="02"
      />
      <section className="services-section services-page-section">
        <div className="section-inner">
          <div className="section-heading services-heading">
            <div>
              <Eyebrow>Nine disciplines</Eyebrow>
              <h2>
                Less admin. More <em>agency.</em>
              </h2>
            </div>
            <p>Choose the support your business needs now. We can grow the relationship as the picture changes.</p>
          </div>
          <ServicesList />
        </div>
      </section>
      <FitSection />
      <ContactSection />
    </>
  );
}
