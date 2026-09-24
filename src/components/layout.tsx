import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { GmailAppIcon, MapsAppIcon, WhatsAppGlyph } from "@/components/brand-icons";
import { SITE, navigation } from "@/lib/site";
import { scrollToContactForm } from "@/lib/scroll";

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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const darkHeader = pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setMenuOpen(false), [pathname]);

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    const scrolledNow = scrollToContactForm();
    if (!scrolledNow) {
      router.navigate({ to: "/contact", hash: "contact" });
    }
  };

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
          <a href="#contact" onClick={handleBookClick} className="nav-cta">
            Book a consultation <ArrowUpRight aria-hidden="true" />
          </a>
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
          <a href="#contact" onClick={handleBookClick} className="mobile-nav-link">
            <span>Book a consultation</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
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
            <WhatsAppGlyph className="wa-preview-wa" />
            <span>
              <strong>Compliant Bookkeeping SA</strong>
              <span>Usually replies in a few minutes</span>
            </span>
          </div>
          <p>Need the books in order? Message us on WhatsApp.</p>
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
  const location = useRouterState({ select: (s) => s.location });
  const pathname = location.pathname;
  const hash = location.hash;

  useEffect(() => {
    if (hash === "contact") {
      const timer = setTimeout(() => {
        scrollToContactForm();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

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
