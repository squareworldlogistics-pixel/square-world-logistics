import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/blog/admin/", "/blog/admin/new/"],
    },
    sitemap: "https://www.squareworldlogistics.com/sitemap.xml",
  };
}
