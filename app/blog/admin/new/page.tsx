"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import SectionHeading from "@/components/section-heading";
import MagneticButton from "@/components/magnetic-button";

export default function NewPostPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // States
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // 1. Guard page — only let authenticated admins stay
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
        if (!data.authenticated) {
          router.replace("/blog/admin");
        }
      } catch (err) {
        setIsAuthenticated(false);
        router.replace("/blog/admin");
      }
    }
    checkAuth();
  }, [router]);

  // 2. Auto-generate slug from Title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    
    // Convert to lowercase, remove non-alphas, replace spaces with hyphens
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-")          // Replace spaces with hyphens
      .replace(/-+/g, "-")           // Remove consecutive hyphens
      .trim();
    
    setSlug(generatedSlug);
  };

  // 3. Handle publish submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !body) {
      setError("Please fill out Title, Slug, and Body Content.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      let thumbnailUrl = "";

      // Upload file to Supabase Object Storage if selected
      if (imageFile) {
        // Clean filename to prevent weird characters
        const cleanName = imageFile.name.replace(/[^a-zA-Z0-9.]/g, "_");
        const filePath = `thumbnails/${Date.now()}_${cleanName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Failed to upload thumbnail: ${uploadError.message}`);
        }

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(filePath);

        thumbnailUrl = publicUrlData.publicUrl;
      }

      // Save post data into the Database
      const { error: insertError } = await supabase
        .from("posts")
        .insert({
          title,
          slug,
          body,
          thumbnail_url: thumbnailUrl || null,
        });

      if (insertError) {
        if (insertError.code === "23505") {
          throw new Error("Slug must be unique. An article with this slug already exists.");
        }
        throw new Error(`Failed to save post: ${insertError.message}`);
      }

      // Successful upload and publish → redirect to blog index
      router.push("/blog");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setSubmitting(false);
    }
  };

  // Loader state while checking auth
  if (isAuthenticated === null) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-swl-white)" }}>
        <div style={{ fontSize: "1.125rem", color: "var(--color-swl-slate)" }}>Verifying permissions...</div>
      </div>
    );
  }

  // Double check in case redirect hasn't completed yet
  if (!isAuthenticated) return null;

  return (
    <main style={{ minHeight: "85vh", paddingTop: "8rem", paddingBottom: "6rem", backgroundColor: "var(--color-swl-white)" }}>
      <div className="swl-container" style={{ maxWidth: "800px" }}>
        
        {/* Back Link */}
        <Link
          href="/blog/admin"
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
          Back to Admin Dashboard
        </Link>

        {/* Header */}
        <div style={{ borderBottom: "1px solid #edf2f7", paddingBottom: "1.5rem", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.6875rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-swl-blue)", marginBottom: "0.5rem" }}>
            CREATION SUITE
          </div>
          <SectionHeading title="Write New Blog Post" subtitle="Draft your article, configure URLs, and upload a thumbnail. Everything is optimized automatically for SEO." />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Title */}
          <div>
            <label htmlFor="title" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-swl-slate)", marginBottom: "0.5rem" }}>
              Article Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Navigating Customs Clearance in Vapi"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e0",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--color-swl-blue)")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e0")}
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-swl-slate)", marginBottom: "0.5rem" }}>
              URL Slug *
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ padding: "0.75rem 0.75rem 0.75rem 1rem", backgroundColor: "#f7fafc", border: "1px solid #cbd5e0", borderRight: "none", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px", color: "var(--color-swl-slate)", fontSize: "0.875rem", userSelect: "none" }}>
                /blog/
              </span>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                placeholder="url-path-friendly"
                required
                style={{
                  flexGrow: 1,
                  padding: "0.75rem 1rem",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                  border: "1px solid #cbd5e0",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-swl-blue)")}
                onBlur={(e) => (e.target.style.borderColor = "#cbd5e0")}
              />
            </div>
            <small style={{ display: "block", fontSize: "0.75rem", color: "var(--color-swl-slate)", marginTop: "0.375rem" }}>
              The URL slug is generated automatically, but you can customize it manually if needed.
            </small>
          </div>

          {/* Thumbnail */}
          <div>
            <label htmlFor="thumbnail" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-swl-slate)", marginBottom: "0.5rem" }}>
              Thumbnail Image
            </label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e0",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
            <small style={{ display: "block", fontSize: "0.75rem", color: "var(--color-swl-slate)", marginTop: "0.375rem" }}>
              Upload a landscape image (JPEG, PNG, WEBP) to use as the blog cover thumbnail.
            </small>
          </div>

          {/* Body Content */}
          <div>
            <label htmlFor="body" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-swl-slate)", marginBottom: "0.5rem" }}>
              Article Body Content *
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your blog content here...
Support markup formatting:
- To write a section heading, start the line with '#' or '##'
- Leave empty lines between paragraphs to structure the flow."
              required
              rows={16}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e0",
                fontSize: "1rem",
                lineHeight: "1.6",
                outline: "none",
                transition: "border-color 0.2s",
                fontFamily: "var(--font-inter), sans-serif",
                resize: "vertical",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--color-swl-blue)")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e0")}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ color: "#e53e3e", fontSize: "0.875rem", fontWeight: 500, backgroundColor: "#fff5f5", padding: "0.75rem", borderRadius: "8px", border: "1px solid #fed7d7" }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <div style={{ borderTop: "1px solid #edf2f7", paddingTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "8px",
                backgroundColor: submitting ? "#a0aec0" : "var(--color-swl-blue)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9375rem",
                border: "none",
                cursor: submitting ? "not-allowed" : "pointer",
                boxShadow: submitting ? "none" : "0 4px 6px -1px rgba(3, 105, 161, 0.2)",
                transition: "background 0.2s ease",
              }}
            >
              {submitting ? "Uploading & Publishing..." : "Publish Article"}
            </button>
          </div>

        </form>

      </div>
    </main>
  );
}
