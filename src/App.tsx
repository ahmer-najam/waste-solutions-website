import { useEffect, useRef, useState, type FormEvent } from "react";
import "./App.css";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1532996122724-e3c354a0b4aa?auto=format&fit=crop&w=1800&q=75";

const SERVICES = [
  {
    title: "Residential Collection",
    copy: "Weekly curb-side pickup for homes, townhouses, and multi-unit buildings across your neighbourhood.",
    icon: "home",
  },
  {
    title: "Commercial Hauling",
    copy: "Scheduled bin service for offices, retail, restaurants, and industrial sites that need dependable routes.",
    icon: "building",
  },
  {
    title: "Recycling & Organics",
    copy: "Blue box, green bin, and diversion programs that help your property meet municipal targets.",
    icon: "recycle",
  },
  {
    title: "Bulk & Junk Removal",
    copy: "Same-week removal for furniture, renovations debris, and end-of-lease cleanouts — no dump-run hassle.",
    icon: "truck",
  },
] as const;

const STEPS = [
  {
    step: "01",
    title: "Request a quote",
    copy: "Tell us your address, bin size, and pickup frequency. Most quotes are ready within one business day.",
  },
  {
    step: "02",
    title: "Confirm your route",
    copy: "We lock in a collection day that fits your schedule and deliver bins if you need them.",
  },
  {
    step: "03",
    title: "We handle the rest",
    copy: "Reliable crews, clear invoices, and proactive alerts when weather or holidays shift the calendar.",
  },
] as const;

const AREAS = [
  "Toronto",
  "Mississauga",
  "Brampton",
  "Markham",
  "Vaughan",
  "Oakville",
  "Burlington",
  "Hamilton",
];

const REASONS = [
  {
    title: "On-time Canadian crews",
    copy: "Locally based teams who know Ontario routes, bylaws, and winter conditions.",
  },
  {
    title: "Transparent pricing",
    copy: "Flat monthly plans with no surprise fees — what you approve is what you pay.",
  },
  {
    title: "Responsible disposal",
    copy: "Partner facilities prioritized for diversion, recycling, and compliant landfill use.",
  },
];

function Icon({ name }: { name: (typeof SERVICES)[number]["icon"] }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 21V4h10v17" />
          <path d="M14 10h6v11" />
          <path d="M8 8h2M8 12h2M8 16h2" />
        </svg>
      );
    case "recycle":
      return (
        <svg {...common}>
          <path d="M7 19h5l-2.5 2.5" />
          <path d="M4.5 11.5 7 8l3.5 1" />
          <path d="M16.5 5.5 14 8l3.5 2" />
          <path d="M17 19a6.5 6.5 0 0 0 2-9.5" />
          <path d="M7 19a6.5 6.5 0 0 1 2-9.8" />
          <path d="M14 8a6.5 6.5 0 0 1 5.2 3.5" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path d="M3 16V7h11v9" />
          <path d="M14 10h4l3 3v3h-7" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
  }
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const items = node.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`logo ${light ? "logo--light" : ""}`} aria-label="Waste Solutions home">
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" width="36" height="36">
          <rect width="40" height="40" rx="10" fill="currentColor" className="logo__plate" />
          <path
            d="M11 25c0-5.3 3.9-9.7 8.8-9.7S28.5 19.7 28.5 25"
            fill="none"
            stroke="#8FBF4A"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M15 17.5c1.8-2 3.9-3.1 4.8-3.1s3 1.1 4.8 3.1"
            fill="none"
            stroke="#E8F2EC"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="20" cy="27" r="2" fill="#8FBF4A" />
        </svg>
      </span>
      <span className="logo__text">
        Waste
        <strong>Solutions</strong>
      </span>
    </a>
  );
}

