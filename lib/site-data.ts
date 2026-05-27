/* ─────────────────────────────────────────────
 * site-data.ts — Single source of truth for all
 * Square World Logistics website content.
 * Edit this file to update any text on the site.
 * ───────────────────────────────────────────── */

export const FEATURES = {
  showMap: true, // Toggle to true/false to globally enable or disable the animated World Map section
} as const;

export const COMPANY = {
  name: "Square World Logistics",
  shortName: "SWL",
  tagline: "Global Logistics. Simplified.",
  established: 2023,
  countriesCovered: "220+",
  email: "sales.squareworldlogistics@gmail.com",
  phone2: "+91 6355275515",
  phone: "+91 7400424550",
  address: "C-16, M-CUBE THE BUSINESS HUB, N H NO.48, SEARVICE ROAD, OPP. TALUKA SEVA SADAN,BALITHA, VAPI,GUJARAT 396191",
  officeHours: "Mon - Sat: 10:00 AM TO 06:00 PM",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.9646329682!2d72.9096952!3d20.3962641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0cfeda8cd4c5f%3A0xe091940fac1fe2ac!2sSQUARE%20WORLD%20LOGISTICS!5e0!3m2!1sen!2sin!4v1715200000000!5m2!1sen!2sin",
  googleProfileUrl: "https://share.google/nrK1G00CpPh7KJDTH",
} as const;

export const REVIEWS = [
  {
    author: "Kavita Halpati",
    text: "Great business hub with top-notch facilities — comfortable workspaces, clean meeting rooms, and good amenities. The service staff were courteous and quick to help. Parcel delivery was on time and well-managed. Very satisfied with the service!",
    rating: 5,
  },
  {
    author: "Rishika Singh",
    text: "Their team is exceptionally knowledgeable about customs regulations, which has made our process seamless. Shipments always arrive securely packaged, and their real-time tracking gives me peace of mind. Highly professional!",
    rating: 5,

  },
  {
    author: "Amjad Shaikh",
    text: "The best transportation services I ever had in vapi, and staff also very polite and helpful",
    rating: 5
  }
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const STATS = [
  { value: 220, suffix: "+", label: "Countries Served" },
  { value: 2023, suffix: "", label: "Established" },
  { value: 5, suffix: "", label: "Core Services" },
  { value: 24, suffix: "/7", label: "Support" },
] as const;

export const VALUE_PROPS = [
  {
    title: "220+ Countries",
    description: "Global network covering 220+ countries worldwide.",
    icon: "globe",
  },
  {
    title: "Safe & Secure",
    description: "Your cargo is in safe hands with end-to-end security.",
    icon: "shield",
  },
  {
    title: "On-Time Delivery",
    description: "Timely deliveries with real-time tracking and updates.",
    icon: "clock",
  },
  {
    title: "24/7 Support",
    description: "Our support team is available 24/7 to assist you.",
    icon: "headset",
  },
] as const;

export type Service = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    id: "air-express",
    title: "International Air Express",
    subtitle: "Export & Import",
    description:
      "Fast and secure international air express services for both export and import shipments. Through our trusted global courier network partners, we ensure time-sensitive packages and documents are delivered quickly and safely across the world.",
    features: [
      "Door-to-door express delivery",
      "Worldwide shipping coverage",
      "Fast transit and priority handling",
      "Shipment tracking and visibility",
      "Secure and reliable transportation",
    ],
  },
  {
    id: "air-freight",
    title: "International Air Freight",
    subtitle: "Export & Import",
    description:
      "Efficient cargo transportation with flexible and cost-effective options. We handle both export and import shipments with complete coordination, ensuring smooth cargo movement from origin to destination.",
    features: [
      "Commercial cargo handling",
      "Consolidation services",
      "Airport-to-airport and door-to-door solutions",
      "Customs documentation support",
      "Time-critical shipment management",
    ],
  },
  {
    id: "sea-freight",
    title: "International Sea Freight",
    subtitle: "Export & Import",
    description:
      "Dependable sea freight solutions for businesses looking for economical and scalable international shipping options. Whether FCL or LCL, our team ensures safe and efficient cargo transportation worldwide.",
    features: [
      "FCL & LCL shipments",
      "Import and export cargo handling",
      "Global port connectivity",
      "Cargo consolidation services",
      "End-to-end shipment coordination",
    ],
  },
  {
    id: "tailor-made",
    title: "Tailor Made Freight Solution",
    subtitle: "Customised Logistics ",
    description:
      "Customized logistics strategies that match your shipping needs, timelines, and budget. We work closely with our customers to improve efficiency and reduce operational challenges.",
    features: [
      "Customized logistics planning",
      "Cost-effective shipping solutions",
      "Flexible transportation options",
      "Industry-specific logistics support",
      "Dedicated customer assistance",
    ],
  },
  {
    id: "customs",
    title: "Customs Clearance Service",
    subtitle: "Import & Export",
    description:
      "Smooth and hassle-free customs clearance services. We ensure all documentation, compliance procedures, and regulatory requirements are handled efficiently to avoid delays.",
    features: [
      "Import & export documentation",
      "Duty and compliance assistance",
      "Customs coordination and processing",
      "Regulatory guidance",
      "Fast and efficient clearance procedures",
    ],
  },
];

