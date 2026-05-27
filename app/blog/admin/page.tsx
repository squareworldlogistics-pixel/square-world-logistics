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

  // Site Launch & Status States
  const [comingSoonActive, setComingSoonActive] = useState(false);
  const [maintenanceActive, setMaintenanceActive] = useState(false);
  const [countdownTarget, setCountdownTarget] = useState("2026-06-01T00:00:00");
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [settingsError, setSettingsError] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
        if (data.authenticated) {
          fetchPosts();
          loadSettings();
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch launch and status settings
  async function loadSettings() {
    setLoadingSettings(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setComingSoonActive(!!data.comingSoonActive);
        setMaintenanceActive(!!data.maintenanceActive);
        if (data.countdownTarget) {
          setCountdownTarget(data.countdownTarget);
        }
      }
    } catch (err) {
      console.error("Failed to load coming soon settings:", err);
    } finally {
      setLoadingSettings(false);
    }
  }

  // Save updated settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSuccess(false);
    setSettingsError("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comingSoonActive,
          maintenanceActive,
          countdownTarget,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSettingsSuccess(true);
        setTimeout(() => setSettingsSuccess(false), 3000);
      } else {
        setSettingsError(data.error || "Failed to save settings.");
      }
    } catch (err) {
      setSettingsError("An error occurred while saving launch settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  // 2. Fetch all posts for display in dashboard
  async function fetchPosts() {
    setFetchingPosts(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, created_at")
      .neq("slug", "__site_settings__")
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
        loadSettings();
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
                  onClick={() => setIsSettingsOpen(true)}
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
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f7fafc"; e.currentTarget.style.borderColor = "var(--color-swl-blue)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.borderColor = "#cbd5e0"; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  Site Status
                </button>
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

            {/* ── MINIMALIST GATEKEEPER DIALOG MODAL ── */}
            {isSettingsOpen && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 100000,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.5rem",
                  backdropFilter: "blur(8px)",
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                  animation: "fadeIn 0.2s ease-out",
                }}
                onClick={() => setIsSettingsOpen(false)}
              >
                <div
                  style={{
                    width: "100%",
                    maxWidth: "420px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #edf2f7",
                    borderRadius: "20px",
                    padding: "2rem",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                    position: "relative",
                    animation: "scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    style={{
                      position: "absolute",
                      top: "1.25rem",
                      right: "1.25rem",
                      border: "none",
                      background: "transparent",
                      color: "#a0aec0",
                      cursor: "pointer",
                      padding: "0.25rem",
                      borderRadius: "50%",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-swl-charcoal)"; e.currentTarget.style.backgroundColor = "#f7fafc"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#a0aec0"; e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>

                  <div style={{ marginBottom: "1.75rem" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-swl-charcoal)", margin: "0 0 0.25rem 0" }}>
                      Site Status Controls
                    </h3>
                    <p style={{ fontSize: "0.8125rem", color: "#718096", margin: 0 }}>
                      Manage status screens and countdown launch times.
                    </p>
                  </div>

                  {loadingSettings ? (
                    <div style={{ color: "var(--color-swl-slate)", fontSize: "0.875rem", padding: "1.5rem 0", textAlign: "center" }}>
                      Loading settings...
                    </div>
                  ) : (
                    <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      {/* Toggles */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {/* Coming Soon */}
                        <div
                          onClick={() => setComingSoonActive(!comingSoonActive)}
                          style={{
                            padding: "1rem 1.25rem",
                            borderRadius: "12px",
                            border: `1.5px solid ${comingSoonActive ? "var(--color-swl-blue)" : "#edf2f7"}`,
                            backgroundColor: comingSoonActive ? "rgba(59,110,181,0.01)" : "#fff",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--color-swl-charcoal)" }}>Coming Soon Screen</div>
                            <div style={{ fontSize: "0.75rem", color: "#718096", marginTop: "0.125rem" }}>Redirects to countdown page</div>
                          </div>
                          <div
                            style={{
                              width: "38px",
                              height: "20px",
                              borderRadius: "100px",
                              backgroundColor: comingSoonActive ? "var(--color-swl-blue)" : "#cbd5e0",
                              position: "relative",
                              transition: "background-color 0.15s",
                            }}
                          >
                            <div
                              style={{
                                width: "14px",
                                height: "14px",
                                borderRadius: "50%",
                                backgroundColor: "#fff",
                                position: "absolute",
                                top: "3px",
                                left: comingSoonActive ? "21px" : "3px",
                                transition: "left 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                              }}
                            />
                          </div>
                        </div>

                        {/* Maintenance Mode */}
                        <div
                          onClick={() => setMaintenanceActive(!maintenanceActive)}
                          style={{
                            padding: "1rem 1.25rem",
                            borderRadius: "12px",
                            border: `1.5px solid ${maintenanceActive ? "var(--color-swl-crimson)" : "#edf2f7"}`,
                            backgroundColor: maintenanceActive ? "rgba(139,26,43,0.01)" : "#fff",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--color-swl-charcoal)" }}>Maintenance Mode</div>
                            <div style={{ fontSize: "0.75rem", color: "#718096", marginTop: "0.125rem" }}>Puts entire website offline</div>
                          </div>
                          <div
                            style={{
                              width: "38px",
                              height: "20px",
                              borderRadius: "100px",
                              backgroundColor: maintenanceActive ? "var(--color-swl-crimson)" : "#cbd5e0",
                              position: "relative",
                              transition: "background-color 0.15s",
                            }}
                          >
                            <div
                              style={{
                                width: "14px",
                                height: "14px",
                                borderRadius: "50%",
                                backgroundColor: "#fff",
                                position: "absolute",
                                top: "3px",
                                left: maintenanceActive ? "21px" : "3px",
                                transition: "left 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Date/Time Target Input */}
                      <div style={{ marginTop: "0.5rem" }}>
                        <label
                          htmlFor="countdownTarget"
                          style={{
                            display: "block",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: "#718096",
                            marginBottom: "0.375rem",
                          }}
                        >
                          Countdown Target
                        </label>
                        <input
                          id="countdownTarget"
                          type="datetime-local"
                          value={countdownTarget}
                          onChange={(e) => setCountdownTarget(e.target.value)}
                          style={{
                            padding: "0.625rem 0.875rem",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e0",
                            fontSize: "0.875rem",
                            fontFamily: "var(--font-body), monospace",
                            color: "var(--color-swl-charcoal)",
                            outline: "none",
                            width: "100%",
                          }}
                        />
                      </div>

                      {/* Status Feedbacks */}
                      {settingsError && (
                        <div style={{ color: "#e53e3e", fontSize: "0.8125rem", fontWeight: 500, backgroundColor: "#fff5f5", padding: "0.625rem", borderRadius: "8px", border: "1px solid #fed7d7" }}>
                          {settingsError}
                        </div>
                      )}

                      {settingsSuccess && (
                        <div style={{ color: "#276749", fontSize: "0.8125rem", fontWeight: 600, backgroundColor: "#c6f6d5", padding: "0.625rem", borderRadius: "8px", border: "1px solid #38a169", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#276749" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Settings saved successfully!
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={savingSettings}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "8px",
                          backgroundColor: "var(--color-swl-blue)",
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.15s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          marginTop: "0.5rem",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-swl-blue-dark)")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-swl-blue)")}
                      >
                        {savingSettings ? "Saving..." : "Save Settings"}
                      </button>
                    </form>
                  )}
                </div>

                <style>{`
                  @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                  @keyframes scaleUp {
                    from { transform: scale(0.96); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                  }
                `}</style>
              </div>
            )}

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
