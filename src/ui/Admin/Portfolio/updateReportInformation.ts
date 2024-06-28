"use server";

import { revalidateTag } from "next/cache";

export const updateReportInformation = async (
  pageId: string,
  information: {
    title?: string;
    article?: string;
    status?: boolean;
  },
) => {
  return await fetch(`${process.env.API_URL}/api/pages/${pageId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: information.title || "",
      article: information.article || "",
      status: information.status || "",
    }),
    next: { tags: [`page_information_${pageId}`] },
  })
    .then((res) => res.json())
    .then(() => revalidateTag(`page_information_${pageId}`))
    .then(() => 200)
    .catch(() => 400);
};
