import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calculator,
  Check,
  ChevronDown,
  Clock3,
  FileSpreadsheet,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow, HeroDock } from "@/components/layout";
import { faqs, services, SITE } from "@/lib/site";

const serviceIcons = [Calculator, BarChart3, Landmark, FileSpreadsheet, FileSpreadsheet, TrendingUp, ShieldCheck, BarChart3, Landmark];

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-copy">
          <Eyebrow>Professional accounting</Eyebrow>
          <h1 className="hero-title animate-rise delay-1">
            Keeping your books <em>compliant.</em>
          </h1>
          <p className="hero-intro animate-rise delay-2">
            Compliant Bookkeeping SA is your finance and compliance partner, providing accurate accounting and
            reliable financial support. We handle SARS, CIPC, VAT, PAYE, UIF/uFiling, COIDA and payroll, keeping
            your business compliant and your numbers in order.
          </p>
          <div className="hero-taglines animate-rise delay-2">
            <span>Keeping your books compliant.</span>
            <span>Strengthening your numbers.</span>
            <span>Supporting your growth.</span>
          </div>
          <div className="hero-actions animate-rise delay-3">
            <Link to="/contact" className="button button-dark">
              Request a conversation <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="animate-rise delay-4">
            <HeroDock />
          </div>
        </div>
        <div className="hero-visual animate-rise delay-2">
          <figure className="hero-source-visual">
            <img src="/site/books.webp" alt="Printed annual financial statements, a fountain pen and a laptop on a desk" />
            <figcaption>
              <strong>The numbers, in order</strong>
              <span>Bookkeeping · Reporting · Financial statements</span>
            </figcaption>
          </figure>
          <aside className="hero-widget" aria-label="Compliance snapshot">
            <div className="hero-widget-top">
              <span className="hero-widget-live" />
              Live activity
            </div>
            <strong>On track</strong>
            <ul>
              <li>
                <span>VAT</span>
                <b>25 Sep</b>
              </li>
              <li>
                <span>PAYE</span>
                <b>Current</b>
              </li>
              <li>
                <span>CIPC</span>
                <b>Filed</b>
              </li>
            </ul>
          </aside>
        </div>
      </div>
      <div className="hero-footerline">
        <span className="hero-scroll">
          <i /> Scroll to explore
        </span>
        <span className="hero-location">Cape Town · South Africa</span>
      </div>
    </section>
  );
}

