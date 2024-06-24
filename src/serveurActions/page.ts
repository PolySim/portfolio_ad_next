"use server";

import { ReportType } from "@/model/reportModel";

export const getPageInformation = async (pageId: string) => {
  return await fetch(`${process.env.API_URL}/api/pages/${pageId}`, {
    method: "GET",
    next: { tags: [`page_information_${pageId}`] },
  }).then((res) => res.json() as Promise<ReportType>);
};
