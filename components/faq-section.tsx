"use client";

import { useState } from "react";
import { FAQS } from "@/lib/site-data";
import SectionHeading from "./section-heading";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="swl-section">
      <div className="swl-container">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our global logistics services."
            align="center"
          />

          <div style={{ marginTop: "4rem" }}>
            {FAQS.map((faq, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid var(--color-swl-rule)",
                  paddingBottom: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: "var(--color-swl-charcoal)",
                      lineHeight: "1.4",
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    {faq.question}
                  </span>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      position: "relative",
                      flexShrink: 0,
                      marginLeft: "1.5rem",
                    }}
                  >
                    {/* Hand-drawn style plus/minus */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "0",
                        right: "0",
                        height: "2px",
                        backgroundColor: "var(--color-swl-blue)",
                        transform: "translateY(-50%)",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        bottom: "0",
                        left: "50%",
                        width: "2px",
                        backgroundColor: "var(--color-swl-blue)",
                        transform: openIndex === index ? "translateX(-50%) rotate(90deg)" : "translateX(-50%)",
                        opacity: openIndex === index ? 0 : 1,
                        transition: "all 0.3s ease",
                      }}
                    />
                  </div>
                </button>

                <div
                  style={{
                    maxHeight: openIndex === index ? "500px" : "0",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <div
                    style={{
                      paddingTop: "1rem",
                      fontSize: "0.9375rem",
                      lineHeight: "1.7",
                      color: "var(--color-swl-slate)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom link without wavy underline */}
          <div style={{ textAlign: "center", marginTop: "3rem", opacity: 0.8 }}>
             <div style={{ fontSize: "0.875rem", color: "var(--color-swl-slate)" }}>
                Still have questions? <a href="/contact" style={{ color: "var(--color-swl-blue)", textDecoration: "underline", fontWeight: 500 }}>Contact our team</a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
