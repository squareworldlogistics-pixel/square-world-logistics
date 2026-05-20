import { MetadataRoute } from "next";
import { SERVICES } from "@/lib/site-data";

/**
 * Automatically generates sitemap.xml for SEO.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.squareworldlogistics.com";

  // Static routes
  const routes = ["", "/services", "/about", "/contact", "/privacy", "/terms"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  // Dynamic service routes
  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...serviceRoutes];
}
