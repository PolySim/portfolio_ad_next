import { ReportType } from "@/model/reportModel";
import OrderContainer from "@/ui/Admin/Ordre_des_reportages/OrderContainer";
import React from "react";
import Link from "next/link";

async function getReports() {
  "use server";
  try {
    return await fetch(`${process.env.API_URL}/api/pages`, {
      method: "GET",
      next: { tags: ["reports"] },
    }).then((res) => res.json() as Promise<ReportType[]>);
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default async function OrderReportsPage() {
  const reports = await getReports();

  return (
    <main>
      <div className="mx-6 md:mx-auto w-fit">
        <Link
          href="/admin"
          className="font-bold text-customblue-300 font-m2 text-3xl"
        >
          Retour au menu admin
        </Link>
      </div>
      <OrderContainer reports={reports} />
    </main>
  );
}
