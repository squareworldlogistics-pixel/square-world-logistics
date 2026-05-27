"use client";

import { useState } from "react";
import { FAQS } from "@/lib/site-data";
import SectionHeading from "./section-heading";

/**
 * Premium elegant FAQ block.
 * Completely optimized to remove inline styles for A+ PageSpeed Performance.
 */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="swl-section">
      <div className="swl-container">
        <div className="swl-faq-wrap">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our global logistics services."
            align="center"
          />

          <div className="swl-faq-list">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="swl-faq-item">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="swl-faq-btn"
                    aria-expanded={isOpen}
                  >
                    <span className="swl-faq-question">
                      {faq.question}
                    </span>
                    <div className="swl-faq-toggle">
                      {/* Hand-drawn style plus/minus */}
                      <div className="swl-faq-toggle__h" />
                      <div 
                        className="swl-faq-toggle__v" 
                        style={{
                          transform: isOpen ? "translateX(-50%) rotate(90deg)" : "translateX(-50%)",
                          opacity: isOpen ? 0 : 1,
                        }}
                      />
                    </div>
                  </button>

                  <div
                    className="swl-faq-answer"
                    style={{
                      maxHeight: isOpen ? "500px" : "0",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="swl-faq-answer__inner">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom link without wavy underline */}
          <div className="swl-faq-footer">
             <div className="swl-faq-footer__text">
                Still have questions?{" "}
                <a href="/contact" className="swl-faq-footer__link">
                  Contact our team
                </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
