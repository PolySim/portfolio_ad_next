"use server";

import { ReportType } from "@/model/report.model";
import { revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { AboutType } from "@/model/about.model";

export const getPageInformation = async (pageId: string) => {
  const res = await fetch(`${process.env.API_URL}/api/pages/${pageId}`, {
    method: "GET",
    next: { tags: [`page_information_${pageId}`] },
  });
  return (await res.json()) as ReportType;
};

export const createReport = async ({
  title,
  article,
}: {
  title: string;
  article?: string;
}) => {
  await fetch(`${process.env.API_URL}/api/pages`, {
    method: "POST",
    body: JSON.stringify({ title, article }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json() as Promise<ReportType>)
    .then((data) => {
      revalidateTag("reports");
      redirect(`/admin/portfolio/${data.index}`, RedirectType.push);
    });
};

export const deleteReport = async (pageId: number) => {
  await fetch(`${process.env.API_URL}/api/pages/${pageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    revalidateTag("reports");
  });
};

export const getReports = async () => {
  try {
    return await fetch(`${process.env.API_URL}/api/pages`, {
      method: "GET",
      next: { tags: ["reports"] },
    }).then((res) => res.json() as Promise<ReportType[]>);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getPages = async () => {
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
};

export const getBiography = async () => {
  try {
    return await fetch(`${process.env.API_URL}/api/about`, {
      method: "GET",
      next: { tags: ["about"] },
    }).then((res) => res.json() as Promise<AboutType>);
  } catch (e) {
    console.log(e);
    return { fr: "", en: "" };
  }
};
