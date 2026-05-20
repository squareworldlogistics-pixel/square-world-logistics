"use client";

import { useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import SectionHeading from "@/components/section-heading";
import MagneticButton from "@/components/magnetic-button";

type Post = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // 1. Check current authentication session status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
        if (data.authenticated) {
          fetchPosts();
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // 2. Fetch all posts for display in dashboard
  async function fetchPosts() {
    setFetchingPosts(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setFetchingPosts(false);
  }

  // 3. Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchPosts();
      } else {
        setError(data.error || "Incorrect password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
      setPosts([]);
      setPassword("");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // 5. Delete a post
  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setActionLoading(id);
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      alert("Failed to delete post: " + error.message);
    } else {
      setPosts(posts.filter((p) => p.id !== id));
    }
    setActionLoading(null);
  };

  // Loader state while checking auth
  if (isAuthenticated === null) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-swl-white)" }}>
        <div style={{ fontSize: "1.125rem", color: "var(--color-swl-slate)" }}>Checking credentials...</div>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "85vh", paddingTop: "8rem", paddingBottom: "6rem", backgroundColor: "var(--color-swl-white)" }}>
      <div className="swl-container" style={{ maxWidth: "800px" }}>
        
        {/* ── UN-AUTHENTICATED STATE: LOGIN PANEL ── */}
        {!isAuthenticated ? (
          <div
            style={{
              maxWidth: "420px",
              margin: "3rem auto",
              padding: "2.5rem",
              backgroundColor: "#fff",
              border: "1px solid #edf2f7",
              borderRadius: "16px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(3,105,161,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem auto",
                  color: "var(--color-swl-blue)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--color-swl-charcoal)", margin: "0 0 0.5rem 0" }}>
                Admin Portal
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--color-swl-slate)", margin: 0 }}>
                Enter your administrative password to log in and publish articles.
              </p>
            </div>

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--color-swl-slate)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
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

              {error && (
                <div style={{ color: "#e53e3e", fontSize: "0.875rem", fontWeight: 500, backgroundColor: "#fff5f5", padding: "0.75rem", borderRadius: "8px", border: "1px solid #fed7d7" }}>
                  {error}
                </div>
              )}

              <MagneticButton type="submit" className="swl-btn--primary" onClick={() => {}}>
                {loading ? "Verifying..." : "Login"}
              </MagneticButton>
            </form>
          </div>
        ) : (
          
          /* ── AUTHENTICATED STATE: DASHBOARD PANEL ── */
          <div>
            {/* Dashboard Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem", borderBottom: "1px solid #edf2f7", paddingBottom: "1.5rem" }}>
              <div>
                <div style={{ fontSize: "0.6875rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-swl-blue)", marginBottom: "0.5rem" }}>
                  WORKSPACE ADMIN
                </div>
                <SectionHeading title="Blog Dashboard" subtitle="Manage, publish, and delete blog articles for Square World Logistics." />
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <MagneticButton href="/blog/admin/new" className="swl-btn--primary">
                  New Article
                </MagneticButton>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "0.75rem 1.25rem",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e0",
                    backgroundColor: "#fff",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "var(--color-swl-charcoal)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fff5f5"; e.currentTarget.style.borderColor = "#feb2b2"; e.currentTarget.style.color = "#c53030"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.borderColor = "#cbd5e0"; e.currentTarget.style.color = "var(--color-swl-charcoal)"; }}
                >
                  Logout
                </button>
              </div>
            </div>

            {/* List of current posts */}
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-swl-charcoal)", marginBottom: "1.25rem" }}>
              Published Articles ({posts.length})
            </h3>

            {fetchingPosts ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-swl-slate)" }}>
                Loading published blogs...
              </div>
            ) : posts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px dashed #cbd5e0", borderRadius: "12px", color: "var(--color-swl-slate)" }}>
                No articles published yet. Click "New Article" to create one.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.25rem",
                      backgroundColor: "#fff",
                      border: "1px solid #edf2f7",
                      borderRadius: "12px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                    }}
                  >
                    <div style={{ minWidth: 0, paddingRight: "1rem" }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        style={{
                          fontWeight: 600,
                          fontSize: "1.0625rem",
                          color: "var(--color-swl-charcoal)",
                          textDecoration: "none",
                          display: "block",
                          marginBottom: "0.25rem",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-swl-blue)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-swl-charcoal)")}
                      >
                        {post.title}
                      </Link>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-swl-slate)" }}>
                        Slug: <span style={{ fontFamily: "monospace", color: "#666" }}>{post.slug}</span> · Posted: {new Date(post.created_at).toLocaleDateString("en-US")}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeletePost(post.id, post.title)}
                      disabled={actionLoading === post.id}
                      style={{
                        padding: "0.5rem 0.875rem",
                        borderRadius: "6px",
                        backgroundColor: "#fff",
                        border: "1px solid #fed7d7",
                        color: "#e53e3e",
                        fontWeight: 600,
                        fontSize: "0.8125rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#e53e3e"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#e53e3e"; }}
                    >
                      {actionLoading === post.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
