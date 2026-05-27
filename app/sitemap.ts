import { MetadataRoute } from "next";
import { SERVICES } from "@/lib/site-data";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.squareworldlogistics.com";

  // Base routes
  const routes = ["", "/services", "/about", "/blog", "/contact", "/coming-soon"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : route === "/services" ? 0.9 : 0.8,
  }));

  // Service routes
  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Blog posts dynamic routes
  let blogRoutes: any[] = [];
  try {
    const { data: posts } = await supabase
      .from("posts")
      .select("slug, created_at")
      .neq("slug", "__site_settings__")
      .order("created_at", { ascending: false });

    if (posts) {
      blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.created_at ? new Date(post.created_at).toISOString() : new Date().toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error generating sitemap blog routes:", error);
  }

  return [...routes, ...serviceRoutes, ...blogRoutes];
}
