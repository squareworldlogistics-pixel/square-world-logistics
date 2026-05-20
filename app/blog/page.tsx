import { supabase } from "@/lib/supabase";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import MagneticButton from "@/components/magnetic-button";

export const revalidate = 0; // Disable dynamic caching so newly published blogs show immediately

export default async function BlogPage() {
  // Fetch posts from Supabase sorted by created_at descending
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts from Supabase:", error);
  }

  // Format date nicely
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Safe helper to strip HTML or Markdown for the card summary
  const getExcerpt = (text: string, maxLength = 160) => {
    const stripped = text.replace(/<[^>]*>/g, ""); // strip HTML tags
    if (stripped.length <= maxLength) return stripped;
    return stripped.slice(0, maxLength) + "...";
  };

  return (
    <main style={{ minHeight: "80vh", paddingTop: "8rem", paddingBottom: "6rem", backgroundColor: "var(--color-swl-white)" }}>
      <div className="swl-container">
        
        {/* Section Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3.5rem" }}>
          <div>
            <div
              style={{
                fontSize: "0.6875rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-swl-blue)",
                marginBottom: "0.5rem",
              }}
            >
              LOGISTICS WRITINGS
            </div>
            <SectionHeading
              title="Global Insights & Logistics Blog"
              subtitle="Expert analysis, news, and perspectives on global freight forwarding, customs clearance, and supply chain management."
            />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <MagneticButton href="/blog/admin" className="swl-btn--outline">
              Admin Portal
            </MagneticButton>
          </div>
        </div>

        {/* Blog grid */}
        {!posts || posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              border: "1px dashed var(--color-swl-slate-light)",
              borderRadius: "12px",
              backgroundColor: "#fcfcfc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            <div style={{ fontSize: "1.25rem", fontWeight: 500, color: "var(--color-swl-charcoal)" }}>
              No Articles Published Yet
            </div>
            <p style={{ color: "var(--color-swl-slate)", maxWidth: "450px", margin: 0, fontSize: "0.9375rem", lineHeight: 1.6 }}>
              Our logistics experts are currently drafting high-quality articles. Check back soon, or log in to the admin panel to post your first article!
            </p>
            <MagneticButton href="/blog/admin" className="swl-btn--primary">
              Write First Post
            </MagneticButton>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {posts.map((post) => (
              <article
                key={post.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fff",
                  border: "1px solid #edf2f7",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                className="group hover:-translate-y-1 hover:shadow-xl"
              >
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}>
                  
                  {/* Thumbnail Image Container */}
                  <div style={{ width: "100%", height: "220px", position: "relative", backgroundColor: "#f3f4f6", overflow: "hidden" }}>
                    {post.thumbnail_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                        className="group-hover:scale-105"
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#a0aec0", fontSize: "0.875rem" }}>
                        No Thumbnail Provided
                      </div>
                    )}
                    
                    {/* Floating badge for date */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "1rem",
                        left: "1rem",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--color-swl-blue)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {formatDate(post.created_at)}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flexGrow: 1, gap: "0.875rem" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        fontSize: "1.375rem",
                        fontWeight: 400,
                        color: "var(--color-swl-charcoal)",
                        lineHeight: 1.3,
                        margin: 0,
                        transition: "color 0.2s ease",
                      }}
                      className="group-hover:text-sky-700"
                    >
                      {post.title}
                    </h3>
                    
                    <p
                      style={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.6,
                        color: "var(--color-swl-slate)",
                        margin: 0,
                      }}
                    >
                      {getExcerpt(post.body)}
                    </p>
                    
                    <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-swl-blue)" }}>
                      Read Article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s ease" }} className="group-hover:translate-x-1">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
