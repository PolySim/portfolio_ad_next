import WindowSizeContainer from "@/lib/WindowSizeContainer";
import Images from "@/ui/Portfolio/Images";
import { getPageInformation } from "@/actions/page";
import { getImages } from "@/actions/images";
import { ImageType } from "@/model/image.model";

const ImagesContainer = async ({ pageId }: { pageId: string }) => {
  const MAX_WIDTH = 768;
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
    <>
      <h1 className="sr-only">{information.title}</h1>
      <WindowSizeContainer maxWidth={MAX_WIDTH}>
        <Images images={imagesRefactor} cols={2} />
      </WindowSizeContainer>
      <WindowSizeContainer minWidth={MAX_WIDTH}>
        <Images images={imagesRefactor} cols={3} />
      </WindowSizeContainer>
    </>
  );
};

export default ImagesContainer;
