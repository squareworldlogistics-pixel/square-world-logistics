import type { Metadata } from "next";
import ContactSection from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Square World Logistics. Reach out for shipping inquiries, freight solutions, or custom logistics support.",
};

export default function ContactPage() {
  return (
    <>
      <div style={{ paddingTop: "4rem" }}>
        <ContactSection />
      </div>
    </>
  );
}
