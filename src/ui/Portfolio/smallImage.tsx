"use client";

import { ImageType } from "@/app/portfolio/[pageId]/page";
import Image from "next/image";
import ImageContainer from "@/ui/Portfolio/ImageContainer";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SmallImage = ({ image, index }: { image: ImageType; index: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImageContainer index={index}>
      {!isLoaded && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${image.id}/blur-sm`}
          alt={`image_${image.id}`}
          width={500}
          height={325}
          unoptimized
          priority
          className="w-full"
        />
      )}
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${image.id}`}
        alt={`image_${image.id}`}
        width={500}
        height={325}
        onLoadingComplete={() => setIsLoaded(true)}
        loading="lazy"
        className={cn("w-full h-auto", {
          "absolute top-0 left-0 -z-10": !isLoaded,
        })}
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
