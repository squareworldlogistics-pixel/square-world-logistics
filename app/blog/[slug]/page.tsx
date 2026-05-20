import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { COMPANY } from "@/lib/site-data";

export const revalidate = 0; // Disable caching to fetch the latest details immediately

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("title, body")
    .eq("slug", slug)
    .single();

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const excerpt = post.body.replace(/<[^>]*>/g, "").slice(0, 150) + "...";

  return {
    title: `${post.title} | ${COMPANY.name} Blog`,
    description: excerpt,
    openGraph: {
      title: post.title,
      description: excerpt,
      type: "article",
    },
  };
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch the article details
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    return notFound();
  }

  // Format date nicely
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Safe formatting for linebreaks in the text body
  const renderBodyContent = (content: string) => {
    return content.split("\n").map((para, index) => {
      const trimmed = para.trim();
      if (!trimmed) return null;
      
      // Basic heading check (e.g. if it starts with #)
      if (trimmed.startsWith("###")) {
        return (
          <h4 key={index} style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.25rem", color: "var(--color-swl-charcoal)", marginTop: "2rem", marginBottom: "1rem", fontWeight: 400 }}>
            {trimmed.replace(/^###\s*/, "")}
          </h4>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h3 key={index} style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.5rem", color: "var(--color-swl-charcoal)", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 400 }}>
            {trimmed.replace(/^##\s*/, "")}
          </h3>
        );
      }
      if (trimmed.startsWith("#")) {
        return (
          <h2 key={index} style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.75rem", color: "var(--color-swl-charcoal)", marginTop: "3rem", marginBottom: "1.25rem", fontWeight: 400 }}>
            {trimmed.replace(/^#\s*/, "")}
          </h2>
        );
      }
      
      return (
        <p
          key={index}
          style={{
            fontSize: "1.0625rem",
            lineHeight: "1.8",
            color: "var(--color-swl-slate)",
            marginBottom: "1.5rem",
          }}
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <main style={{ minHeight: "80vh", paddingTop: "8rem", paddingBottom: "6rem", backgroundColor: "var(--color-swl-white)" }}>
      <div className="swl-container" style={{ maxWidth: "800px" }}>
        
        {/* Back Link */}
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--color-swl-blue)",
            textDecoration: "none",
            marginBottom: "2rem",
          }}
          className="group"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s ease" }} className="group-hover:-translate-x-1">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to all articles
        </Link>

        {/* Article Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.8125rem", color: "var(--color-swl-blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
          <span>{formatDate(post.created_at)}</span>
          <span style={{ color: "#e2e8f0" }}>|</span>
          <span>By {COMPANY.name} Editorial</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 400,
            color: "var(--color-swl-charcoal)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 2rem 0",
          }}
        >
          {post.title}
        </h1>

        {/* Feature Image / Thumbnail */}
        {post.thumbnail_url && (
          <div
            style={{
              width: "100%",
              maxHeight: "480px",
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "3rem",
              backgroundColor: "#f7fafc",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.thumbnail_url}
              alt={post.title}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "480px",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* Content body */}
        <article
          style={{
            fontSize: "1.0625rem",
            lineHeight: "1.8",
            color: "var(--color-swl-slate)",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {renderBodyContent(post.body)}
        </article>

        {/* Bottom CTA Card */}
        <div
          style={{
            marginTop: "4.5rem",
            padding: "2.5rem",
            backgroundColor: "#F8F9FA",
            border: "1px solid #E8EAED",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-swl-charcoal)", fontFamily: "var(--font-display), serif" }}>
            Need help with your logistics and supply chain?
          </div>
          <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--color-swl-slate)" }}>
            Let our dynamic team handle your forwarding, custom clearance, and complex transport needs. Reach out to our team of logistics specialists today.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "var(--color-swl-blue)",
              padding: "0.625rem 1.25rem",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            className="hover:opacity-90"
          >
            Contact Our Experts
          </Link>
        </div>

      </div>
    </main>
  );
}