export const ABOUT = {
  intro: [
    "Established in 2023, Square World Logistics is a young, dynamic, and proactive logistics company dedicated to delivering reliable global shipping and freight solutions. We provide complete end-to-end logistics support, enabling businesses to focus on expanding their global presence while we efficiently manage the operational complexities.",
    "At Square World Logistics, customer satisfaction is at the heart of everything we do. We are committed to understanding and fulfilling every customer requirement with professionalism, transparency, and the highest standards of service.",
    "From express courier deliveries to comprehensive freight forwarding and customs support, we offer seamless import and export solutions tailored to businesses of all sizes.",
  ],
  vision:
    "To become the most admirable and trusted service provider in international shipping and logistics.",
  mission:
    "To deliver optimized logistics solutions with complete transparency, reliability, and customer-focused service excellence.",
  whyUs: [
    "Established with global logistics expertise",
    "End-to-end shipping and freight solutions",
    "Transparent and customer-centric approach",
    "Reliable international courier partnerships",
    "Efficient customs and documentation support",
    "Service coverage across 220+ countries with seamless global reach",
    "Dedicated and responsive support team",
  ],
  commitment:
    "We believe logistics is more than transportation — it is about building trust, ensuring reliability, and supporting business growth worldwide. Our team works proactively to provide smooth, cost-effective, and customized logistics solutions that help our clients succeed in the global marketplace.",
} as const;

export const HOME_HERO = {
  headline: "Global Logistics.",
  headlineLine2: "Simplified.",
  subtext:
    "Reliable shipping and freight solutions across 220+ countries. End-to-end logistics support so you can focus on growth.",
  cta: "Explore Services",
} as const;

export const SERVICE_PREVIEW_IDS = [
  "air-express",
  "air-freight",
  "sea-freight",
] as const;

export const TRUST_STATEMENT =
  "At Square World Logistics, we are committed to providing reliable, transparent, and customer-focused logistics solutions that help businesses move goods globally with confidence and ease.";

export const CTA_BANNER = {
  headline: "Ready to ship globally?",
  subtext: "Let us handle the complexity while you focus on growth.",
  cta: "Get In Touch",
} as const;

