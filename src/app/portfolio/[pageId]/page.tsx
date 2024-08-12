import { ReportType } from "@/model/reportModel";
import React, { Suspense } from "react";
import FullPage from "@/ui/Portfolio/Fullpage/Fullpage";
import ImagesContainer from "@/ui/Portfolio/ImagesContainer";
import { LoaderCircle } from "lucide-react";

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
        description:
          information.article.length > 300
            ? information.article.slice(0, 300)
            : information.article,
      }
    : {
        title: information.title || "Report",
      };
};

export default async function ImagesPage({
  params,
}: {
  params: { pageId: string };
}) {
  const [information, images] = await Promise.all([
    getPageInformation(params.pageId),
    getImages(params.pageId),
  ]);
  const imagesRefactor = images.reduce(
    (acc: ImageType[], curr, currentIndex) =>
      currentIndex === 0 && information.article
        ? [...acc, curr, { id: -1, description: information.article }]
        : [...acc, curr],
    [] as ImageType[],
  );
  return (
    <main className="mt-8 md:mt-32">
      <Suspense>
        <FullPage images={imagesRefactor} />
      </Suspense>
      <Suspense
        key={params.pageId}
        fallback={
          <div className="flex-1 flex justify-between items-center">
            <LoaderCircle className="rotate" />
          </div>
        }
      >
        <ImagesContainer images={imagesRefactor} />
      </Suspense>
    </main>
  );
}
