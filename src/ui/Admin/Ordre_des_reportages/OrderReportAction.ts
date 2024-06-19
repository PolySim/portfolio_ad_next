"use server";

import { ReportType } from "@/model/reportModel";
import { revalidateTag } from "next/cache";

export const orderReportsAction = async (reports: ReportType[]) => {
  return await fetch(`${process.env.API_URL}/api/pages/reorder`, {
    method: "PUT",
    body: JSON.stringify({ reports: reports }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then(() => revalidateTag("reports"))
    .then(() => 200)
    .catch((e) => "error");
};
