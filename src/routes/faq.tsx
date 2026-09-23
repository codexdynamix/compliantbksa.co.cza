import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ContactSection, FaqSection, InteriorHero } from "@/components/sections";
import { Eyebrow } from "@/components/layout";

export const Route = createFileRoute("/faq")({ component: FaqPage });

function FaqPage() {
  return (
    <>
      <InteriorHero
        kicker="Good to know"
        title={
          <>
            The useful answers, <em>up front.</em>
          </>
        }
        intro="A first conversation should feel straightforward. Here are the questions we hear most often."
        index="04"
      />
      <FaqSection />
      <section className="faq-callout">
        <div className="section-inner callout-inner">
          <div>
            <Eyebrow>Still wondering?</Eyebrow>
            <h2>
              Bring the question. We'll bring the <em>context.</em>
            </h2>
          </div>
          <Link to="/contact" className="button button-accent">
            Start a conversation <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
