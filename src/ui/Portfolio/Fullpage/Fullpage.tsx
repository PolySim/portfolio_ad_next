import { ImageType } from "@/app/portfolio/[pageId]/page";
import FullPageContainer from "@/ui/Portfolio/Fullpage/FullpageContainer";
import React from "react";
import FullImage from "@/ui/Portfolio/Fullpage/FullImage";

const FullPage = async ({
  images,
  imageClick,
}: {
  images: ImageType[];
  imageClick: string;
}) => {
  return (
    <FullPageContainer imageClick={imageClick}>
      {images.map((image) => (
        <React.Fragment key={image.id}>
          {image.id === -1 ? <></> : <FullImage image={image} />}
        </React.Fragment>
      ))}
    </FullPageContainer>
  );
};

export default FullPage;
