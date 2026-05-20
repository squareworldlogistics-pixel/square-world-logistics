import { MetadataRoute } from "next";

/**
 * Automatically generates robots.txt for search engine crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.squareworldlogistics.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
