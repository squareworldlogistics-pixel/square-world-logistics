import StatBlock from "@/components/stat-block";
import SectionHeading from "@/components/section-heading";
import MagneticButton from "@/components/magnetic-button";
import ServiceBentoGrid from "@/components/service-bento-grid";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import FlagMarquee from "@/components/flag-marquee";
import HeroSlider from "@/components/hero-slider";
import TrackingHub from "@/components/tracking-hub";
import StatsSection from "@/components/stats-section";
import TestimonialsSection from "@/components/testimonials-section";

import {
  STATS,
  SERVICES,
  TRUST_STATEMENT,
  CTA_BANNER,
  COMPANY,
  ABOUT,
} from "@/lib/site-data";

export default function Home() {
  return (
    <>
      {/* ── SEO: Semantic text content for search engines ── */}
      <article className="sr-only" aria-hidden="true">
        <h2>Square World Logistics — International Freight Forwarding Company in Vapi, Gujarat, India</h2>
        <p>
          Square World Logistics is a leading international logistics and freight forwarding company based in Vapi, Gujarat, India.
          Established in 2023, we provide comprehensive global shipping solutions including international air express courier services,
          air freight cargo transportation, sea freight (FCL and LCL), customs clearance and brokerage, and tailor-made freight solutions.
          Our services cover over 220 countries worldwide through trusted global courier network partners including FedEx, UPS, DHL, and Aramex.
          We specialize in export and import logistics for businesses of all sizes, offering door-to-door delivery, real-time shipment tracking,
          customs documentation support, and 24/7 dedicated logistics assistance. Whether you need to ship packages, documents, or commercial cargo
          internationally, Square World Logistics delivers reliable, transparent, and cost-effective freight forwarding solutions.
        </p>
      </article>

      {/* ── Hero Slider ───────────────────────── */}
      <HeroSlider />

      {/* ── About Snippet & Tracking ─────────── */}
      <section className="swl-section swl-pos-relative">
        <div className="swl-container">
          <div className="swl-about-grid lg:!grid-cols-[1.1fr_0.9fr]">
            {/* Left: Heading + Button + Intro Text */}
            <div>
              <SectionHeading
                title="Who We Are"
                subtitle={`Driving global business with ${COMPANY.name}`}
                align="left"
              />

              <div className="swl-about-content">
                <div className="swl-pos-relative w-fit">
                  <MagneticButton href="/about" className="swl-btn--outline">
                    View More
                  </MagneticButton>
                </div>

                {/* Intro Text moved below button */}
                <div className="swl-about-text">
                  Established in 2023,{" "}
                  <strong>Square World Logistics</strong>{" "}
                  is a young, dynamic, and proactive logistics company dedicated to delivering reliable global shipping and freight solutions. We provide complete end-to-end logistics support, enabling businesses to focus on expanding their global presence while we efficiently manage the operational complexities.
                </div>
              </div>
            </div>

            {/* Right: Tracking Hub (Wider and Higher) */}
            <div className="hidden lg:block swl-pos-relative z-10">
              <TrackingHub />
            </div>

            {/* Mobile Tracking Hub */}
            <div className="lg:hidden mt-8">
              <TrackingHub />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ──────────────────────── */}
      <StatsSection />

      {/* ── Why Trust Us ──────────────────────── */}
      <section className="swl-section swl-bg-white">
        <div className="swl-container">
          <SectionHeading
            title="Why Trust Us"
            subtitle="Built for reliability, trusted worldwide."
            accent="crimson"
          />

          <div className="swl-trust-grid">
            {/* 220+ Countries */}
            <div className="swl-trust-card">
              <div className="swl-trust-card__icon">
                <img src="/icon-global.png" alt="Global reach icon — shipping to over 220 countries worldwide" width="52" height="52" />
              </div>
              <div className="swl-trust-card__eyebrow">Global Reach</div>
              <h3 className="swl-trust-card__title">220+ Countries Served</h3>
              <p className="swl-trust-card__desc">
                A global network that reaches every corner of the world — seamlessly.
              </p>
            </div>

            {/* Safe & Secure */}
            <div className="swl-trust-card">
              <div className="swl-trust-card__icon">
                <img src="/icon-secure.png" alt="Secure shipping — end-to-end cargo security and accountability" width="52" height="52" />
              </div>
              <div className="swl-trust-card__eyebrow">Security</div>
              <h3 className="swl-trust-card__title">100% Safe &amp; Secure</h3>
              <p className="swl-trust-card__desc">
                Every shipment handled with end-to-end security and full accountability.
              </p>
            </div>

            {/* On-Time Delivery */}
            <div className="swl-trust-card">
              <div className="swl-trust-card__icon">
                <img src="/icon-ontime.png" alt="On-time delivery with real-time shipment tracking" width="52" height="52" />
              </div>
              <div className="swl-trust-card__eyebrow">Reliability</div>
              <h3 className="swl-trust-card__title">On-Time Delivery</h3>
              <p className="swl-trust-card__desc">
                Timely deliveries with real-time tracking and proactive updates.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="swl-trust-card">
              <div className="swl-trust-card__icon">
                <img src="/icon-support.png" alt="24/7 premium logistics support and account management" width="52" height="52" />
              </div>
              <div className="swl-trust-card__eyebrow">Support</div>
              <h3 className="swl-trust-card__title">Premium Support</h3>
              <p className="swl-trust-card__desc">
                Expert assistance and dedicated account management for all your logistics needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Preview ─────────────────── */}
      <section className="swl-section swl-bg-white">
        <div className="swl-container">
          <SectionHeading
            title="Core Services"
            subtitle="Comprehensive logistics solutions tailored to your business."
            accent="crimson"
          />

          <div className="swl-services-preview">
            <ServiceBentoGrid limit={3} />
          </div>

          <div className="swl-services-cta">
            <MagneticButton href="/services" className="swl-btn--outline">
              View All Services
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── Global Courier Network Marquee ────── */}
      <FlagMarquee />

      {/* ── Google Testimonials ─────────────── */}
      <TestimonialsSection />

      {/* ── Trust Statement ──────────────────── */}
      <section className="swl-section">
        <div className="swl-container">
          <div className="swl-trust-statement">
            <div className="swl-accent-line swl-accent-line--center" />
            <p className="swl-trust-statement__text">
              &ldquo;{TRUST_STATEMENT}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ──────────────────────── */}
      <FAQSection />

      {/* ── Contact Section ──────────────────── */}
      <div id="contact" className="swl-border-rule">
        <ContactSection
          title="Ready to Ship?"
          subtitle="Get in touch with our team today for a custom logistics solution."
        />
      </div>
    </>
  );
}
