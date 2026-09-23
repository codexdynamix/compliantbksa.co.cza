import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { GmailAppIcon, MapsAppIcon, WhatsAppAppIcon, WhatsAppGlyph } from "@/components/brand-icons";
import { SITE, navigation } from "@/lib/site";

function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`wordmark ${footer ? "wordmark-footer" : ""}`}>
      <img className="wordmark-logo" src="/brand/logo.webp" alt="" />
      <span className="wordmark-type">
        <span>COMPLIANT</span>
        <small>BOOKKEEPING SA</small>
      </span>
    </span>
  );
}

function useReveals(pathname: string) {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!items.length) return;
    const show = (item: HTMLElement) => item.classList.add("is-visible");
    const revealInView = () => {
      const threshold = window.innerHeight * 1.12;
      items.forEach((item) => {
        if (item.getBoundingClientRect().top <= threshold) show(item);
      });
    };
    if (!("IntersectionObserver" in window)) {
      items.forEach(show);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    const frame = window.requestAnimationFrame(revealInView);
    window.addEventListener("scroll", revealInView, { passive: true });
    window.addEventListener("resize", revealInView);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", revealInView);
      window.removeEventListener("resize", revealInView);
      observer.disconnect();
    };
  }, [pathname]);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const darkHeader = pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className={`site-header ${darkHeader ? "site-header-dark" : ""} ${scrolled ? "site-header-scrolled" : ""}`}>
      <nav className="header-inner" aria-label="Main navigation">
        <Link to="/" className="logo-link" aria-label="Compliant Bookkeeping SA home">
          <Wordmark />
        </Link>
        <div className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${pathname === item.to ? "is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" className="nav-cta">
            Book a consultation <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      {menuOpen ? (
        <div className="mobile-nav">
          {navigation.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className="mobile-nav-link">
              <span>{item.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="mobile-nav-link">
            <span>Book a consultation</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link to="/" className="logo-link" aria-label="Compliant Bookkeeping SA home">
          <Wordmark footer />
        </Link>
        <div className="footer-links">
          {navigation.slice(1).map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="footer-meta">
          <span>Cape Town · Ceres · South Africa</span>
          <span>© 2026 Compliant Bookkeeping SA</span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppDock() {
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("wa-preview-dismissed")) return;
    } catch {
      /* ignore */
    }
    const timer = window.setTimeout(() => setPreview(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setPreview(false);
    try {
      sessionStorage.setItem("wa-preview-dismissed", "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="wa-dock">
      {preview ? (
        <div className="wa-preview" role="dialog" aria-label="WhatsApp message">
          <div className="wa-preview-head">
            <WhatsAppAppIcon size={36} />
            <span>
              <strong>Compliant Bookkeeping SA</strong>
              <span>Usually replies in a few minutes</span>
            </span>
          </div>
          <p>Need the books in order? Message us on WhatsApp — no hard sell, just a practical next step.</p>
          <div className="wa-preview-actions">
            <a className="wa-preview-open" href={SITE.whatsappHref} target="_blank" rel="noreferrer">
              <WhatsAppGlyph /> Open WhatsApp
            </a>
            <button type="button" className="wa-preview-dismiss" onClick={dismiss} aria-label="Dismiss WhatsApp preview">
              <X aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
      <a
        className="wa-fab"
        href={SITE.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp with Compliant Bookkeeping SA"
      >
        <span className="wa-fab-label">WhatsApp us</span>
        <WhatsAppGlyph />
      </a>
    </div>
  );
}

export function Eyebrow({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <span className={`eyebrow ${muted ? "eyebrow-muted" : ""}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  );
}

export function HeroDock() {
  return (
    <div className="hero-dock" aria-label="Contact options">
      <a
        className="hero-dock-item"
        href={SITE.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp ${SITE.phone}`}
      >
        <WhatsAppGlyph className="hero-dock-wa" />
      </a>
      <a className="hero-dock-item" href={`mailto:${SITE.email}`} aria-label={`Email ${SITE.email}`}>
        <GmailAppIcon size={48} />
      </a>
      <a
        className="hero-dock-item"
        href={SITE.mapsCapeTown}
        target="_blank"
        rel="noreferrer"
        aria-label="Open maps for Cape Town and Ceres"
      >
        <MapsAppIcon size={48} />
      </a>
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useReveals(pathname);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="site-shell">
      <Header />
      <main key={pathname} className="page-transition">
        {children}
      </main>
      <Footer />
      <WhatsAppDock />
    </div>
  );
}
