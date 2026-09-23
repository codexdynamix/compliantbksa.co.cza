import { createFileRoute } from "@tanstack/react-router";
import { ApproachSection, ContactSection, EditorialSection, InteriorHero, StandardSection } from "@/components/sections";

export const Route = createFileRoute("/approach")({ component: ApproachPage });

function ApproachPage() {
  return (
    <>
      <InteriorHero
        kicker="The way we work"
        title={
          <>
            Clear books. Thoughtful <em>reporting.</em>
          </>
        }
        intro="At Compliant Bookkeeping SA, the work starts with a conversation. We bring professional accounting, payroll and compliance to clients who want the numbers handled — and explained — without the noise."
        index="01"
      />
      <ApproachSection />
      <EditorialSection />
      <StandardSection />
      <ContactSection />
    </>
  );
}
