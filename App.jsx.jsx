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

  return <span ref={ref}>{count}{suffix}</span>;
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(10, 15, 10, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BRAND.border}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div
        onClick={() => onNav("Home")}
        style={{ cursor: "pointer", display: "flex", alignItems: "baseline", gap: "2px" }}
      >
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "24px", fontWeight: 700, color: BRAND.white, letterSpacing: "-1px" }}>
          rom
        </span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "24px", fontWeight: 700, color: BRAND.green, letterSpacing: "-1px" }}>
          AI
        </span>
      </div>
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => onNav(item)}
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
            onMouseEnter={(e) => {
              if (item !== "Get Started") e.target.style.color = BRAND.green;
            }}
            onMouseLeave={(e) => {
              if (item !== "Get Started" && active !== item) e.target.style.color = BRAND.textMuted;
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Hero Section ───
function Hero({ onNav }) {
  return (
    <section
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
          backgroundSize: "60px 60px",
          opacity: 0.3,
        }}
      />
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: `radial-gradient(circle, ${BRAND.greenGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <FadeIn>
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            border: `1px solid ${BRAND.border}`,
            borderRadius: "100px",
            marginBottom: "32px",
            background: BRAND.bgCard,
          }}
        >
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: BRAND.green, letterSpacing: "2px", textTransform: "uppercase" }}>
            ● AI Voice Agents for Business
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(42px, 7vw, 80px)",
            fontWeight: 700,
            color: BRAND.white,
            lineHeight: 1.05,
            maxWidth: "900px",
            margin: "0 0 24px",
            position: "relative",
          }}
        >
          Your Phone.{" "}
          <span style={{ color: BRAND.green }}>Never</span>
          <br />
          Unanswered.
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "19px",
            color: BRAND.textMuted,
            maxWidth: "560px",
            lineHeight: 1.7,
            margin: "0 0 48px",
            position: "relative",
          }}
        >
          I build AI voice agents that answer your calls 24/7, book appointments,
          and manage your customers — so you never miss a lead again.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div style={{ display: "flex", gap: "16px", position: "relative" }}>
          <button
            onClick={() => onNav("Get Started")}
            style={{
              background: BRAND.greenDark,
              color: BRAND.white,
              border: "none",
              padding: "16px 36px",
              borderRadius: "8px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "14px",
              cursor: "pointer",
              letterSpacing: "1px",
              transition: "all 0.2s ease",
              boxShadow: `0 0 30px ${BRAND.greenGlow}`,
            }}
            onMouseEnter={(e) => { e.target.style.background = BRAND.green; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.background = BRAND.greenDark; e.target.style.transform = "translateY(0)"; }}
          >
            BUILD YOUR AGENT →
          </button>
          <button
            onClick={() => onNav("Case Study")}
            style={{
              background: "transparent",
              color: BRAND.textMuted,
              border: `1px solid ${BRAND.border}`,
              padding: "16px 36px",
              borderRadius: "8px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "14px",
              cursor: "pointer",
              letterSpacing: "1px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = BRAND.green; e.target.style.color = BRAND.green; }}
            onMouseLeave={(e) => { e.target.style.borderColor = BRAND.border; e.target.style.color = BRAND.textMuted; }}
          >
            SEE IT IN ACTION
          </button>
        </div>
      </FadeIn>

      {/* Stats bar */}
      <FadeIn delay={0.5}>
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "80px",
            padding: "32px 48px",
            border: `1px solid ${BRAND.border}`,
            borderRadius: "12px",
            background: BRAND.bgCard,
            position: "relative",
          }}
        >
          {[
            { val: 24, suffix: "/7", label: "Availability" },
            { val: 100, suffix: "%", label: "Calls Answered" },
            { val: 2, suffix: " min", label: "Avg Booking Time" },
            { val: 0, suffix: "", label: "Missed Calls" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "32px", fontWeight: 700, color: BRAND.green }}>
                <Counter end={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: BRAND.textMuted, marginTop: "4px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── What I Build Section ───
function WhatIBuild() {
  const features = [
    { icon: "📞", title: "Answers Every Call", desc: "24/7, holidays included. Handles multiple calls simultaneously." },
    { icon: "📅", title: "Books Appointments", desc: "Checks real-time availability and confirms instantly." },
    { icon: "✉️", title: "Sends Confirmations", desc: "Professional email confirmations seconds after booking." },
    { icon: "🔄", title: "Handles Changes", desc: "Cancellations and reschedules with automatic calendar updates." },
    { icon: "👤", title: "Remembers Customers", desc: "Returning customers greeted by name with history on file." },
    { icon: "📊", title: "Live Dashboard", desc: "Real-time analytics you can access from any device." },
  ];

  return (
    <section style={{ padding: "100px 40px", maxWidth: "1100px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: BRAND.green, letterSpacing: "3px", textTransform: "uppercase" }}>
            Capabilities
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "44px", color: BRAND.white, marginTop: "12px" }}>
            What Your Agent Can Do
          </h2>
        </div>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {features.map((f, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div
              style={{
                padding: "32px",
                border: `1px solid ${BRAND.border}`,
                borderRadius: "12px",
                background: BRAND.bgCard,
                transition: "all 0.3s ease",
                cursor: "default",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = BRAND.greenDark;
                e.currentTarget.style.background = BRAND.bgCardHover;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BRAND.border;
                e.currentTarget.style.background = BRAND.bgCard;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "16px" }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "16px", color: BRAND.white, marginBottom: "8px" }}>
                {f.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: BRAND.textMuted, lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Case Study Section ───
function CaseStudy() {
  const convo = [
    { role: "customer", text: "Hi, I'd like to book a detail for my car this week." },
    { role: "ai", text: "Of course! I have openings tomorrow at 9 AM, 11 AM, and 2 PM. Which works best for you?" },
    { role: "customer", text: "9 AM sounds good. My name is Amal." },
    { role: "ai", text: "You're booked for tomorrow at 9 AM. A confirmation email is on its way. We look forward to seeing you!" },
  ];

  return (
    <section id="casestudy" style={{ padding: "100px 40px", maxWidth: "1100px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: BRAND.green, letterSpacing: "3px", textTransform: "uppercase" }}>
            Case Study
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "44px", color: BRAND.white, marginTop: "12px" }}>
            Alex — AI Voice Agent
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", color: BRAND.textMuted, maxWidth: "600px", margin: "16px auto 0", lineHeight: 1.7 }}>
            Built for a premium auto detailing center with 36 years of history. Alex handles every call, books appointments, and manages 16 services across two categories — live in production.
          </p>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {[
            { val: "16", label: "Services Managed" },
            { val: "7", label: "Automated Workflows" },
            { val: "24/7", label: "Availability" },
            { val: "0", label: "Human Intervention" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "24px",
                border: `1px solid ${BRAND.border}`,
                borderRadius: "10px",
                background: BRAND.bgCard,
              }}
            >
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "28px", fontWeight: 700, color: BRAND.green }}>
                {s.val}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: BRAND.textMuted, marginTop: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Features grid */}
      <FadeIn delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "48px" }}>
          {[
            "Books, cancels, and reschedules appointments",
            "Recognizes returning customers by phone number",
            "Manages dual calendar system with capacity limits",
            "Sends HTML email confirmations automatically",
            "Handles edge cases: full slots, invalid dates, vague requests",
            "Live Looker Studio dashboard with real-time analytics",
            "Custom quote logging for multi-service packages",
            "Tested across 20+ real-world scenarios",
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px 16px", borderRadius: "8px", background: BRAND.bgCard, border: `1px solid ${BRAND.border}` }}>
              <span style={{ color: BRAND.green, fontWeight: 700, fontSize: "16px", flexShrink: 0 }}>✓</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: BRAND.text, lineHeight: 1.5 }}>{f}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Conversation demo */}
      <FadeIn delay={0.2}>
        <div
          style={{
            border: `1px solid ${BRAND.border}`,
            borderRadius: "12px",
            background: BRAND.bgCard,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${BRAND.border}`, display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: BRAND.green, boxShadow: `0 0 8px ${BRAND.green}` }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: BRAND.textMuted, letterSpacing: "1px" }}>
              LIVE CALL DEMO
            </span>
          </div>
          <div style={{ padding: "24px" }}>
            {convo.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "ai" ? "flex-start" : "flex-end",
                  marginBottom: i < convo.length - 1 ? "16px" : 0,
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "14px 20px",
                    borderRadius: msg.role === "ai" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                    background: msg.role === "ai" ? BRAND.greenDark + "33" : BRAND.border + "88",
                    border: `1px solid ${msg.role === "ai" ? BRAND.greenDark + "66" : BRAND.border}`,
                  }}
                >
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: msg.role === "ai" ? BRAND.green : BRAND.textDim, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {msg.role === "ai" ? "Alex (AI)" : "Customer"}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: BRAND.text, lineHeight: 1.5 }}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 24px", borderTop: `1px solid ${BRAND.border}`, textAlign: "center" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: BRAND.textDim }}>
              Under 2 min · Booking confirmed · Email sent · Calendar updated · CRM logged
            </span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Intake Form ───
function IntakeForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", business: "", industry: "", services: "",
    hours: "", features: [], complexity: "standard", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleFeature = (feat) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feat)
        ? prev.features.filter((f) => f !== feat)
        : [...prev.features, feat],
    }));
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
      <section id="getstarted" style={{ padding: "100px 40px", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
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
    <section id="getstarted" style={{ padding: "100px 40px", maxWidth: "800px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: BRAND.green, letterSpacing: "3px", textTransform: "uppercase" }}>
            Get Started
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "44px", color: BRAND.white, marginTop: "12px" }}>
            Build Your AI Agent
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", color: BRAND.textMuted, maxWidth: "500px", margin: "16px auto 0", lineHeight: 1.7 }}>
            Tell me about your business and I'll build a custom voice agent tailored to your needs.
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
          }}
        >
          {/* Contact info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
            <div>
              <label style={labelStyle}>Your Name *</label>
              <input style={inputStyle} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="John Doe" onFocus={(e) => e.target.style.borderColor = BRAND.green} onBlur={(e) => e.target.style.borderColor = BRAND.border} />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input style={inputStyle} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@business.com" onFocus={(e) => e.target.style.borderColor = BRAND.green} onBlur={(e) => e.target.style.borderColor = BRAND.border} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input style={inputStyle} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+94 77 555 1234" onFocus={(e) => e.target.style.borderColor = BRAND.green} onBlur={(e) => e.target.style.borderColor = BRAND.border} />
            </div>
            <div>
              <label style={labelStyle}>Business Name *</label>
              <input style={inputStyle} value={form.business} onChange={(e) => update("business", e.target.value)} placeholder="Your Business Name" onFocus={(e) => e.target.style.borderColor = BRAND.green} onBlur={(e) => e.target.style.borderColor = BRAND.border} />
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
            <textarea
              style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              value={form.services}
              onChange={(e) => update("services", e.target.value)}
              placeholder="e.g. Haircut - $30, Color - $80, Blowout - $45..."
              onFocus={(e) => e.target.style.borderColor = BRAND.green}
              onBlur={(e) => e.target.style.borderColor = BRAND.border}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Business Hours</label>
            <input style={inputStyle} value={form.hours} onChange={(e) => update("hours", e.target.value)} placeholder="e.g. Mon-Sat 8 AM - 6 PM, Closed Sunday" onFocus={(e) => e.target.style.borderColor = BRAND.green} onBlur={(e) => e.target.style.borderColor = BRAND.border} />
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
                  {form.features.includes(feat) ? "✓ " : ""}{feat}
                </button>
              ))}
            </div>
          </div>

          {/* Complexity */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Agent Complexity</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
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
            <textarea
              style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Special requirements, existing systems, timeline preferences..."
              onFocus={(e) => e.target.style.borderColor = BRAND.green}
              onBlur={(e) => e.target.style.borderColor = BRAND.border}
            />
          </div>

          <button
            onClick={() => { if (form.name && form.email && form.business && form.industry) setSubmitted(true); }}
            style={{
              width: "100%",
              padding: "18px",
              background: BRAND.greenDark,
              color: BRAND.white,
              border: "none",
              borderRadius: "10px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "15px",
              cursor: "pointer",
              letterSpacing: "1px",
              transition: "all 0.2s ease",
              boxShadow: `0 0 30px ${BRAND.greenGlow}`,
            }}
            onMouseEnter={(e) => { e.target.style.background = BRAND.green; }}
            onMouseLeave={(e) => { e.target.style.background = BRAND.greenDark; }}
          >
            SUBMIT REQUEST →
          </button>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── About Section ───
function About() {
  return (
    <section id="about" style={{ padding: "100px 40px", maxWidth: "900px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "60px", alignItems: "center" }}>
          {/* Left - Visual */}
          <div
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
            <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${BRAND.border} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.border} 1px, transparent 1px)`, backgroundSize: "30px 30px", opacity: 0.2 }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "48px", fontWeight: 700, color: BRAND.white, textAlign: "center" }}>
                rom<span style={{ color: BRAND.green }}>AI</span>
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
            <div style={{ display: "flex", gap: "24px", marginTop: "32px" }}>
              <a
                href="mailto:romaanroshanro@gmail.com"
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
        padding: "40px",
        borderTop: `1px solid ${BRAND.border}`,
        textAlign: "center",
        marginTop: "60px",
      }}
    >
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "18px", color: BRAND.white, marginBottom: "12px" }}>
        rom<span style={{ color: BRAND.green }}>AI</span>
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: BRAND.textDim }}>
        romaanroshanro@gmail.com · romai.co
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: BRAND.textDim, marginTop: "8px" }}>
        © 2025 romAI. All rights reserved.
      </div>
    </footer>
  );
}

// ─── Main App ───
export default function App() {
  const [active, setActive] = useState("Home");

  const handleNav = (section) => {
    setActive(section);
    const map = { "Home": 0, "Case Study": "casestudy", "Get Started": "getstarted", "About": "about" };
    if (section === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(map[section]);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ background: BRAND.bg, minHeight: "100vh", color: BRAND.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
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
