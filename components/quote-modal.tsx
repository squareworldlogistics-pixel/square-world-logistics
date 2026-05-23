"use client";

import { COMPANY } from "@/lib/site-data";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@/components/ui/animated-modal";

export default function QuoteModal({
  serviceName,
  serviceId,
}: {
  serviceName: string;
  serviceId: string;
}) {
  return (
    <Modal>
      <ModalTrigger className="swl-btn--primary w-full flex items-center justify-center gap-2 cursor-pointer">
        <span>Request Quote</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </ModalTrigger>

      <ModalBody className="md:max-w-[520px]">
        <ModalContent>
          {/* Header */}
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "rgba(59, 110, 181, 0.1)",
                marginBottom: "1rem",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3B6EB5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--color-swl-charcoal)",
                marginBottom: "0.5rem",
              }}
            >
              Get a Quick Quote
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-swl-slate)",
                lineHeight: 1.5,
              }}
            >
              Fill in your details and we&apos;ll get back to you with a tailored
              quote for <strong>{serviceName}</strong>.
            </p>
          </div>

          {/* Form Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--color-swl-slate)",
                    marginBottom: "0.375rem",
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.875rem",
                    border: "1px solid var(--color-swl-rule)",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                    color: "var(--color-swl-charcoal)",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-swl-blue)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-swl-rule)")
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--color-swl-slate)",
                    marginBottom: "0.375rem",
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.875rem",
                    border: "1px solid var(--color-swl-rule)",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                    color: "var(--color-swl-charcoal)",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-swl-blue)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-swl-rule)")
                  }
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--color-swl-slate)",
                  marginBottom: "0.375rem",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  border: "1px solid var(--color-swl-rule)",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  color: "var(--color-swl-charcoal)",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-swl-blue)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-swl-rule)")
                }
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--color-swl-slate)",
                  marginBottom: "0.375rem",
                }}
              >
                Message (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your shipment requirements..."
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  border: "1px solid var(--color-swl-rule)",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  color: "var(--color-swl-charcoal)",
                  outline: "none",
                  resize: "vertical",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-swl-blue)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-swl-rule)")
                }
              />
            </div>
          </div>
        </ModalContent>

        <ModalFooter className="flex gap-3 items-center justify-between">
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--color-swl-slate)",
              margin: 0,
            }}
          >
            Or call us: <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} style={{ color: "var(--color-swl-blue)", fontWeight: 600 }}>{COMPANY.phone}</a>
          </p>
          <button
            className="swl-btn--primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            Submit Request
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
