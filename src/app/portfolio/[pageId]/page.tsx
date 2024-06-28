import { ReportType } from "@/model/reportModel";
import SmallImage from "@/ui/Portfolio/smallImage";
import SmallText from "@/ui/Portfolio/smallText";
import React from "react";
import FullPage from "@/ui/Portfolio/Fullpage/Fullpage";

export type ImageType = {
  id: number;
  description?: string;
};

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

export const generateMetadata = async ({
  params,
}: {
  params: { pageId: string };
}) => {
  const information = await getPageInformation(params.pageId);
  return information.article
    ? {
        title: information.title || "Report",
        description: information.article,
      }
    : {
        title: information.title || "Report",
      };
};

export default async function ImagesPage({
  params,
  searchParams,
}: {
  params: { pageId: string };
  searchParams: { open: string; imageClick: string };
}) {
  const information = await getPageInformation(params.pageId);
  const images = await getImages(params.pageId);
  const imagesRefactor = images.reduce(
    (acc: ImageType[], curr, currentIndex) =>
      currentIndex === 0 && information.article
        ? [...acc, curr, { id: -1, description: information.article }]
        : [...acc, curr],
    [] as ImageType[],
  );
  return (
    <main className="mt-8 md:mt-32">
      <FullPage images={imagesRefactor} searchParams={searchParams} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 justify-center items-stretch w-screen max-w-6xl mx-auto p-4">
        {imagesRefactor.map((image, index) => (
          <React.Fragment key={index}>
            {image.id === -1 ? (
              <SmallText
                text={information.article || ""}
                pageId={params.pageId}
                image={image}
                index={index}
              />
            ) : (
              <SmallImage pageId={params.pageId} image={image} index={index} />
            )}
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}
