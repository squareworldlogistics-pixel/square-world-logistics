import { COMPANY } from "@/lib/site-data";
import SectionHeading from "@/components/section-heading";

export default function PrivacyPolicy() {
  return (
    <div className="swl-container" style={{ paddingTop: "4rem", paddingBottom: "8rem" }}>
      <SectionHeading 
        title="Privacy Policy" 
        subtitle={`How ${COMPANY.name} collects, uses, and protects your information.`}
        accent="blue"
      />
      
      <div className="policy-content" style={{ marginTop: "3rem", maxWidth: "800px" }}>
        <style>{`
          .policy-content h3 {
            font-family: var(--font-display), serif;
            font-size: 1.5rem;
            margin: 2.5rem 0 1rem;
            color: var(--color-swl-charcoal);
          }
          .policy-content p {
            margin-bottom: 1.5rem;
            color: var(--color-swl-slate);
            line-height: 1.8;
          }
          .policy-content ul {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
            list-style-type: disc;
            color: var(--color-swl-slate);
          }
          .policy-content li {
            margin-bottom: 0.5rem;
          }
        `}</style>

        <p>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <p>
          At <strong>{COMPANY.name}</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our logistics services.
        </p>

        <h3>1. Information We Collect</h3>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </p>
        <ul>
          <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you inquire about our services.</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, and your access times.</li>
          <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase or request services.</li>
        </ul>

        <h3>2. Use of Your Information</h3>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul>
          <li>Deliver, manage, and coordinate your shipments and logistics services.</li>
          <li>Generate invoices and process payments.</li>
          <li>Email you regarding your shipment status or inquiries.</li>
          <li>Improve our website and service offerings.</li>
          <li>Comply with international shipping regulations and customs requirements.</li>
        </ul>

        <h3>3. Disclosure of Your Information</h3>
        <p>
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </p>
        <ul>
          <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
          <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including courier partners, customs brokers, payment processing, and data analysis.</li>
        </ul>

        <h3>4. Security of Your Information</h3>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
        </p>

        <h3>5. Contact Us</h3>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at:
        </p>
        <p>
          <strong>{COMPANY.name}</strong><br />
          {COMPANY.address}<br />
          Email: {COMPANY.email}<br />
          Phone: {COMPANY.phone}
        </p>
      </div>
    </div>
  );
}
