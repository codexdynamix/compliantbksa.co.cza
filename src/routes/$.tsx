import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/layout";

export const Route = createFileRoute("/$")({ component: NotFound });

function NotFound() {
  return (
    <section className="not-found">
      <div className="section-inner">
        <Eyebrow>404 / Not found</Eyebrow>
        <h1>That page took a wrong turn.</h1>
        <p>Let's get you back to the useful stuff.</p>
        <Link to="/" className="button button-dark">
          Back to home <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
