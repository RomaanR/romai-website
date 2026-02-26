import { useState, useEffect, useRef } from "react";

const BRAND = {
  green: "#4CAF50",
  greenDark: "#2E7D32",
  greenLight: "#66BB6A",
  greenGlow: "rgba(76, 175, 80, 0.15)",
  bg: "#0a0f0a",
  bgCard: "#111a11",
  bgCardHover: "#162016",
  text: "#e8e8e8",
  textMuted: "#888888",
  textDim: "#555555",
  border: "#1e2e1e",
  white: "#ffffff",
};

const INDUSTRIES = [
  "Auto Detailing & Car Wash",
  "Dental & Medical Clinics",
  "Salons, Spas & Barbershops",
  "Restaurants & Hospitality",
  "Fitness & Wellness Studios",
  "Real Estate Agencies",
  "Legal & Accounting Firms",
  "Towing & Roadside Assistance",
  "Other",
];

const FEATURES = [
  "Appointment Booking",
  "Cancellations & Rescheduling",
  "Customer Recognition & Lookup",
  "Service Info & Pricing",
  "Email Confirmations",
  "SMS Notifications",
  "Quote Requests",
  "Live Dashboard",
  "Multi-Location Support",
  "Multi-Language Support",
];

const NAV_ITEMS = ["Home", "Case Study", "Get Started", "About"];

// ─── Global responsive styles injected once ───
const RESPONSIVE_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body { margin: 0; overflow-x: hidden; }

  /* Hamburger icon */
  .hamburger-line {
    display: block;
    width: 22px;
    height: 2px;
    background: #e8e8e8;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  .hamburger-open .line1 { transform: translateY(8px) rotate(45deg); }
  .hamburger-open .line2 { opacity: 0; transform: scaleX(0); }
  .hamburger-open .line3 { transform: translateY(-8px) rotate(-45deg); }

  /* Mobile nav menu */
  .mobile-menu {
    display: none;
    flex-direction: column;
    gap: 0;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 15, 10, 0.98);
    border-bottom: 1px solid #1e2e1e;
    backdrop-filter: blur(20px);
    padding: 8px 0 16px;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu-item {
    padding: 14px 24px;
    color: #888888;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: color 0.2s ease;
  }
  .mobile-menu-item:hover,
  .mobile-menu-item.active { color: #4CAF50; }
  .mobile-menu-item.cta {
    margin: 8px 24px 0;
    background: #2E7D32;
    color: #ffffff;
    border-radius: 6px;
    text-align: center;
    padding: 12px 24px;
  }

  /* Card hover */
  .feature-card:hover {
    transform: translateY(-4px);
    background: #162016 !important;
  }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .hamburger-btn { display: flex !important; }

    .hero-title { font-size: clamp(42px, 11vw, 72px) !important; }
    .hero-subtitle { font-size: 16px !important; }
    .hero-buttons { flex-direction: column !important; gap: 12px !important; }
    .hero-buttons button { width: 100% !important; padding: 16px !important; }
    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }

    .section-title { font-size: clamp(32px, 9vw, 48px) !important; }
    .features-grid { grid-template-columns: 1fr !important; }
    .case-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .case-checklist { grid-template-columns: 1fr !important; }
    .chat-bubble { max-width: 90% !important; }

    .form-2col { grid-template-columns: 1fr !important; }
    .complexity-grid { grid-template-columns: 1fr !important; }
    .form-card { padding: 24px !important; }

    .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .about-visual { aspect-ratio: unset !important; min-height: 180px !important; }
    .about-buttons { flex-direction: column !important; }
    .about-buttons a { text-align: center !important; }

    .section-pad { padding: 70px 20px !important; }
    .hero-pad { padding: 100px 20px 60px !important; }
  }

  @media (max-width: 480px) {
    .hero-title { font-size: clamp(34px, 10vw, 48px) !important; }
    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .case-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .stat-value { font-size: 26px !important; }
  }
