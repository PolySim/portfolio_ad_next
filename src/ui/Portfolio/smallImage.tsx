import { ImageType } from "@/app/portfolio/[pageId]/page";
import Link from "next/link";
import Image from "next/image";
import probe from "probe-image-size";

const SmallImage = async ({
  image,
  pageId,
  index,
}: {
  image: ImageType;
  pageId: string;
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
    <Link
      href={`/portfolio/${pageId}?open=true&imageClick=${index}`}
      className={`${height > width ? "row-span-2" : "row-span-1"} group hover:scale-95 transition relative w-full`}
    >
      <Image
        src={`${process.env.API_URL}/api/images/${image.id}`}
        alt={`image_${image.id}`}
        width={width}
        height={height > width ? 3 * width : 1.5 * width}
      />
      {image.description && image.description !== "" && (
        <span className="flex justify-center bg-white/50 w-full text-center py-2 opacity-0 group-hover:opacity-100 transition -translate-y-1/2 group-hover:-translate-y-full backdrop-blur-md">
          {image.description}
        </span>
      )}
    </Link>
  );
};

export default SmallImage;
