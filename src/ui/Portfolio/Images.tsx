import { ImageType } from "@/app/portfolio/[pageId]/page";
import React, { Suspense } from "react";
import SmallText from "@/ui/Portfolio/smallText";
import SmallImage from "@/ui/Portfolio/smallImage";
import { Skeleton } from "@/components/ui/skeleton";

const Images = ({ images, cols }: { images: ImageType[]; cols: number }) => {
  const imagesArray: ImageType[][] = images.reduce(
    (acc, curr, currentIndex) => {
      const index = currentIndex % cols;
      if (acc.length < index + 1) {
        return [...acc, [curr]];
      }
      return acc.map((row, rowIndex) =>
        rowIndex === index ? [...row, curr] : row,
      );
    },
    [] as ImageType[][],
  );

  const getIndex = (id: number) => {
    return images.findIndex((image) => image.id === id);
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 justify-center items-stretch w-screen max-w-6xl mx-auto p-4">
      {imagesArray.map((col, colIndex) => (
        <div className="flex flex-col gap-4 w-full" key={colIndex}>
          {col.map((image, index) => (
            <React.Fragment key={index}>
              {image.id === -1 ? (
                <SmallText
                  text={image.description || ""}
                  index={getIndex(image.id)}
                />
              ) : (
                <Suspense
                  key={image.id}
                  fallback={
                    <Skeleton className="w-full min-w-4 min-h-4 aspect-video" />
                  }
                >
                  <SmallImage image={image} index={getIndex(image.id)} />
                </Suspense>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Images;
