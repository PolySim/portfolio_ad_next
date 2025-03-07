import OrderContainer from "@/ui/Admin/Ordre_des_reportages/OrderContainer";
import React from "react";
import Link from "next/link";
import { getReports } from "@/actions/page";

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
