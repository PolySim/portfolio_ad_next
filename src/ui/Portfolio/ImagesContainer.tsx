import { ImageType } from "@/app/portfolio/[pageId]/page";
import WindowSizeContainer from "@/lib/WindowSizeContainer";
import Images from "@/ui/Portfolio/Images";

const ImagesContainer = ({ images }: { images: ImageType[] }) => {
  const MAX_WIDTH = 768;

  return (
    <>
      <WindowSizeContainer maxWidth={MAX_WIDTH}>
        <Images images={images} cols={2} />
      </WindowSizeContainer>
      <WindowSizeContainer minWidth={MAX_WIDTH}>
        <Images images={images} cols={3} />
      </WindowSizeContainer>
    </>
  );
};

export default ImagesContainer;
