"use server";

import { ReportType } from "@/model/reportModel";
import { revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export const getPageInformation = async (pageId: string) => {
  return await fetch(`${process.env.API_URL}/api/pages/${pageId}`, {
    method: "GET",
    next: { tags: [`page_information_${pageId}`] },
  }).then((res) => res.json() as Promise<ReportType>);
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
