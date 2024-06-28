import { MetadataRoute } from "next";
import { ReportType } from "@/model/reportModel";

async function getPages() {
  "use server";
  try {
    const reports = await fetch(`${process.env.API_URL}/api/pages`, {
      method: "GET",
      next: { tags: ["reports"] },
    }).then((res) => res.json() as Promise<ReportType[]>);
    return [
      ...reports,
      { index: 3, title: "Portfolio" },
      { index: 1, title: "Portrait" },
      { index: 2, title: "Publication" },
    ];
  } catch (e) {
    return [];
  }
}

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
