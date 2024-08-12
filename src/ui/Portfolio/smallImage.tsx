import { ImageType } from "@/app/portfolio/[pageId]/page";
import Image from "next/image";
import ImageContainer from "@/ui/Portfolio/ImageContainer";
import probe from "probe-image-size";

const SmallImage = async ({
  image,
  index,
}: {
  image: ImageType;
  index: number;
}) => {
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
    <ImageContainer index={index}>
      <div className="w-full" style={{ aspectRatio: `${width}/${height}` }} />
      <Image
        src={`${process.env.API_URL}/api/images/${image.id}/blur`}
        alt={`image_${image.id}`}
        width={width}
        height={height}
        className="absolute top-0 left-0 w-full"
        style={{ aspectRatio: `${width}/${height}` }}
      />
      <Image
        src={`${process.env.API_URL}/api/images/${image.id}`}
        alt={`image_${image.id}`}
        width={500}
        height={325}
        className="absolute top-0 left-0 w-full h-auto"
      />
      {image.description && image.description !== "" && (
        <span className="flex justify-center bg-white/50 w-full text-center py-2 opacity-0 group-hover:opacity-100 transition -translate-y-1/2 group-hover:-translate-y-full backdrop-blur-md">
          {image.description}
        </span>
      )}
    </ImageContainer>
  );
};

export default SmallImage;
