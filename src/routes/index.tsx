import { createFileRoute } from "@tanstack/react-router";
import {
  AffiliationsSection,
  ApproachSection,
  ContactSection,
  EditorialSection,
  FaqSection,
  FitSection,
  Hero,
  HomePricingBand,
  PracticeProof,
  ServicesSection,
  SoftwareSection,
  StandardSection,
} from "@/components/sections";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <Hero />
      <PracticeProof />
      <AffiliationsSection />
      <SoftwareSection />
      <HomePricingBand />
      <ApproachSection />
      <EditorialSection />
      <ServicesSection />
      <FitSection />
      <StandardSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