export function PracticeProof() {
  return (
    <section className="practice-proof" aria-label="Practice highlights">
      <div className="section-inner">
        <div className="practice-proof-heading">
          <Eyebrow>Built for the real work</Eyebrow>
          <h2>
            Professional standards. Clear <em>support.</em>
          </h2>
          <p>Two Western Cape offices, one standard of work. Reach the practice by the channel that suits you.</p>
        </div>
        <div className="practice-proof-grid">
          <div className="practice-proof-card">
            <Phone aria-hidden="true" />
            <Eyebrow>Reachable</Eyebrow>
            <h3>Phone, WhatsApp or email</h3>
            <p>A practice you can actually reach — by the channel that suits you.</p>
          </div>
          <div className="practice-proof-card">
            <ShieldCheck aria-hidden="true" />
            <Eyebrow>Affiliated</Eyebrow>
            <h3>Professional bodies</h3>
            <p>SAICA, SAIPA and CIBA — professional bodies your clients already recognise.</p>
          </div>
          <div className="practice-proof-card">
            <FileSpreadsheet aria-hidden="true" />
            <Eyebrow>Software</Eyebrow>
            <h3>Familiar ledgers</h3>
            <p>Sage, Sage Payroll and Xero — we work in the ledgers you already run.</p>
          </div>
          <div className="practice-proof-card">
            <MapPin aria-hidden="true" />
            <Eyebrow>Places</Eyebrow>
            <h3>Cape Town & Ceres</h3>
            <p>Two Western Cape offices, one standard of work.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AffiliationsSection() {
  return (
    <section className="affiliations-section" aria-labelledby="affiliations-title">
      <div className="section-inner">
        <div className="section-heading affiliations-heading">
          <div>
            <Eyebrow>Affiliated to</Eyebrow>
            <h2 id="affiliations-title">
              Professional bodies your clients already <em>recognise.</em>
            </h2>
          </div>
          <p>The supplied affiliation badges are shown as provided, without recolouring or recreating them.</p>
        </div>
        <div className="affiliation-badge-grid">
          <div className="affiliation-badge">
            <img src="/brand/saica.svg" alt="South African Institute of Chartered Accountants" />
            <strong>South African Institute of Chartered Accountants</strong>
          </div>
          <div className="affiliation-badge">
            <img className="affiliation-badge-saipa" src="/brand/saipa.webp" alt="South African Institute of Professional Accountants" />
            <strong>South African Institute of Professional Accountants</strong>
          </div>
          <div className="affiliation-badge">
            <img src="/brand/ciba.png" alt="CIBA — Chartered Institute for Business Accountants NPC" />
            <strong>Professional body your clients already recognise</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SoftwareSection() {
  return (
    <section className="software-section" aria-labelledby="software-title">
      <div className="section-inner software-inner">
        <div className="software-copy">
          <Eyebrow>Software</Eyebrow>
          <h2 id="software-title">
            We use the following <em>software.</em>
          </h2>
          <p>Cloud accounting, payroll and bank feeds in the systems your business or practice already runs.</p>
        </div>
        <div className="software-grid">
          <div className="software-card">
            <img src="/brand/sage.svg" alt="Sage Accounting" />
            <strong>Sage Accounting</strong>
            <span>Accounting and bank feeds</span>
          </div>
          <div className="software-card">
            <img src="/brand/sage.svg" alt="Sage Payroll" />
            <strong>Sage Payroll</strong>
            <span>Payslips and payroll returns</span>
          </div>
          <div className="software-card">
            <img src="/brand/xero.svg" alt="Xero" />
            <strong>Xero</strong>
            <span>Cloud reporting and reconciliations</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePricingBand() {
  return (
    <section className="home-pricing-band" aria-labelledby="home-pricing-title">
      <div className="section-inner home-pricing-inner">
        <div>
          <Eyebrow>Pricing</Eyebrow>
          <h2 id="home-pricing-title">
            R1,000 a <em>month.</em>
          </h2>
          <p>Example monthly starting points. Final fees depend on entity size, transaction volume, payroll and the services you need.</p>
        </div>
        <Link to="/pricing" className="button button-dark">
          See example pricing <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function ApproachSection() {
  return (
    <section id="approach" className="approach-section">
      <div className="section-inner approach-inner">
        <div className="section-marker">
          <Eyebrow>Our approach</Eyebrow>
          <span className="marker-number">01</span>
        </div>
        <div className="approach-content" data-reveal>
          <h2>Your numbers should answer questions, not create more of them.</h2>
          <div className="approach-notes">
            <p>We bring structure to the everyday and perspective to the important moments. No jargon wall. No mysterious month-end.</p>
            <p>Just accurate financial foundations, a clear view of what is changing, and a partner who knows when to zoom in.</p>
          </div>
          <div className="approach-signoff">
            <div className="initials" aria-hidden="true">
              {["C", "M", "N"].map((initial, index) => (
                <span key={initial} className={index === 1 ? "initial-accent" : ""}>
                  {initial}
                </span>
              ))}
            </div>
            <span>A steady hand for the decisions ahead.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialSection() {
  return (
    <section className="visual-break-section" aria-label="A closer look at the Compliant Bookkeeping SA approach">
      <div className="section-inner visual-break-inner">
        <div className="visual-break-copy" data-reveal>
          <Eyebrow>Start with a conversation</Eyebrow>
          <h2>
            Clear books. Thoughtful <em>reporting.</em>
          </h2>
          <p>
            At Compliant Bookkeeping SA, the work starts with a conversation. We bring professional accounting,
            payroll and compliance to clients who want the numbers handled — and explained — without the noise.
          </p>
          <div className="visual-break-caption">
            <span className="caption-dot" aria-hidden="true" />
            No mystery month-end
          </div>
        </div>
        <div className="visual-break-gallery">
          <figure className="visual-break-photo visual-break-photo-wide" data-reveal>
            <img src="/site/meeting.webp" alt="Advisors reviewing management accounts together" />
            <figcaption>01 / A better conversation about the numbers</figcaption>
          </figure>
          <figure className="visual-break-photo visual-break-photo-detail" data-reveal>
            <img src="/site/planning.webp" alt="Advisor reviewing a funding proposal with a client" />
            <figcaption>02 / Details, handled</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function ServicesList() {
  return (
    <div className="service-list">
      {services.map((service, index) => {
        const Icon = serviceIcons[index] ?? Calculator;
        return (
          <article key={service.number} className="service-row" data-reveal>
            <span className="service-number">{service.number}</span>
            <div className="service-icon">
              <Icon aria-hidden="true" />
            </div>
            <div className="service-main">
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
            <span className="service-tag">{service.tag}</span>
            <ArrowUpRight className="service-arrow" aria-hidden="true" />
          </article>
        );
      })}
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="services-section">
      <div className="section-inner">
        <div className="section-heading services-heading">
          <div>
            <Eyebrow>The useful stuff</Eyebrow>
            <h2>
              Finance that <em>moves</em> with you.
            </h2>
          </div>
          <p>The right support changes as your business changes. Start where the friction is.</p>
        </div>
        <ServicesList />
      </div>
    </section>
  );
}

export function FitSection() {
  const fitItems = [
    "A founder making the first serious hires",
    "An SME ready for cleaner management information",
    "An established business navigating a new chapter",
    "A professional with more moving parts than time",
  ];
  return (
    <section id="fit" className="fit-section">
      <div className="section-inner fit-inner">
        <div className="fit-copy" data-reveal>
          <Eyebrow>A good fit looks like</Eyebrow>
          <h2>
            You want a finance partner, not a <em>filing cabinet.</em>
          </h2>
          <p>
            You care about doing things properly, but you have a business to run. You want answers that arrive
            before the deadline — and advice that respects the real-world trade-offs.
          </p>
        </div>
        <div className="fit-list" data-reveal>
          {fitItems.map((item, index) => (
            <div key={item} className="fit-item">
              <span>{`0${index + 1}`}</span>
              <strong>{item}</strong>
            </div>
          ))}
          <Link to="/contact" className="text-link fit-link">
            Let's see if we fit <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function StandardSection() {
  const items = [
    ["01", "Keep you compliant", "SARS, CIPC and payroll dates are our calendar — so they never become yours."],
    ["02", "Strengthen the numbers", "Books that answer questions, not another month-end you have to decode."],
    ["03", "Support your growth", "We start with what is actually happening in the business, not a template."],
  ] as const;
  return (
    <section className="standard-section">
      <div className="section-inner standard-inner">
        <div className="standard-heading">
          <Eyebrow>The Compliant standard</Eyebrow>
          <h2>The work is practical. The difference is how it feels.</h2>
        </div>
        <div className="standard-list">
          {items.map(([number, title, text]) => (
            <div key={number} className="standard-item" data-reveal>
              <Eyebrow>{number}</Eyebrow>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqList() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <div className="faq-list" data-reveal>
      {faqs.map(({ question, answer }, index) => {
        const isOpen = openFaq === index;
        return (
          <div key={question} className="faq-item">
            <button
              type="button"
              onClick={() => setOpenFaq(isOpen ? -1 : index)}
              className="faq-trigger"
              aria-expanded={isOpen}
            >
              <span>{question}</span>
              <ChevronDown className={isOpen ? "faq-chevron faq-chevron-open" : "faq-chevron"} aria-hidden="true" />
            </button>
            <div className={`faq-content ${isOpen ? "open" : ""}`}>
              <div className="faq-answer">
                <p>{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="faq-section">
      <div className="section-inner faq-inner-layout">
        <div>
          <Eyebrow>Good to know</Eyebrow>
          <h2>
            Before we <em>talk.</em>
          </h2>
        </div>
        <FaqList />
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-inner contact-inner">
        <div className="contact-copy">
          <Eyebrow muted>Make the numbers useful</Eyebrow>
          <h2>
            A clearer next step starts <em>here.</em>
          </h2>
          <p>
            Write, call, or WhatsApp Compliant Bookkeeping SA. Tell us what is on the books and we will come back
            with a practical next step — never a hard sell.
          </p>
          <div className="contact-details">
            <div>
              <Clock3 aria-hidden="true" /> Two offices in the Western Cape
            </div>
            <div>
              <ShieldCheck aria-hidden="true" /> No obligation, no hard sell
            </div>
          </div>
          <div className="contact-directory" aria-label="Contact details">
            <div className="contact-directory-item">
              <span>
                <small>Email</small>
                <strong>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </strong>
              </span>
            </div>
            <div className="contact-directory-item">
              <span>
                <small>Accounts</small>
                <strong>
                  <a href={`mailto:${SITE.accountsEmail}`}>{SITE.accountsEmail}</a>
                </strong>
              </span>
            </div>
            <div className="contact-directory-item">
              <span>
                <small>Primary · Alternate</small>
                <strong>
                  <a href={SITE.phoneHref}>{SITE.phone}</a> · <a href={SITE.phoneAltHref}>{SITE.phoneAlt}</a>
                </strong>
              </span>
            </div>
            <div className="contact-directory-item">
              <span>
                <small>Offices</small>
                <strong>Cape Town · Ceres</strong>
              </span>
            </div>
          </div>
        </div>
        <div className="form-panel" data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function InteriorHero({
  kicker,
  title,
  intro,
  index,
}: {
  kicker: string;
  title: ReactNode;
  intro: string;
  index: string;
}) {
  return (
    <section className="interior-hero">
      <div className="section-inner interior-hero-inner">
        <div className="interior-index">{index}</div>
        <div>
          <Eyebrow>{kicker}</Eyebrow>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </div>
    </section>
  );
}