export const FAQS = [
  {
    question: "Which countries do you provide shipping services to?",
    answer: "We provide comprehensive shipping and logistics services to over 220+ countries worldwide through our trusted global network partners.",
  },
  {
    question: "Do you handle both import and export shipments?",
    answer: "Yes, we handle both export and import shipments for Air Express, Air Freight, and Sea Freight, ensuring end-to-end coordination.",
  },
  {
    question: "How can I track my shipment?",
    answer: "Once your shipment is processed, we provide a tracking number and regular proactive updates so you can monitor your cargo's journey in real-time.",
  },
  {
    question: "Do you provide customs clearance services?",
    answer: "Yes, we offer expert customs clearance services for both imports and exports, handling all documentation and compliance to ensure a smooth process.",
  },
  {
    question: "Can you provide customized logistics solutions?",
    answer: "Absolutely. We specialize in tailor-made freight solutions designed to match your specific timelines, budget, and business requirements.",
  },
] as const;

export const LEADERSHIP = [
  {
    name: "Priyank Mistry",
    role: "Founder",
    image: "/founder-new.jpg",
    vision: "Our operational strength lies in our agility. By combining human expertise with streamlined processes, we ensure that every parcel tells a story of successful global connection.",
    ethics: [
      "Operational Integrity",
      "Continuous Innovation",
      "Collaborative Growth"
    ]
  },
  {
    name: "Spandan Behera",
    role: "Co-Founder",
    image: "/co-founder.png",
    vision: "To redefine global logistics through radical transparency and unwavering reliability. We didn't just build a shipping company; we built a promise of excellence that spans every border.",
    ethics: [
      "Absolute Transparency",
      "Customer-First Mindset",
      "Proactive Problem Solving"
    ]
  }
] as const;

export const PROHIBITED_ITEMS = [
  "Narcotic Drugs & Psychotropic Substances",
  "Firearms, Ammunition & Weapons",
  "Explosives & Flammable Materials",
  "Radioactive & Corrosive Substances",
  "Currency, Coins & Bullion",
  "Precious Stones & High-Value Jewellery",
  "Live Animals & Rare Plant Species",
  "Pornographic or Obscene Materials",
  "Hazardous Waste & Toxic Chemicals",
  "Counterfeit Goods & Pirated Items"
] as const;

export const INCOTERMS = [
  { term: "EXW", name: "Ex Works", description: "The seller makes the goods available at their premises. The buyer bears all costs and risks from there." },
  { term: "FOB", name: "Free On Board", description: "The seller delivers goods on board the vessel nominated by the buyer. Risk passes when goods are on board." },
  { term: "CIF", name: "Cost, Insurance & Freight", description: "Seller pays for delivery to the destination port and basic insurance. Risk passes at the origin port." },
  { term: "DDP", name: "Delivered Duty Paid", description: "Seller bears all costs and risks, including import duties and taxes, until goods reach the buyer's destination." },
  { term: "DAP", name: "Delivered At Place", description: "Seller is responsible for delivery to a named place, but the buyer handles import clearance and duties." }
] as const;

export const CARRIERS = [
  { name: "FedEx", trackingUrl: "https://www.fedex.com/fedextrack/?tracknumbers=" },
  { name: "UPS", trackingUrl: "https://www.ups.com/track?tracknum=" },
  { name: "DHL", trackingUrl: "https://www.dhl.com/global-en/home/tracking.html?tracking-id=" },
  { name: "Aramex", trackingUrl: "https://www.aramex.com/track/results?shipmentNumber=" },
] as const;

export const SUSTAINABILITY = {
  headline: "Sustainable Global Reach",
  subtext: "We believe that responsible logistics is the future of global trade. Square World Logistics is committed to reducing the environmental impact of shipping through innovation and operational efficiency.",
  pillars: [
    {
      title: "Route Optimization",
      description: "Using advanced logistics planning to minimize transit distances and reduce carbon emissions per shipment.",
      icon: "leaf"
    },
    {
      title: "Paperless Operations",
      description: "Transitioning to 100% digital documentation for customs and freight management to reduce waste.",
      icon: "file-text"
    },
    {
      title: "Responsible Partnerships",
      description: "Collaborating with global carriers who prioritize green fuel technologies and sustainable fleet management.",
      icon: "users"
    }
  ]
} as const;
