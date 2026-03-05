import { Toaster } from "@/components/ui/sonner";
import { useActor } from "@/hooks/useActor";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Cloud,
  Code2,
  Container,
  Cpu,
  Github,
  Globe,
  GraduationCap,
  HeartHandshake,
  Layers,
  Linkedin,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Server,
  ShieldCheck,
  Star,
  StarHalf,
  Twitter,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

/* ─── Fade-in animation variant ────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ─── Section wrapper with scroll-triggered animation ──────── */
function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id={id} className={className}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ─── Star Rating ───────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: full }).map((_, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length star array
        <Star key={idx} className="w-4 h-4 star-filled fill-current" />
      ))}
      {hasHalf && <StarHalf className="w-4 h-4 star-filled fill-current" />}
    </div>
  );
}

/* ─── Tech Partner Strip ────────────────────────────────────── */
function TechPartnerStrip() {
  const techs = [
    { name: "AWS", color: "oklch(0.72 0.15 50)" },
    { name: "Azure", color: "oklch(0.65 0.18 240)" },
    { name: "GCP", color: "oklch(0.7 0.16 145)" },
    { name: "Docker", color: "oklch(0.65 0.18 220)" },
    { name: "Kubernetes", color: "oklch(0.65 0.22 290)" },
    { name: "Terraform", color: "oklch(0.6 0.18 290)" },
    { name: "GitHub Actions", color: "oklch(0.75 0.01 270)" },
    { name: "GitLab CI", color: "oklch(0.65 0.18 20)" },
    { name: "Ansible", color: "oklch(0.65 0.18 20)" },
    { name: "Jenkins", color: "oklch(0.65 0.15 50)" },
    { name: "Helm", color: "oklch(0.65 0.2 280)" },
    { name: "ArgoCD", color: "oklch(0.65 0.22 290)" },
  ];

  // Duplicate for seamless loop
  const allTechs = [...techs, ...techs];

  return (
    <div className="relative py-8 overflow-hidden border-y border-border/50">
      {/* Left fade mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.08 0.015 270) 0%, transparent 100%)",
        }}
      />
      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(270deg, oklch(0.08 0.015 270) 0%, transparent 100%)",
        }}
      />

      <div className="flex overflow-hidden">
        <div className="tech-scroll flex gap-4 items-center whitespace-nowrap">
          {allTechs.map((tech, idx) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: scrolling strip with duplicates
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-dark-card/80 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-violet/30 transition-colors flex-shrink-0"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: tech.color,
                  boxShadow: `0 0 6px ${tech.color}`,
                }}
              />
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Navbar ────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home", ocid: "nav.home.link" },
    { label: "Services", href: "#services", ocid: "nav.services.link" },
    { label: "Training", href: "#training", ocid: "nav.training.link" },
    { label: "About", href: "#about", ocid: "nav.about.link" },
    { label: "Contact", href: "#contact", ocid: "nav.contact.link" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-blur py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-violet flex items-center justify-center glow-violet-sm group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="text-foreground">MatrixKube</span>
              <span className="text-violet">Technologies</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.ocid}
                href={link.href}
                data-ocid={link.ocid}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-violet transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              data-ocid="nav.cta.button"
              className="btn-violet px-5 py-2.5 rounded-xl text-sm flex items-center gap-2"
            >
              Get a Consultation
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-0 right-0 z-40 nav-blur py-4 md:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.ocid}
                  href={link.href}
                  data-ocid={link.ocid}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-violet transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                data-ocid="nav.cta.button"
                className="btn-violet mt-2 px-5 py-3 rounded-xl text-sm text-center"
              >
                Get a Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Hero Section ──────────────────────────────────────────── */
function HeroSection() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const capabilities = [
    { label: "Cloud Architecture", sub: "AWS · Azure · GCP" },
    { label: "Kubernetes & Helm", sub: "Production-grade clusters" },
    { label: "DevSecOps CI/CD", sub: "Secure by design" },
    { label: "Corporate Training", sub: "Teams upskilled fast" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden aurora-bg noise-overlay"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 z-0" />

      {/* Large violet orb — top right */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none z-0"
        style={{ background: "oklch(0.65 0.22 290)" }}
      />
      {/* Smaller indigo orb — bottom left */}
      <div
        className="absolute bottom-[-5%] left-[-8%] w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none z-0"
        style={{ background: "oklch(0.5 0.18 260)" }}
      />

      {/* Left vignette for legibility */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.08 0.015 270 / 0.9) 0%, oklch(0.08 0.015 270 / 0.6) 50%, oklch(0.08 0.015 270 / 0.1) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: headline column ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet/30 bg-violet/10 text-violet text-xs font-semibold uppercase tracking-widest mb-8">
                <Zap className="w-3.5 h-3.5" />
                Cloud-Native Solutions
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display font-black leading-[0.9] tracking-tight text-foreground mb-6"
              style={{ fontSize: "clamp(3.2rem, 7vw, 5.5rem)" }}
            >
              Cloud.
              <br />
              <span className="text-violet">Kubernetes.</span>
              <br />
              DevSecOps.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg"
            >
              Enterprise-grade infrastructure consulting, implementation, and
              training — built for the modern cloud-native era.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-4"
            >
              <button
                type="button"
                data-ocid="hero.primary.button"
                onClick={() => scrollToSection("#services")}
                className="btn-violet px-7 py-3.5 rounded-xl text-base flex items-center gap-2"
              >
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                data-ocid="hero.secondary.button"
                onClick={() => scrollToSection("#contact")}
                className="btn-outline-violet px-7 py-3.5 rounded-xl text-base flex items-center gap-2"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>

          {/* ── Right: capability panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:flex flex-col gap-3"
          >
            {/* Header row */}
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl border border-violet/30 bg-violet/10 glow-violet-sm">
                <Cpu className="w-7 h-7 text-violet" />
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-sm">
                  MatrixKube Technologies
                </p>
                <p className="text-xs text-muted-foreground">
                  Certified Cloud · K8s · DevSecOps Experts
                </p>
              </div>
            </div>

            {/* Capability cards */}
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.7 + i * 0.1,
                  ease: "easeOut",
                }}
                className="hero-capability-card card-glass flex items-center gap-4 rounded-xl px-5 py-4"
              >
                <div
                  className="w-2 h-2 rounded-full bg-violet flex-shrink-0"
                  style={{ boxShadow: "0 0 8px oklch(0.65 0.22 290)" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm text-foreground leading-tight">
                    {cap.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {cap.sub}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-violet/40 flex-shrink-0" />
              </motion.div>
            ))}

            {/* Social proof pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="mt-2 inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-violet/20 bg-violet/5"
            >
              <div className="flex -space-x-2">
                {["SM", "RN", "EL"].map((init) => (
                  <div
                    key={init}
                    className="w-7 h-7 rounded-full border-2 border-dark-card bg-violet/20 flex items-center justify-center"
                  >
                    <span className="text-violet text-[9px] font-bold font-display">
                      {init}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Trusted by 200+ enterprises
                </p>
                <div className="flex gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-2.5 h-2.5 star-filled fill-current"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40 text-xs"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats Bar ─────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { value: "200+", label: "Enterprise Clients", icon: Users },
    { value: "500+", label: "Projects Delivered", icon: BarChart3 },
    { value: "10+", label: "Years Experience", icon: Clock },
    { value: "50+", label: "Certified Trainers", icon: Award },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="relative z-10 card-glass border-y border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-5 h-5 text-violet" />
              </div>
              <div>
                <div
                  className="font-display text-3xl font-black text-violet leading-none"
                  style={{ textShadow: "0 0 20px oklch(0.65 0.22 290 / 0.4)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Services Section — Bento Grid ────────────────────────── */
function ServicesSection() {
  const cloudOfferings = [
    "Cloud strategy & architecture design",
    "Cloud migration (on-prem to cloud)",
    "Cost optimization & governance",
    "Multi-cloud & hybrid cloud solutions",
    "Infrastructure as Code (IaC) implementation",
    "High availability & disaster recovery",
  ];

  const k8sOfferings = [
    "Kubernetes cluster setup & management",
    "Production-grade K8s architecture",
    "Containerization of applications",
    "Helm chart development",
  ];

  const devSecOpsOfferings = [
    "CI/CD pipeline design & implementation",
    "DevSecOps transformation consulting",
    "Secure SDLC implementation",
    "Container security & vulnerability scanning",
  ];

  const trainingAreas = [
    "Cloud Computing (AWS / Azure / GCP)",
    "Kubernetes & Docker",
    "DevOps & DevSecOps",
    "Infrastructure as Code",
    "CI/CD Tools & Pipelines",
    "Cloud Security",
  ];

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatedSection id="services" className="py-24 section-gradient">
      {/* Section header */}
      <motion.div
        variants={fadeUp}
        custom={0}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet/30 bg-violet/10 text-violet text-xs font-semibold uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" />
            What We Do
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-foreground mb-4 leading-tight">
            Our Core Services
          </h2>
          <div className="divider-violet mx-auto mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            End-to-end cloud-native expertise — from strategy and architecture
            to implementation, security, and team enablement.
          </p>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {/* Featured tile — Cloud Consulting (tall, 2 rows) */}
          <motion.div
            variants={fadeUp}
            custom={1}
            data-ocid="services.item.1"
            className="bento-tile card-glass rounded-2xl p-8 lg:col-span-2 lg:row-span-2 relative"
          >
            {/* Corner violet gradient glow */}
            <div
              className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
              style={{ background: "oklch(0.65 0.22 290)" }}
            />
            <div className="relative z-10">
              {/* Icon + tag row */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-16 h-16 rounded-2xl bg-violet/15 border border-violet/25 flex items-center justify-center"
                  style={{
                    boxShadow: "0 0 24px oklch(0.65 0.22 290 / 0.25)",
                  }}
                >
                  <Cloud className="w-8 h-8 text-violet" />
                </div>
                <span className="text-xs font-medium text-violet bg-violet/10 border border-violet/20 px-3 py-1 rounded-full">
                  AWS · Azure · GCP
                </span>
              </div>

              <h3 className="font-display text-3xl font-bold text-foreground mb-3">
                Cloud Consulting
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-lg">
                Strategic cloud transformation from design to delivery. We
                architect resilient, cost-efficient cloud environments tailored
                to your business goals and scale.
              </p>

              <div className="h-px bg-border/50 mb-5" />

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cloudOfferings.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-violet mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="btn-outline-violet px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-2"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Kubernetes tile — smaller */}
          <motion.div
            variants={fadeUp}
            custom={2}
            data-ocid="services.item.2"
            className="bento-tile card-glass rounded-2xl p-6 relative"
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none"
              style={{ background: "oklch(0.6 0.2 280)" }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet/15 border border-violet/25 flex items-center justify-center">
                  <Container className="w-6 h-6 text-violet" />
                </div>
                <span className="text-xs font-medium text-violet bg-violet/10 border border-violet/20 px-2.5 py-1 rounded-full">
                  K8s · Docker · Helm
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Kubernetes Implementation
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Production-grade container orchestration built for reliability
                and scale.
              </p>
              <ul className="space-y-2">
                {k8sOfferings.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* DevSecOps tile — smaller */}
          <motion.div
            variants={fadeUp}
            custom={3}
            data-ocid="services.item.3"
            className="bento-tile card-glass rounded-2xl p-6 relative"
          >
            <div
              className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none"
              style={{ background: "oklch(0.55 0.18 300)" }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet/15 border border-violet/25 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-violet" />
                </div>
                <span className="text-xs font-medium text-violet bg-violet/10 border border-violet/20 px-2.5 py-1 rounded-full">
                  Jenkins · GitHub · GitLab
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                DevSecOps Services
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Integrate security at every stage of the software lifecycle.
              </p>
              <ul className="space-y-2">
                {devSecOpsOfferings.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Training tile — full width */}
          <motion.div
            variants={fadeUp}
            custom={4}
            data-ocid="services.item.4"
            className="bento-tile card-glass rounded-2xl p-8 lg:col-span-3 relative overflow-hidden"
          >
            {/* Wide gradient sweep */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, oklch(0.65 0.22 290) 50%, transparent 100%)",
              }}
            />
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-violet/15 border border-violet/25 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-violet" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground">
                        Corporate Training Programs
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Onsite · Virtual · Custom Enterprise Curriculum
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trainingAreas.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-violet bg-violet/10 border border-violet/20 px-3 py-1.5 rounded-full"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-violet"
                          style={{
                            boxShadow: "0 0 4px oklch(0.65 0.22 290)",
                          }}
                        />
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    data-ocid="training.cta.button"
                    onClick={scrollToContact}
                    className="btn-violet px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2"
                  >
                    Request Training
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Training Section ──────────────────────────────────────── */
function TrainingSection() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const areas = [
    {
      icon: Globe,
      title: "Cloud Computing",
      desc: "AWS, Azure & GCP deep dives",
    },
    {
      icon: Container,
      title: "Kubernetes & Docker",
      desc: "Container orchestration mastery",
    },
    {
      icon: Code2,
      title: "DevOps & DevSecOps",
      desc: "Culture, tools & automation",
    },
    {
      icon: Server,
      title: "IaC: Terraform & Ansible",
      desc: "Infrastructure automation",
    },
    {
      icon: Zap,
      title: "CI/CD Tools",
      desc: "Jenkins, GitHub Actions, GitLab CI",
    },
    {
      icon: Lock,
      title: "Cloud Security",
      desc: "Secure practices & compliance",
    },
  ];

  const formats = [
    {
      icon: Users,
      title: "Onsite Corporate Workshops",
      desc: "Hands-on training at your facility",
    },
    {
      icon: Globe,
      title: "Virtual Instructor-Led",
      desc: "Live remote sessions with experts",
    },
    {
      icon: Layers,
      title: "Customized Curriculum",
      desc: "Tailored content for your team",
    },
    {
      icon: Award,
      title: "Bootcamps & Cert Prep",
      desc: "Intensive certification readiness",
    },
  ];

  return (
    <AnimatedSection id="training" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet/30 bg-violet/10 text-violet text-xs font-semibold uppercase tracking-widest mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            Corporate Training
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-4">
            Corporate Training Programs
          </h2>
          <div className="divider-violet mx-auto mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Empower your engineering teams with practical, expert-led training
            covering the full cloud-native technology stack.
          </p>
        </motion.div>

        {/* Training areas */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
        >
          {areas.map((area) => (
            <div
              key={area.title}
              className="group flex items-start gap-4 card-glass rounded-xl border border-border/50 p-6 card-hover"
            >
              <div className="w-11 h-11 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center flex-shrink-0 group-hover:border-violet/40 transition-colors">
                <area.icon className="w-5 h-5 text-violet" />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-1">
                  {area.title}
                </h4>
                <p className="text-sm text-muted-foreground">{area.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Training formats */}
        <motion.div variants={fadeUp} custom={2}>
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="h-px flex-1 max-w-[80px] bg-border/50" />
            <h3 className="font-display text-xl font-bold text-foreground">
              Training Formats
            </h3>
            <div className="h-px flex-1 max-w-[80px] bg-border/50" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {formats.map((fmt) => (
              <div
                key={fmt.title}
                className="card-glass rounded-xl border border-border/50 p-5 text-center card-hover"
              >
                <div className="w-12 h-12 rounded-full bg-violet/10 border border-violet/20 flex items-center justify-center mx-auto mb-3">
                  <fmt.icon className="w-5 h-5 text-violet" />
                </div>
                <h4 className="font-display font-bold text-sm text-foreground mb-1">
                  {fmt.title}
                </h4>
                <p className="text-xs text-muted-foreground">{fmt.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              type="button"
              onClick={scrollToContact}
              className="btn-violet px-8 py-3.5 rounded-xl text-base inline-flex items-center gap-2"
            >
              Request Custom Training
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Why Choose Us — Bento Grid ────────────────────────────── */
function WhyUsSection() {
  return (
    <AnimatedSection className="py-24 section-gradient">
      <div className="max-w-7xl mx-auto px-6">
        {/* Asymmetric header */}
        <motion.div variants={fadeUp} custom={0} className="mb-14">
          <div className="flex items-start gap-5">
            <div
              className="w-1 self-stretch rounded-full bg-violet mt-1 flex-shrink-0"
              style={{ minHeight: "4rem" }}
            />
            <div>
              <p className="text-violet text-xs font-semibold uppercase tracking-widest mb-2">
                Why Us
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-3 leading-tight">
                Why Choose MatrixKube?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Deep technical expertise meets a client-first delivery model —
                from first call to final deployment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {/* Expert Team — tall featured tile */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="bento-tile card-glass rounded-2xl p-8 md:row-span-2 relative overflow-hidden"
          >
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-12 blur-3xl pointer-events-none"
              style={{ background: "oklch(0.65 0.22 290)" }}
            />
            <div className="relative z-10 h-full flex flex-col">
              <span
                className="absolute top-5 right-5 font-display font-black text-5xl leading-none select-none"
                style={{ color: "oklch(0.65 0.22 290 / 0.08)" }}
              >
                01
              </span>
              <div className="w-16 h-16 rounded-2xl bg-violet/15 border border-violet/25 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-violet" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Expert Team
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-1">
                Certified architects, engineers, and trainers with deep,
                battle-tested expertise across AWS, Azure, GCP, and Kubernetes.
                Our team brings real-world, production-grade experience to every
                engagement — not just theoretical knowledge.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-violet" />
                <span className="text-sm text-violet font-medium">
                  50+ certified experts
                </span>
              </div>
            </div>
          </motion.div>

          {/* Proven Results */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="bento-tile card-glass rounded-2xl p-7 relative overflow-hidden"
          >
            <span
              className="absolute top-5 right-5 font-display font-black text-5xl leading-none select-none"
              style={{ color: "oklch(0.65 0.22 290 / 0.08)" }}
            >
              02
            </span>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-violet/10 border border-violet/20 flex items-center justify-center mb-5">
                <BarChart3 className="w-7 h-7 text-violet" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                Proven Results
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                500+ successful projects delivered — from 3-tier migrations to
                full DevSecOps transformations at enterprise scale.
              </p>
            </div>
          </motion.div>

          {/* Continuous Support */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="bento-tile card-glass rounded-2xl p-7 relative overflow-hidden"
          >
            <span
              className="absolute top-5 right-5 font-display font-black text-5xl leading-none select-none"
              style={{ color: "oklch(0.65 0.22 290 / 0.08)" }}
            >
              03
            </span>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-violet/10 border border-violet/20 flex items-center justify-center mb-5">
                <HeartHandshake className="w-7 h-7 text-violet" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                Continuous Support
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Engagement doesn't end at delivery. We provide ongoing support,
                optimization, and managed services post-implementation.
              </p>
            </div>
          </motion.div>

          {/* End-to-End Coverage — wide */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="bento-tile card-glass rounded-2xl p-8 lg:col-span-2 md:col-span-2 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-8"
              style={{
                background:
                  "linear-gradient(135deg, transparent 0%, oklch(0.65 0.22 290 / 0.12) 100%)",
              }}
            />
            <span
              className="absolute top-5 right-5 font-display font-black text-5xl leading-none select-none"
              style={{ color: "oklch(0.65 0.22 290 / 0.08)" }}
            >
              04
            </span>
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-violet/10 border border-violet/20 flex items-center justify-center flex-shrink-0">
                <Layers className="w-7 h-7 text-violet" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  End-to-End Coverage
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  We cover the full spectrum: strategy, architecture,
                  implementation, security, and team upskilling under one roof.
                  From initial consultation through ongoing managed operations —
                  we're your long-term cloud-native partner.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Testimonials ──────────────────────────────────────────── */
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "MatrixKube transformed our entire infrastructure in 90 days. Their Kubernetes migration was flawless — we went from zero downtime SLAs to 99.99% uptime. Truly exceptional engineers.",
      name: "Sarah Mitchell",
      role: "VP of Engineering, FinTech Dynamics",
      rating: 5,
      initial: "SM",
    },
    {
      quote:
        "Their DevSecOps team embedded security into every stage of our SDLC. We passed SOC 2 Type II audit on the first try — something we'd struggled with for two years. Highly recommended.",
      name: "Rajesh Nair",
      role: "CTO, Quantum Health Systems",
      rating: 4.5,
      initial: "RN",
    },
    {
      quote:
        "The corporate training program was a game-changer. Our entire DevOps team is now certified on Kubernetes and Terraform. The onsite bootcamp was incredibly hands-on and practical.",
      name: "Emma Lawson",
      role: "Head of Platform, LogiScale Corp",
      rating: 5,
      initial: "EL",
    },
  ];

  return (
    <AnimatedSection id="about" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet/30 bg-violet/10 text-violet text-xs font-semibold uppercase tracking-widest mb-4">
            <Star className="w-3.5 h-3.5" />
            Client Reviews
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-foreground mb-4 leading-tight">
            Reviews That Speak Volumes
          </h2>
          <div className="divider-violet mx-auto mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by engineering leaders across fintech, healthcare,
            logistics, and enterprise software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              custom={i + 1}
              className="bento-tile card-glass rounded-2xl border border-border/50 p-8 flex flex-col relative overflow-hidden"
            >
              {/* Giant decorative opening quote */}
              <span
                className="absolute -top-3 -left-1 font-display font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: "9rem",
                  color: "oklch(0.65 0.22 290 / 0.07)",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                "
              </span>

              <div className="relative z-10 flex flex-col flex-1">
                <StarRating rating={t.rating} />
                <blockquote className="text-sm text-muted-foreground leading-relaxed mt-4 mb-5 flex-1">
                  {t.quote}
                </blockquote>
                <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-violet/20 border border-violet/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-violet font-display font-bold text-sm">
                      {t.initial}
                    </span>
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── CTA Banner ────────────────────────────────────────────── */
function CTABanner() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="aurora-bg relative overflow-hidden py-24 border-y border-border/40 noise-overlay"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Large violet orb behind headline */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.65 0.22 290)" }}
      />
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.5 0.18 260)" }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.div variants={fadeUp} custom={0}>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-foreground mb-5 leading-tight">
            Ready to Scale with <span className="text-violet">Confidence?</span>
          </h2>
        </motion.div>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto"
        >
          Our team of certified cloud architects, Kubernetes experts, and
          DevSecOps engineers is ready to guide your transformation — from first
          strategy session to full production deployment.
        </motion.p>
        <motion.div variants={fadeUp} custom={2}>
          <button
            type="button"
            onClick={scrollToContact}
            className="btn-violet px-9 py-4 rounded-xl text-base font-bold inline-flex items-center gap-2 glow-violet"
          >
            Get a Free Consultation
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Contact Form ──────────────────────────────────────────── */
function ContactSection() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setStatus("loading");
    try {
      if (actor) {
        await actor.submitContactForm(
          form.name,
          form.email,
          form.company,
          form.message,
        );
      }
      setStatus("success");
      toast.success("Message sent successfully! We'll be in touch soon.");
    } catch {
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@matrixkube.tech" },
    { icon: Phone, label: "Phone", value: "+1 (888) 123-4567" },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA & Remote Worldwide",
    },
  ];

  return (
    <AnimatedSection id="contact" className="py-24 section-gradient">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet/30 bg-violet/10 text-violet text-xs font-semibold uppercase tracking-widest mb-4">
            <Send className="w-3.5 h-3.5" />
            Contact Us
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-4">
            Get in Touch
          </h2>
          <div className="divider-violet mx-auto mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tell us about your project. Our team will respond within one
            business day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left info */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-start gap-4 card-glass rounded-xl border border-border/50 p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 text-violet" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-0.5">
                    {info.label}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {info.value}
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-violet/8 border border-violet/20 rounded-xl p-6 mt-2">
              <h4 className="font-display font-bold text-foreground mb-2">
                Quick Turnaround
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We respond to all inquiries within 24 hours. For urgent
                enterprise needs, reach us directly by phone.
              </p>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div variants={fadeUp} custom={2} className="lg:col-span-3">
            <div className="card-glass rounded-2xl border border-border/50 p-8">
              {status === "success" ? (
                <motion.div
                  data-ocid="contact.success_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-violet/15 border border-violet/30 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-violet" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. Our team will be in touch within
                    one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="btn-outline-violet px-6 py-2.5 rounded-xl text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Full Name <span className="text-violet">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        data-ocid="contact.name.input"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="John Smith"
                        required
                        className="w-full bg-dark-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-violet/40 focus:border-violet/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Email Address <span className="text-violet">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        data-ocid="contact.email.input"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="john@company.com"
                        required
                        className="w-full bg-dark-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-violet/40 focus:border-violet/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Company Name
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      data-ocid="contact.company.input"
                      value={form.company}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, company: e.target.value }))
                      }
                      placeholder="Acme Corporation"
                      className="w-full bg-dark-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-violet/40 focus:border-violet/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Message <span className="text-violet">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      data-ocid="contact.message.textarea"
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      placeholder="Tell us about your project, team size, timeline, and what you're looking to achieve..."
                      required
                      rows={5}
                      className="w-full bg-dark-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-violet/40 focus:border-violet/50 transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div
                      data-ocid="contact.error_state"
                      className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3"
                    >
                      Something went wrong. Please try again or contact us
                      directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={status === "loading"}
                    className="btn-violet w-full py-3.5 rounded-xl text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Training", href: "#training" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const serviceLinks = [
    "Cloud Consulting",
    "Kubernetes Implementation",
    "DevSecOps Services",
    "Corporate Training",
  ];

  const trainingLinks = [
    "Cloud Computing",
    "Kubernetes & Docker",
    "DevOps & DevSecOps",
    "IaC (Terraform/Ansible)",
    "CI/CD Tools",
    "Cloud Security",
  ];

  return (
    <footer className="bg-dark-surface border-t border-border/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-violet flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-bold">
                <span className="text-foreground">MatrixKube</span>
                <span className="text-violet">Technologies</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
              Enterprise cloud consulting, Kubernetes implementation, DevSecOps
              transformation, and corporate training for the modern cloud-native
              era.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-dark-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-violet hover:border-violet/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-dark-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-violet hover:border-violet/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-dark-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-violet hover:border-violet/30 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-violet transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-violet transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Training + Contact */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-widest mb-4">
              Training
            </h4>
            <ul className="space-y-2.5 mb-8">
              {trainingLinks.slice(0, 4).map((t) => (
                <li key={t}>
                  <a
                    href="#training"
                    className="text-sm text-muted-foreground hover:text-violet transition-colors"
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-widest mb-3">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                hello@matrixkube.tech
              </li>
              <li className="text-sm text-muted-foreground">
                +1 (888) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>© {year} MatrixKubeTechnologies. All rights reserved.</span>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── App Root ──────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-dark text-foreground overflow-x-hidden">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <TechPartnerStrip />
        <StatsBar />
        <ServicesSection />
        <TrainingSection />
        <WhyUsSection />
        <TestimonialsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
