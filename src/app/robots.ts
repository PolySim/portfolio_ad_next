import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (!(process.env.NODE_ENV === "production")) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin/",
      },
    ],
    sitemap: `${process.env.APP_URL}/sitemap.xml`,
  };
}
