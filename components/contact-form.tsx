"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import { SERVICES } from "@/lib/site-data";
import MagneticButton from "@/components/magnetic-button";
import TurnstileWidget from "@/components/turnstile-widget";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

/**
 * Client-validated contact contact form with micro-animated focus states.
 * No backend — logs to console and shows success message.
 */
export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam && SERVICES.some(s => s.id === serviceParam)) {
        setForm(prev => ({ ...prev, service: serviceParam }));
      }
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!turnstileToken) {
      setSubmitError("Please complete the security verification.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, turnstileToken }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message. Please try again.");
      }

      setSubmitted(true);
      setForm(INITIAL_STATE);
    } catch (err: any) {
      setSubmitError(err?.message || "Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    /* Clear error on edit */
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        style={{ animation: "swl-fade-up 0.6s ease forwards" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: "var(--color-swl-blue)" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          Message Sent
        </h3>
        <p className="text-sm" style={{ color: "var(--color-swl-slate)" }}>
          We&apos;ll get back to you within 24 hours.
        </p>
        <button
          className="mt-6 text-sm font-medium underline underline-offset-4 cursor-pointer"
          style={{ color: "var(--color-swl-blue)" }}
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="swl-label">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          className="swl-input"
          placeholder="Your full name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          autoComplete="name"
          suppressHydrationWarning
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && <FieldError id="contact-name-error" message={errors.name} />}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="swl-label">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          className="swl-input"
          placeholder="you@company.com"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          autoComplete="email"
          suppressHydrationWarning
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && <FieldError id="contact-email-error" message={errors.email} />}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className="swl-label">
          Phone <span style={{ color: "var(--color-swl-slate)" }}>(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          className="swl-input"
          placeholder="+91 98XX XXX XXX"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          autoComplete="tel"
          suppressHydrationWarning
        />
      </div>

      {/* Service */}
      <div>
        <label htmlFor="contact-service" className="swl-label">
          Service Interest <span style={{ color: "var(--color-swl-slate)" }}>(optional)</span>
        </label>
        <select
          id="contact-service"
          className="swl-input swl-select"
          value={form.service}
          onChange={(e) => updateField("service", e.target.value)}
        >
          <option value="">Select a service</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="swl-label">
          Message
        </label>
        <textarea
          id="contact-message"
          className="swl-input swl-textarea"
          placeholder="Tell us about your logistics needs..."
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          rows={4}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && <FieldError id="contact-message-error" message={errors.message} />}
      </div>

      {submitError && (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "8px",
            color: "var(--color-swl-crimson)",
            fontSize: "0.875rem",
            lineHeight: 1.5,
          }}
        >
          {submitError}
        </div>
      )}

      {/* Cloudflare Turnstile */}
      <TurnstileWidget
        onVerify={handleTurnstileVerify}
        onExpire={handleTurnstileExpire}
      />

      <div className="mt-2">
        <MagneticButton
          type="submit"
          className="swl-btn--primary w-full md:w-auto justify-center"
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Send Message"}
          {!submitting && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </MagneticButton>
      </div>
    </form>
  );
}

/* ── Field Error ─────────────────────────────── */

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <span
      id={id}
      className="text-xs mt-1 block"
      style={{ color: "var(--color-swl-crimson)" }}
      role="alert"
      aria-live="polite"
    >
      {message}
    </span>
  );
}
