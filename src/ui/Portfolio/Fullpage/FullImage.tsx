import Image from "next/image";
import { ImageType } from "@/app/portfolio/[pageId]/page";
import probe from "probe-image-size";

const FullImage = async ({ image }: { image: ImageType }) => {
  const ImageSrc = await fetch(
    `${process.env.API_URL}/api/images/${image.id}`,
  ).then((res) => res.blob());
  let height = 300;
  let width = 400;
  if (ImageSrc.type.startsWith("image")) {
    const { width: widthResult, height: heightResult } = await probe(
      `${process.env.API_URL}/api/images/${image.id}`,
    );
    height = heightResult;
    width = widthResult;
  }

  return (
    <div className="h-screen w-screen snap-center min-w-screen">
      <Image
        className="object-contain h-full w-full"
        src={`${process.env.API_URL}/api/images/${image.id}`}
        alt={`image${image.id}`}
        width={width}
        height={height}
      />
    </div>
  );
};

export default FullImage;
