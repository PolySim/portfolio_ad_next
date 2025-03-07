import { MetadataRoute } from "next";
import { getPages } from "@/actions/page";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPages();
  return [
    {
      url: `${process.env.APP_URL}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${process.env.APP_URL}/portfolio/${page.index}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    {
      url: `${process.env.APP_URL}/apropos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${process.env.APP_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
