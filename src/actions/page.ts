"use server";

import { ReportType } from "@/model/report.model";
import { revalidateTag } from "next/cache";

export const getPageInformation = async (pageId: string) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/pages/${pageId}`, {
      method: "GET",
      next: { tags: [`page_information_${pageId}`] },
    });
    if (!res.ok) {
      console.error("Error fetching page information", res.statusText);
      return { title: "", article: "", index: -1 } as ReportType;
    }

    return (await res.json()) as ReportType;
  } catch (e) {
    console.error("Error fetching page information", e);
    return { title: "", article: "", index: -1 } as ReportType;
  }
};

export const createReport = async ({
  title,
  article,
}: {
  title: string;
  article?: string;
}) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/pages`, {
      method: "POST",
      body: JSON.stringify({ name: title, presentation: article }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Error creating report", res.statusText);
      return { success: false };
    }
    const data = await res.json();
    revalidateTag("reports");
    return { success: true, report: data };
  } catch (e) {
    console.error("Error creating report", e);
    return { success: false };
  }
};

export const deleteReport = async (pageId: number) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/pages/${pageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Error deleting report", res.statusText);
      return { success: false };
    }
    revalidateTag("reports");
    return { success: true };
  } catch (e) {
    console.error("Error deleting report", e);
    return { success: false };
  }
};

export const getReports = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/pages`, {
      method: "GET",
      next: { tags: ["reports"] },
    });

    if (!res.ok) {
      console.error("Error fetching reports", res.statusText);
      return [];
    }

    return (await res.json()) as ReportType[];
  } catch (e) {
    console.log("Error fetchind reports", e);
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

export const updatePageOrder = async (reports: number[]) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/pages/reorder`, {
      method: "PUT",
      body: JSON.stringify({ reports }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!res.ok) {
      console.error("Error in reorder reports", res.statusText);
      return { success: false };
    }

    return { success: true };
  } catch (e) {
    console.error("Error in reorder reports", e);
    return { success: false };
  }
};

export const updateReportInformation = async (
  pageId: string,
  information: {
    title?: string;
    article?: string;
    status?: boolean;
  },
) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/pages`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: pageId,
        title: information.title || "",
        article: information.article || "",
        status: information.status || true,
      }),
    });

    if (!res.ok) {
      console.error(
        `Error in updating report-${pageId} information`,
        res.statusText,
      );
      return { success: false };
    }

    revalidateTag(`page_information_${pageId}`);
    return { success: true };
  } catch (e) {
    console.error(`Error in updating report-${pageId} information`, e);
    return { success: false };
  }
};