export default function App() {
  const pageRef = useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sent");
    event.currentTarget.reset();
  };

  return (
    <div ref={pageRef} id="top">
      <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
        <div className="container nav__inner">
          <Logo light={!scrolled || menuOpen} />
          <button
            className={`nav__toggle ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav className={`nav__links ${menuOpen ? "is-open" : ""}`} aria-label="Primary">
            <a href="#services" onClick={closeMenu}>
              Services
            </a>
            <a href="#process" onClick={closeMenu}>
              How it works
            </a>
            <a href="#areas" onClick={closeMenu}>
              Service areas
            </a>
            <a href="#contact" className="btn btn-primary nav__cta" onClick={closeMenu}>
              Get a quote
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" aria-label="Hero">
          <div className="hero__media" aria-hidden="true">
            <img
              src={HERO_IMAGE}
              alt=""
              width={1800}
              height={1200}
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero__shade" />
          </div>
          <div className="container hero__content">
            <div className="hero__copy">
              <p className="hero__brand">Waste Solutions</p>
              <h1>Clean streets. Clear schedules. Collection you can count on.</h1>
              <p className="hero__lead">
                Residential and commercial garbage pickup across Ontario — dependable crews, fair
                pricing, and bins that leave on time.
              </p>
              <div className="hero__actions">
                <a href="#contact" className="btn btn-primary">
                  Book a pickup
                </a>
                <a href="#services" className="btn btn-ghost">
                  View services
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section services">
          <div className="container">
            <div className="section-head reveal">
              <h2>Collection built for Canadian homes and businesses</h2>
              <p>
                From weekly curb-side routes to commercial contracts, we keep waste moving so you
                can focus on everything else.
              </p>
            </div>
            <div className="services__grid">
              {SERVICES.map((service, index) => (
                <article
                  key={service.title}
                  className={`service reveal reveal-delay-${index % 4 || 1}`}
                >
                  <div className="service__icon">
                    <Icon name={service.icon} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section process">
          <div className="container process__layout">
            <div className="section-head reveal">
              <h2>Three steps to a cleaner property</h2>
              <p>Straightforward onboarding with routes tuned for Ontario weather and bylaws.</p>
            </div>
            <ol className="process__list">
              {STEPS.map((item, index) => (
                <li key={item.step} className={`reveal reveal-delay-${index + 1}`}>
                  <span className="process__num">{item.step}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section why">
          <div className="container why__layout">
            <div className="why__visual reveal" aria-hidden="true">
              <img
                src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=70"
                alt=""
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <div className="section-head reveal">
                <h2>Why Ontario properties choose us</h2>
                <p>
                  We operate like a local partner — reachable, accountable, and serious about
                  keeping sites tidy year-round.
                </p>
              </div>
              <ul className="why__list">
                {REASONS.map((reason, index) => (
                  <li key={reason.title} className={`reveal reveal-delay-${index + 1}`}>
                    <h3>{reason.title}</h3>
                    <p>{reason.copy}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="areas" className="section areas">
          <div className="container">
            <div className="section-head reveal">
              <h2>Serving the Greater Toronto Area and beyond</h2>
              <p>
                Expanding routes across southern Ontario. If your city isn’t listed, ask — we often
                cover neighbouring municipalities.
              </p>
            </div>
            <ul className="areas__grid">
              {AREAS.map((area, index) => (
                <li key={area} className={`reveal reveal-delay-${(index % 3) + 1}`}>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="container contact__layout">
            <div className="contact__intro reveal">
              <h2>Request a free quote</h2>
              <p>
                Share a few details and we’ll follow up with pricing, route availability, and next
                steps — usually within one business day.
              </p>
              <div className="contact__details">
                <a href="tel:+14165550198">+1 (416) 555-0198</a>
                <a href="mailto:hello@wastesolutions.ca">hello@wastesolutions.ca</a>
                <p>Mon–Fri · 7:00–18:00 ET</p>
              </div>
            </div>

            <form className="contact__form reveal reveal-delay-2" onSubmit={onSubmit} noValidate>
              <div className="field-row">
                <label>
                  Full name
                  <input name="name" type="text" required autoComplete="name" placeholder="Alex Chen" />
                </label>
                <label>
                  Phone
                  <input
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="(416) 555-0198"
                  />
                </label>
              </div>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.ca"
                />
              </label>
              <div className="field-row">
                <label>
                  Service type
                  <select name="service" defaultValue="residential" required>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="recycling">Recycling & organics</option>
                    <option value="bulk">Bulk & junk removal</option>
                  </select>
                </label>
                <label>
                  City
                  <input name="city" type="text" required placeholder="Toronto" autoComplete="address-level2" />
                </label>
              </div>
              <label>
                Notes
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Bin size, preferred day, property type…"
                />
              </label>
              <button type="submit" className="btn btn-primary">
                Send request
              </button>
              {formStatus === "sent" && (
                <p className="form-success" role="status">
                  Thanks — your request is in. We’ll be in touch shortly.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <Logo light />
          <p>Reliable garbage collection for Canadian communities.</p>
          <div className="footer__meta">
            <span>© {new Date().getFullYear()} Waste Solutions</span>
            <span>Ontario, Canada</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
