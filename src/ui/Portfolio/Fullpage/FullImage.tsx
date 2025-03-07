import Image from "next/image";

import { ImageType } from "@/model/image.model";

const FullImage = async ({ image }: { image: ImageType }) => {
  return (
    <div className="h-screen w-screen snap-center min-w-screen">
      <Image
        className="object-contain h-full w-full"
        src={`${process.env.API_URL}/api/images/${image.id}`}
        alt={`image${image.id}`}
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default FullImage;