`;

// ─── Animated counter ───
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Fade in on scroll ───
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navigation ───
function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item) => {
    setMenuOpen(false);
    onNav(item);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled || menuOpen ? "rgba(10, 15, 10, 0.97)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled || menuOpen ? `1px solid ${BRAND.border}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => handleNavClick("Home")}
          style={{ cursor: "pointer", display: "flex", alignItems: "baseline", gap: "2px" }}
        >
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "22px", fontWeight: 700, color: BRAND.white, letterSpacing: "-1px" }}>
            Zenith
          </span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "22px", fontWeight: 700, color: BRAND.green, letterSpacing: "-1px" }}>
            AI
          </span>
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              style={{
                background: item === "Get Started" ? BRAND.greenDark : "none",
                border: "none",
                color: active === item ? BRAND.green : BRAND.textMuted,
                fontFamily: "'Space Mono', monospace",
                fontSize: "13px",
                cursor: "pointer",
                padding: item === "Get Started" ? "8px 20px" : "8px 0",
                borderRadius: item === "Get Started" ? "6px" : 0,
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { if (item !== "Get Started") e.target.style.color = BRAND.green; }}
              onMouseLeave={(e) => { if (item !== "Get Started" && active !== item) e.target.style.color = BRAND.textMuted; }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Hamburger button — hidden on desktop via CSS */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: "none", // overridden by CSS on mobile
            flexDirection: "column",
            gap: "6px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <span className={`hamburger-line line1 ${menuOpen ? "" : ""}`} style={{ display: "block", width: "22px", height: "2px", background: BRAND.text, borderRadius: "2px", transition: "all 0.3s ease", transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: BRAND.text, borderRadius: "2px", transition: "all 0.3s ease", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: BRAND.text, borderRadius: "2px", transition: "all 0.3s ease", transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.filter((i) => i !== "Get Started").map((item) => (
          <button
            key={item}
            onClick={() => handleNavClick(item)}
            className={`mobile-menu-item ${active === item ? "active" : ""}`}
          >
            {item}
          </button>
        ))}
        <button onClick={() => handleNavClick("Get Started")} className="mobile-menu-item cta">
          Get Started
        </button>
      </div>
    </nav>
  );
}

