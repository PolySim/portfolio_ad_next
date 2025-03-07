import Link from "next/link";
import React from "react";
import FormInformation from "@/ui/Admin/Portfolio/FormInformation";
import PortfolioAdminImages from "@/ui/Admin/Portfolio/PortfolioAdminImages";
import { getPageInformation } from "@/actions/page";
import { getImages } from "@/actions/images";
import AddImage from "@/ui/Admin/Portfolio/AddImage";

export default async function PortfolioAdminPage({
  params,
}: {
  params: { pageId: string };
}) {
  const information = await getPageInformation(params.pageId);
  const images = await getImages(params.pageId);

  return (
    <main className="flex flex-col gap-16">
      <div className="mx-6 md:mx-auto w-fit">
        <Link
          href="/admin"
          className="font-bold text-customblue-300 font-m2 text-3xl"
        >
          Retour au menu admin
        </Link>
      </div>
      {parseInt(params.pageId) < 4 ? (
        <h3 className="text-center font-bold font-m2 text-3xl">
          {information.title}
        </h3>
      ) : (
        <FormInformation information={information} pageId={params.pageId} />
      )}
      <PortfolioAdminImages images={images} pageId={params.pageId} />
      <AddImage pageId={params.pageId} />
    </main>
  );
}
