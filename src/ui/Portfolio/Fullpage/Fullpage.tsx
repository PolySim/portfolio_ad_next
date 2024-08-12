import { ImageType } from "@/app/portfolio/[pageId]/page";
import FullPageContainer from "@/ui/Portfolio/Fullpage/FullpageContainer";
import React from "react";
import FullImage from "@/ui/Portfolio/Fullpage/FullImage";
import FullArticle from "@/ui/Portfolio/Fullpage/FullArticle";
import { getImages } from "@/serveurActions/images";
import { getPageInformation } from "@/serveurActions/page";

const FullPage = async ({ pageId }: { pageId: string }) => {
  const [information, images] = await Promise.all([
    getPageInformation(pageId),
    getImages(pageId),
  ]);
  const imagesRefactor = images.reduce(
    (acc: ImageType[], curr, currentIndex) =>
      currentIndex === 0 && information.article
        ? [...acc, curr, { id: -1, description: information.article }]
        : [...acc, curr],
    [] as ImageType[],
  );

  return (
    <FullPageContainer>
      {imagesRefactor.map((image) => (
        <React.Fragment key={image.id}>
          {image.id === -1 ? (
            <FullArticle article={image.description || ""} />
          ) : (
            <FullImage image={image} />
          )}
        </React.Fragment>
      ))}
    </FullPageContainer>
  );
};

export default FullPage;