// ─── Hero Section ───
function Hero({ onNav }) {
  return (
    <section
      className="hero-pad"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "120px 40px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${BRAND.border} 1px, transparent 1px),
            linear-gradient(90deg, ${BRAND.border} 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />

      <FadeIn>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 18px",
            borderRadius: "100px",
            background: BRAND.bgCard,
            border: `1px solid ${BRAND.border}`,
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: BRAND.green,
              boxShadow: `0 0 12px ${BRAND.greenGlow}`,
            }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              color: BRAND.green,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            AI Voice Agents for Business
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1
          className="hero-title"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "86px",
            lineHeight: 1.05,
            color: BRAND.white,
            margin: 0,
            maxWidth: "900px",
          }}
        >
          Your Phone.{" "}
          <span style={{ color: BRAND.green, textShadow: `0 0 20px ${BRAND.greenGlow}` }}>
            Never
          </span>
          <br />
          Unanswered.
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p
          className="hero-subtitle"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "20px",
            color: BRAND.textMuted,
            maxWidth: "680px",
            marginTop: "24px",
            lineHeight: 1.8,
          }}
        >
          I build AI voice agents that answer your calls 24/7, book appointments, and
          manage your customers — so you never miss a lead again.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="hero-buttons" style={{ display: "flex", gap: "18px", marginTop: "44px", width: "100%", maxWidth: "480px", justifyContent: "center" }}>
          <button
            onClick={() => onNav("Get Started")}
            style={{
              padding: "18px 38px",
              borderRadius: "10px",
              border: "none",
              background: BRAND.greenDark,
              color: BRAND.white,
              fontFamily: "'Space Mono', monospace",
              fontSize: "14px",
              cursor: "pointer",
              letterSpacing: "2px",
              textTransform: "uppercase",
              boxShadow: `0 0 35px ${BRAND.greenGlow}`,
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => (e.target.style.background = BRAND.green)}
            onMouseLeave={(e) => (e.target.style.background = BRAND.greenDark)}
          >
            Build Your Agent →
          </button>

          <button
            onClick={() => onNav("Case Study")}
            style={{
              padding: "18px 38px",
              borderRadius: "10px",
              background: "transparent",
              border: `1px solid ${BRAND.border}`,
              color: BRAND.textMuted,
              fontFamily: "'Space Mono', monospace",
              fontSize: "14px",
              cursor: "pointer",
              letterSpacing: "2px",
              textTransform: "uppercase",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = BRAND.green)}
            onMouseLeave={(e) => (e.target.style.borderColor = BRAND.border)}
          >
            See It In Action
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div
          style={{
            marginTop: "70px",
            width: "100%",
            maxWidth: "900px",
            padding: "30px",
            borderRadius: "16px",
            border: `1px solid ${BRAND.border}`,
            background: BRAND.bgCard,
          }}
        >
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {[
              { val: "24/7", label: "Availability" },
              { val: "100%", label: "Calls Answered" },
              { val: "2 min", label: "Avg Booking Time" },
              { val: "0", label: "Missed Calls" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  borderRadius: "12px",
                  padding: "18px 10px",
                  border: `1px solid ${BRAND.border}`,
                  background: "rgba(10, 15, 10, 0.4)",
                }}
              >
                <div
                  className="stat-value"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "34px",
                    fontWeight: 700,
                    color: BRAND.green,
                    marginBottom: "8px",
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: BRAND.textMuted,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── What I Build ───
function WhatIBuild() {
  return (
    <section className="section-pad" style={{ padding: "100px 40px", maxWidth: "1100px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              color: BRAND.green,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Capabilities
          </span>
          <h2
            className="section-title"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "54px",
              color: BRAND.white,
              marginTop: "14px",
            }}
          >
            What Your Agent Can Do
          </h2>
        </div>
      </FadeIn>

      <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "22px" }}>
        {[
          { icon: "📞", title: "Answers Every Call", desc: "24/7, holidays included. Handles multiple calls simultaneously." },
          { icon: "🗓️", title: "Books Appointments", desc: "Checks real-time availability and confirms instantly." },
          { icon: "✉️", title: "Sends Confirmations", desc: "Professional email confirmations seconds after booking." },
          { icon: "🔁", title: "Handles Changes", desc: "Cancellations and reschedules with automatic calendar updates." },
          { icon: "👤", title: "Remembers Customers", desc: "Returning customers greeted by name with history on file." },
          { icon: "📊", title: "Live Dashboard", desc: "Real-time analytics you can access from any device." },
        ].map((c) => (
          <FadeIn key={c.title} delay={0.05}>
            <div
              className="feature-card"
              style={{
                border: `1px solid ${BRAND.border}`,
                borderRadius: "16px",
                background: BRAND.bgCard,
                padding: "30px",
                transition: "transform 0.2s ease, background 0.2s ease",
                height: "100%",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "16px" }}>{c.icon}</div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "16px",
                  color: BRAND.white,
                  marginBottom: "10px",
                  letterSpacing: "0.5px",
                  lineHeight: 1.3,
                }}
              >
                {c.title}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: BRAND.textMuted, lineHeight: 1.7 }}>
                {c.desc}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Case Study ───
function CaseStudy() {
  return (
    <section id="casestudy" className="section-pad" style={{ padding: "100px 40px", maxWidth: "1100px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              color: BRAND.green,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Case Study
          </span>
          <h2
            className="section-title"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "56px",
              color: BRAND.white,
              marginTop: "14px",
            }}
          >
            Alex — AI Voice Agent
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", color: BRAND.textMuted, maxWidth: "640px", margin: "18px auto 0", lineHeight: 1.8 }}>
            Built for a premium auto detailing center with 36 years of history. Alex handles every call, books appointments, and manages 16 services across two categories — live in production.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div
          style={{
            border: `1px solid ${BRAND.border}`,
            borderRadius: "16px",
            background: BRAND.bgCard,
            padding: "40px",
            marginBottom: "30px",
          }}
        >
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "3px", color: BRAND.green, textTransform: "uppercase", marginBottom: "16px" }}>
            Live Call Demo
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {[
              { role: "Customer", text: "Hi, I'd like to book a detail for my car this week.", align: "flex-end", bg: "rgba(255,255,255,0.04)", labelColor: BRAND.textDim },
              { role: "Alex (AI)", text: "Of course! I have openings tomorrow at 9 AM, 11 AM, and 2 PM. Which works best for you?", align: "flex-start", bg: BRAND.greenDark + "33", labelColor: BRAND.green },
              { role: "Customer", text: "9 AM sounds good. My name is Amal.", align: "flex-end", bg: "rgba(255,255,255,0.04)", labelColor: BRAND.textDim },
              { role: "Alex (AI)", text: "You're booked for tomorrow at 9 AM. A confirmation email is on its way. We look forward to seeing you!", align: "flex-start", bg: BRAND.greenDark + "33", labelColor: BRAND.green },
            ].map((msg, i) => (
              <div key={i} className="chat-bubble" style={{ alignSelf: msg.align, maxWidth: "75%", borderRadius: "12px", padding: "18px", background: msg.bg, border: `1px solid ${BRAND.border}` }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: msg.labelColor, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
                  {msg.role}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: BRAND.white, lineHeight: 1.6 }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "22px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: BRAND.textDim, textAlign: "center" }}>
            Under 2 min · Booking confirmed · Email sent · Calendar updated · CRM logged
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="case-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px", marginBottom: "28px" }}>
          {[
            { end: 16, label: "Services Managed" },
            { end: 7, label: "Automated Workflows" },
            { end: 24, label: "Availability", suffix: "/7" },
            { end: 0, label: "Human Intervention" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                border: `1px solid ${BRAND.border}`,
                borderRadius: "14px",
                background: BRAND.bgCard,
                padding: "24px",
                textAlign: "center",
              }}
            >
              <div className="stat-value" style={{ fontFamily: "'Space Mono', monospace", fontSize: "34px", fontWeight: 700, color: BRAND.green, marginBottom: "10px" }}>
                <Counter end={s.end} suffix={s.suffix || ""} />
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: BRAND.textMuted, letterSpacing: "2px", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="case-checklist" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {[
            "Books, cancels, and reschedules appointments",
            "Recognizes returning customers by phone number",
            "Manages dual calendar system with capacity limits",
            "Sends HTML email confirmations automatically",
            "Handles edge cases: full slots, invalid dates, vague requests",
            "Live Looker Studio dashboard with real-time analytics",
            "Custom quote logging for multi-service packages",
            "Tested across 20+ real-world scenarios",
          ].map((t) => (
            <div
              key={t}
              style={{
                border: `1px solid ${BRAND.border}`,
                borderRadius: "12px",
                background: BRAND.bgCard,
                padding: "16px 18px",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <div style={{ color: BRAND.green, fontSize: "16px", marginTop: "2px", flexShrink: 0 }}>✓</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: BRAND.white, lineHeight: 1.6 }}>
                {t}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Intake Form ───
function IntakeForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    industry: "",
    services: "",
    hours: "",
    features: [],
    complexity: "standard",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleFeature = (feat) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feat)
        ? prev.features.filter((f) => f !== feat)
        : [...prev.features, feat],
    }));
  };

  const FORMSPREE_URL = "https://formspree.io/f/xrearnny";

  const submitToEmail = async () => {
    setError("");
    if (!form.name || !form.email || !form.business || !form.industry) {
      setError("Please fill in Name, Email, Business Name, and select an Industry.");
      return;
    }
    try {
      setIsSubmitting(true);
      const messageLines = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || "-"}`,
        `Business: ${form.business}`,
        `Industry: ${form.industry}`,
        `Services: ${form.services || "-"}`,
        `Business Hours: ${form.hours || "-"}`,
        `Features: ${form.features?.length ? form.features.join(", ") : "-"}`,
        `Complexity: ${form.complexity}`,
        `Notes: ${form.notes || "-"}`,
      ];
      const payload = {
        ...form,
        message: messageLines.join("\n"),
        _subject: `New romAI lead: ${form.business} (${form.industry})`,
      };
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let detail = "";
        try { const data = await res.json(); detail = data?.error || data?.message || ""; } catch (_) {}
        throw new Error(detail || "Submission failed. Please try again.");
      }
      setSubmitted(true);
    } catch (e) {
      setError(e?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: BRAND.bgCard,
    border: `1px solid ${BRAND.border}`,
    borderRadius: "8px",
    color: BRAND.text,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    color: BRAND.textMuted,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "8px",
    display: "block",
  };

  if (submitted) {
    return (
      <section
        id="getstarted"
        className="section-pad"
        style={{ padding: "100px 40px", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}
      >
        <div style={{ fontSize: "64px", marginBottom: "24px" }}>✓</div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "36px", color: BRAND.white }}>
          Request Received
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", color: BRAND.textMuted, marginTop: "16px", lineHeight: 1.7 }}>
          I'll review your details and get back to you within 24 hours with a timeline and proposal tailored to your business.
        </p>
      </section>
    );
  }

  return (
    <section id="getstarted" className="section-pad" style={{ padding: "100px 40px", maxWidth: "800px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: BRAND.green, letterSpacing: "3px", textTransform: "uppercase" }}>
            Get Started
          </span>
          <h2 className="section-title" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "44px", color: BRAND.white, marginTop: "12px" }}>
            Build Your AI Agent
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", color: BRAND.textMuted, maxWidth: "500px", margin: "16px auto 0", lineHeight: 1.7 }}>
            Tell me about your business and I'll build a custom voice agent tailored to your needs.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div
          className="form-card"
          style={{ border: `1px solid ${BRAND.border}`, borderRadius: "16px", background: BRAND.bgCard, padding: "40px" }}
        >
          {/* Contact info */}
          <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
            <div>
              <label style={labelStyle}>Your Name *</label>
              <input style={inputStyle} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="John Doe"
                onFocus={(e) => (e.target.style.borderColor = BRAND.green)} onBlur={(e) => (e.target.style.borderColor = BRAND.border)} />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input style={inputStyle} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@business.com"
                onFocus={(e) => (e.target.style.borderColor = BRAND.green)} onBlur={(e) => (e.target.style.borderColor = BRAND.border)} />
            </div>
          </div>

          <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input style={inputStyle} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+94 77 555 1234"
                onFocus={(e) => (e.target.style.borderColor = BRAND.green)} onBlur={(e) => (e.target.style.borderColor = BRAND.border)} />
            </div>
            <div>
              <label style={labelStyle}>Business Name *</label>
              <input style={inputStyle} value={form.business} onChange={(e) => update("business", e.target.value)} placeholder="Your Business Name"
                onFocus={(e) => (e.target.style.borderColor = BRAND.green)} onBlur={(e) => (e.target.style.borderColor = BRAND.border)} />
            </div>
          </div>

          {/* Industry */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Industry *</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => update("industry", ind)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "100px",
                    border: `1px solid ${form.industry === ind ? BRAND.green : BRAND.border}`,
                    background: form.industry === ind ? BRAND.greenDark + "33" : "transparent",
                    color: form.industry === ind ? BRAND.green : BRAND.textMuted,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Services & Hours */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Your Services (list them)</label>
            <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.services} onChange={(e) => update("services", e.target.value)}
              placeholder="e.g. Haircut - $30, Color - $80, Blowout - $45..."
              onFocus={(e) => (e.target.style.borderColor = BRAND.green)} onBlur={(e) => (e.target.style.borderColor = BRAND.border)} />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Business Hours</label>
            <input style={inputStyle} value={form.hours} onChange={(e) => update("hours", e.target.value)} placeholder="e.g. Mon-Sat 8 AM - 6 PM, Closed Sunday"
              onFocus={(e) => (e.target.style.borderColor = BRAND.green)} onBlur={(e) => (e.target.style.borderColor = BRAND.border)} />
          </div>

          {/* Features */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Features You Need</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {FEATURES.map((feat) => (
                <button
                  key={feat}
                  onClick={() => toggleFeature(feat)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "100px",
                    border: `1px solid ${form.features.includes(feat) ? BRAND.green : BRAND.border}`,
                    background: form.features.includes(feat) ? BRAND.greenDark + "33" : "transparent",
                    color: form.features.includes(feat) ? BRAND.green : BRAND.textMuted,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {form.features.includes(feat) ? "✓ " : ""}
                  {feat}
                </button>
              ))}
            </div>
          </div>

          {/* Complexity */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Agent Complexity</label>
            <div className="complexity-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {[
                { id: "basic", label: "Basic", desc: "Answer calls, provide info, take messages" },
                { id: "standard", label: "Standard", desc: "Full booking system, email confirmations, CRM" },
                { id: "advanced", label: "Advanced", desc: "Multi-location, dashboard, SMS, custom logic" },
              ].map((c) => (
                <div
                  key={c.id}
                  onClick={() => update("complexity", c.id)}
                  style={{
                    padding: "20px",
                    borderRadius: "10px",
                    border: `1px solid ${form.complexity === c.id ? BRAND.green : BRAND.border}`,
                    background: form.complexity === c.id ? BRAND.greenDark + "22" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px", color: form.complexity === c.id ? BRAND.green : BRAND.white, fontWeight: 700, marginBottom: "6px" }}>
                    {c.label}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: BRAND.textMuted, lineHeight: 1.5 }}>
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: "32px" }}>
            <label style={labelStyle}>Anything Else?</label>
            <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.notes} onChange={(e) => update("notes", e.target.value)}
              placeholder="Special requirements, existing systems, timeline preferences..."
              onFocus={(e) => (e.target.style.borderColor = BRAND.green)} onBlur={(e) => (e.target.style.borderColor = BRAND.border)} />
          </div>

          {error && (
            <div style={{ marginBottom: "16px", color: "#ff6b6b", fontFamily: "'DM Sans', sans-serif", fontSize: "14px" }}>
              {error}
            </div>
          )}

          <button
            onClick={submitToEmail}
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "18px",
              background: BRAND.greenDark,
              color: BRAND.white,
              border: "none",
              borderRadius: "10px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "15px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.8 : 1,
              letterSpacing: "1px",
              transition: "all 0.2s ease",
              boxShadow: `0 0 30px ${BRAND.greenGlow}`,
            }}
            onMouseEnter={(e) => { e.target.style.background = BRAND.green; }}
            onMouseLeave={(e) => { e.target.style.background = BRAND.greenDark; }}
          >
            {isSubmitting ? "SENDING…" : "SUBMIT REQUEST →"}
          </button>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── About Section ───
function About() {
  return (
    <section id="about" className="section-pad" style={{ padding: "100px 40px", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "60px", alignItems: "center" }}>
          {/* Left - Visual */}
          <div
            className="about-visual"
            style={{
              aspectRatio: "1",
              borderRadius: "16px",
              border: `1px solid ${BRAND.border}`,
              background: `linear-gradient(135deg, ${BRAND.bgCard} 0%, ${BRAND.greenDark}22 100%)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(${BRAND.border} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.border} 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
                opacity: 0.2,
              }}
            />
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "48px", fontWeight: 700, color: BRAND.white, textAlign: "center" }}>
                Zenith<span style={{ color: BRAND.green }}>AI</span>
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: BRAND.textMuted, textAlign: "center", marginTop: "8px", letterSpacing: "2px" }}>
                AI VOICE SOLUTIONS
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: BRAND.green, letterSpacing: "3px", textTransform: "uppercase" }}>
              About
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "36px", color: BRAND.white, marginTop: "12px", marginBottom: "20px" }}>
              Built by Romaan
            </h2>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: BRAND.textMuted, lineHeight: 1.8 }}>
              <p style={{ marginBottom: "16px" }}>
                I'm an AI automation engineer who builds production voice agents for businesses. Not demos, not prototypes — real systems handling real customers on real phone lines.
              </p>
              <p style={{ marginBottom: "16px" }}>
                Every agent I build is custom-tailored to the business — your services, your brand voice, your workflows. I handle the full stack: voice AI, backend automation, calendar integration, CRM, email confirmations, and live analytics dashboards.
              </p>
              <p>
                Based in the United States, serving businesses worldwide. If your phone rings and nobody picks up, you're losing customers. I fix that.
              </p>
            </div>
            <div className="about-buttons" style={{ display: "flex", gap: "24px", marginTop: "32px" }}>
              <a
                href="mailto:zenithai003@gmail.com"
                style={{
                  padding: "14px 28px",
                  background: BRAND.greenDark,
                  color: BRAND.white,
                  borderRadius: "8px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "13px",
                  textDecoration: "none",
                  letterSpacing: "1px",
                  transition: "all 0.2s ease",
                  display: "inline-block",
                }}
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer
      style={{
        padding: "40px 24px",
        borderTop: `1px solid ${BRAND.border}`,
        textAlign: "center",
        marginTop: "60px",
      }}
    >
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "18px", color: BRAND.white, marginBottom: "12px" }}>
        Zenith<span style={{ color: BRAND.green }}>AI</span>
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: BRAND.textDim }}>
        zenithai003@gmail.com · zenithai.co
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: BRAND.textDim, marginTop: "8px" }}>
        © 2025 ZenithAI. All rights reserved.
      </div>
    </footer>
  );
}

// ─── Main App ───
export default function App() {
  const [active, setActive] = useState("Home");

  const handleNav = (section) => {
    setActive(section);
    const map = { Home: 0, "Case Study": "casestudy", "Get Started": "getstarted", About: "about" };
    if (section === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(map[section]);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ background: BRAND.bg, minHeight: "100vh", color: BRAND.text }}>
      <style>{RESPONSIVE_CSS}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <Nav active={active} onNav={handleNav} />
      <Hero onNav={handleNav} />
      <WhatIBuild />
      <CaseStudy />
      <IntakeForm />
      <About />
      <Footer />
    </div>
  );
}
