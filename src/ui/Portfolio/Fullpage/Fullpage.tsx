import { ImageType } from "@/app/portfolio/[pageId]/page";
import FullPageContainer from "@/ui/Portfolio/Fullpage/FullpageContainer";
import React from "react";
import FullImage from "@/ui/Portfolio/Fullpage/FullImage";
import FullArticle from "@/ui/Portfolio/Fullpage/FullArticle";

const FullPage = async ({ images }: { images: ImageType[] }) => {
  return (
    <FullPageContainer>
      {images.map((image) => (
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
