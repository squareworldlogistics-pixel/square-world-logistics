import { COMPANY } from "@/lib/site-data";
import SectionHeading from "@/components/section-heading";

export default function TermsOfService() {
  return (
    <div className="swl-container" style={{ paddingTop: "4rem", paddingBottom: "8rem" }}>
      <SectionHeading 
        title="Terms of Service" 
        subtitle={`The legal agreement governing your use of ${COMPANY.name} services.`}
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
            list-style-type: decimal;
            color: var(--color-swl-slate);
          }
          .policy-content li {
            margin-bottom: 1rem;
          }
          .policy-content strong {
            color: var(--color-swl-charcoal);
          }
        `}</style>

        <p>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <p>
          Welcome to <strong>{COMPANY.name}</strong>. By accessing our website or utilizing our logistics and shipping services, you agree to be bound by the following terms and conditions.
        </p>

        <h3>1. Services Offered</h3>
        <p>
          {COMPANY.name} provides international shipping, freight forwarding, customs clearance, and related logistics services. We act as an intermediary between shippers and various transportation carriers (air, sea, courier).
        </p>

        <h3>2. Shipping Responsibilities</h3>
        <ul>
          <li><strong>Documentation:</strong> The shipper is responsible for providing accurate and complete documentation for all shipments, including commercial invoices and packing lists.</li>
          <li><strong>Prohibited Items:</strong> Customers must not ship illegal, hazardous, or prohibited goods as defined by international laws or specific carrier restrictions.</li>
          <li><strong>Packaging:</strong> All goods must be appropriately packed for international transport. {COMPANY.name} is not liable for damage resulting from insufficient packaging.</li>
        </ul>

        <h3>3. Payment Terms</h3>
        <p>
          Payment for services must be made according to the agreed-upon rates. We reserve the right to withhold shipments or delivery until all outstanding dues, including duties and taxes paid on behalf of the customer, are settled.
        </p>

        <h3>4. Liability and Insurance</h3>
        <p>
          While we partner with reliable global carriers, our liability is limited according to standard international freight forwarding conventions. We strongly recommend that customers purchase comprehensive cargo insurance for high-value shipments.
        </p>

        <h3>5. Customs and Duties</h3>
        <p>
          The consignee or shipper is responsible for all applicable customs duties, taxes, and regulatory fees. Delays caused by customs inspections or missing documentation are outside of {COMPANY.shortName}&apos;s control.
        </p>

        <h3>6. Modifications to Terms</h3>
        <p>
          We reserve the right to modify these terms at any time. Your continued use of our services after such changes constitutes acceptance of the updated terms.
        </p>

        <h3>7. Governing Law</h3>
        <p>
          These terms are governed by the laws of India. Any disputes arising from our services shall be subject to the exclusive jurisdiction of the courts in Vapi, Gujarat.
        </p>

        <h3>8. Contact Information</h3>
        <p>
          For any legal inquiries regarding these terms, please contact us at:
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
