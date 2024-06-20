import { ReportType } from "@/model/reportModel";
import { ImageType } from "@/app/portfolio/[pageId]/page";
import Link from "next/link";
import React from "react";
import FormInformation from "@/ui/Admin/Portfolio/FormInformation";

const getPageInformation = async (pageId: string) => {
  "use server";
  return await fetch(`${process.env.API_URL}/api/pages/${pageId}`, {
    method: "GET",
    next: { tags: [`page_information_${pageId}`] },
  }).then((res) => res.json() as Promise<ReportType>);
};

const getImages = async (pageId: string) => {
  "use server";
  try {
    return await fetch(`${process.env.API_URL}/api/images?num=${pageId}`, {
      method: "GET",
      next: { tags: [`images_${pageId}`] },
    }).then((res) => res.json() as Promise<ImageType[]>);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default async function PortfolioAdminPage({
  params,
}: {
  params: { pageId: string };
}) {
  const information = await getPageInformation(params.pageId);
  const images = await getImages(params.pageId);

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
      {parseInt(params.pageId) < 4 ? (
        <h3 className="text-center font-bold mt-10 font-m2 text-3xl">
          {information.title}
        </h3>
      ) : (
        <FormInformation information={information} pageId={params.pageId} />
      )}
    </main>
  );
}
