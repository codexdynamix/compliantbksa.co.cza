/**
 * Compliant Bookkeeping SA (https://compliantbksa.co.za)
 * Production Shared Hosting Client Runtime
 * Provides fast, zero-dependency client interactivity for Hostinger (LiteSpeed / Apache)
 */
(() => {
  "use strict";

  function init() {
    // 1. Header scroll detection
    const header = document.querySelector(".site-header");
    if (header) {
      const updateHeader = () => {
        if (window.scrollY > 12) {
          header.classList.add("site-header-scrolled");
        } else {
          header.classList.remove("site-header-scrolled");
        }
      };
      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });
    }

    // 2. Mobile Navigation Menu Toggle
    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileNav = document.querySelector(".mobile-nav");
    if (menuButton && mobileNav) {
      let isOpen = false;
      const hamburgerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"></path><path d="M4 18h16"></path><path d="M4 6h16"></path></svg>`;
      const closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;

      const toggleMenu = (open) => {
        isOpen = typeof open === "boolean" ? open : !isOpen;
        mobileNav.style.display = isOpen ? "grid" : "none";
        mobileNav.classList.toggle("is-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        menuButton.innerHTML = isOpen ? closeSvg : hamburgerSvg;
      };

      menuButton.addEventListener("click", (e) => {
        e.preventDefault();
        toggleMenu();
      });

      // Close menu when clicking any navigation link
      mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          toggleMenu(false);
        });
      });
    }

    // 3. FAQ Accordion
    const faqTriggers = document.querySelectorAll(".faq-trigger");
    faqTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const item = trigger.closest(".faq-item");
        const content = item ? item.querySelector(".faq-content") : null;
        const chevron = trigger.querySelector(".faq-chevron") || trigger.querySelector("svg");
        const currentlyExpanded = trigger.getAttribute("aria-expanded") === "true";
        const willExpand = !currentlyExpanded;

        // Close all other FAQs in the list
        faqTriggers.forEach((otherTrigger) => {
          if (otherTrigger !== trigger) {
            otherTrigger.setAttribute("aria-expanded", "false");
            const otherItem = otherTrigger.closest(".faq-item");
            const otherContent = otherItem ? otherItem.querySelector(".faq-content") : null;
            const otherChevron = otherTrigger.querySelector(".faq-chevron") || otherTrigger.querySelector("svg");
            if (otherContent) otherContent.classList.remove("open");
            if (otherChevron) otherChevron.classList.remove("faq-chevron-open");
          }
        });

        // Toggle current FAQ
        trigger.setAttribute("aria-expanded", String(willExpand));
        if (content) content.classList.toggle("open", willExpand);
        if (chevron) chevron.classList.toggle("faq-chevron-open", willExpand);
      });
    });

    // 4. Contact Consultation Form Submission
    const forms = document.querySelectorAll("form.consultation-form");
    forms.forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
        const originalBtnDisabled = submitBtn ? submitBtn.disabled : false;

        const nameInput = form.querySelector('input[name="name"]');
        const phoneInput = form.querySelector('input[name="phone"]');
        const emailInput = form.querySelector('input[name="email"]');
        const focusSelect = form.querySelector('select[name="focus"]');
        const messageInput = form.querySelector('textarea[name="message"]');

        const name = nameInput ? nameInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const focus = focusSelect ? focusSelect.value : "";
        const message = messageInput ? messageInput.value.trim() : "";

        // Show existing error banner if any
        let errorBanner = form.querySelector(".form-error-alert");
        if (errorBanner) errorBanner.remove();

        // Update button to loading state
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg style="animation:spin 0.8s linear infinite; display:inline-block; vertical-align:middle; margin-right:8px;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            Sending enquiry...
          `;
        }

        const payload = {
          name,
          phone,
          email,
          focus,
          service: focus || "Bookkeeping Services",
          message: message || `Consultation request regarding ${focus || "bookkeeping support"}.`,
          timestamp: new Date().toISOString(),
          recipients: [
            "info@compliantbksa.co.za",
            "accounting@compliantbksa.co.za",
            "codexdynamix@gmail.com"
          ]
        };

        let delivered = false;
        let errorMessage = "";

        // Step A: Primary PHP endpoint on Hostinger
        try {
          const resp = await fetch("/api/contact.php", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload)
          });
          if (resp.ok) {
            const data = await resp.json().catch(() => ({ success: true }));
            if (data.success !== false) delivered = true;
            else errorMessage = data.error || "The server rejected the request.";
          }
        } catch {
          // Fall through
        }

        // Step B: Direct root contact.php on Hostinger
        if (!delivered) {
          try {
            const resp = await fetch("/contact.php", {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify(payload)
            });
            if (resp.ok) {
              const data = await resp.json().catch(() => ({ success: true }));
              if (data.success !== false) delivered = true;
            }
          } catch {
            // Fall through
          }
        }

        // Step C: Fallback to FormSubmit direct mail relay
        if (!delivered) {
          try {
            const dests = ["accounting@compliantbksa.co.za", "codexdynamix@gmail.com"];
            const res = await Promise.allSettled(
              dests.map((dest) =>
                fetch(`https://formsubmit.co/ajax/${encodeURIComponent(dest)}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json", Accept: "application/json" },
                  body: JSON.stringify({
                    _subject: `Website Inquiry: ${name || "Client"} (${focus || "General"})`,
                    _replyto: email,
                    _captcha: "false",
                    "Client Name": name,
                    "Client Phone": phone,
                    "Client Email": email,
                    "Service Requested": focus,
                    Message: message
                  })
                })
              )
            );
            if (res.some((r) => r.status === "fulfilled" && r.value.ok)) {
              delivered = true;
            }
          } catch {
            // Fall through
          }
        }

        if (delivered) {
          // Replace form with elegant confirmation message
          const panel = form.closest(".form-panel") || form;
          panel.innerHTML = `
            <div class="form-success-banner animate-rise" style="padding: 32px 16px; text-align: center;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: #e7f3ec; color: #1e7040; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 style="font-size: 1.45rem; font-weight: 600; margin-bottom: 8px; color: var(--color-fg, #1e2528);">Enquiry sent successfully</h3>
              <p style="color: var(--color-muted, #6f828a); font-size: 0.95rem; line-height: 1.6; max-width: 440px; margin: 0 auto 20px;">
                Thank you, <strong>${name || "there"}</strong>. We have received your request regarding <strong>${focus || "bookkeeping support"}</strong> and will follow up promptly.
              </p>
              <div style="background: rgba(30, 37, 40, 0.04); border-radius: 12px; padding: 14px 18px; font-size: 0.88rem; color: var(--color-fg, #1e2528); display: inline-block;">
                Need an immediate conversation? Call or WhatsApp us on <a href="tel:+27834119467" style="font-weight: 600; text-decoration: underline;">083 411 9467</a>.
              </div>
            </div>
          `;
        } else {
          // Restore button and show clear error message with click-to-contact fallback
          if (submitBtn) {
            submitBtn.disabled = originalBtnDisabled;
            submitBtn.innerHTML = originalBtnHtml;
          }
          const alertDiv = document.createElement("div");
          alertDiv.className = "form-error-alert animate-rise";
          alertDiv.style.cssText = "background: #fdf2f2; border: 1px solid #f8b4b4; color: #9b1c1c; border-radius: 10px; padding: 12px 16px; margin-bottom: 16px; font-size: 0.88rem; line-height: 1.5;";
          alertDiv.innerHTML = `
            <strong>Submission note:</strong> ${errorMessage || "We could not connect to the mail delivery server right now."}
            Please WhatsApp us at <a href="https://wa.me/27834119467" target="_blank" style="font-weight:600; text-decoration:underline;">083 411 9467</a> or email <a href="mailto:info@compliantbksa.co.za" style="font-weight:600; text-decoration:underline;">info@compliantbksa.co.za</a> directly.
          `;
          form.insertBefore(alertDiv, form.firstChild);
        }
      });
    });

    // 5. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (href && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, "", href);
          }
        }
      });
    });

    // 6. WhatsApp Dock preview prompt
    const waDock = document.querySelector(".wa-dock");
    if (waDock && !sessionStorage.getItem("wa-preview-dismissed")) {
      setTimeout(() => {
        if (!waDock.querySelector(".wa-preview") && !sessionStorage.getItem("wa-preview-dismissed")) {
          const previewDiv = document.createElement("div");
          previewDiv.className = "wa-preview animate-rise";
          previewDiv.setAttribute("role", "dialog");
          previewDiv.setAttribute("aria-label", "WhatsApp message");
          previewDiv.innerHTML = `
            <button type="button" class="wa-preview-close" aria-label="Dismiss">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
            <div class="wa-preview-body">
              <strong>Compliant Bookkeeping SA</strong>
              <p>Hi! Need help with your bookkeeping, VAT or payroll? Chat to us directly on WhatsApp.</p>
              <a href="https://wa.me/27834119467?text=Hello%20Compliant%20Bookkeeping%20SA%2C%20I%20would%20like%20to%20talk%20about%20bookkeeping%20support." target="_blank" rel="noreferrer" class="wa-preview-cta">
                Open WhatsApp
              </a>
            </div>
          `;
          waDock.insertBefore(previewDiv, waDock.firstChild);
          const closeBtn = previewDiv.querySelector(".wa-preview-close");
          if (closeBtn) {
            closeBtn.addEventListener("click", () => {
              previewDiv.remove();
              sessionStorage.setItem("wa-preview-dismissed", "1");
            });
          }
        }
      }, 2000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
