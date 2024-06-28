"use client";

import { ImageType } from "@/app/portfolio/[pageId]/page";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import React, { useEffect } from "react";
import ImageSorted from "@/ui/Admin/Portfolio/Image";
import { debounce } from "next/dist/server/utils";
import { toast } from "@/components/ui/use-toast";
import { reorderImagesAction } from "@/ui/Admin/Portfolio/reorderImagesAction";

const arrayIsEqual = (images1: ImageType[], images2: ImageType[]) => {
  for (let i = 0; i < images1.length; i++) {
    if (images1[i].id !== images2[i].id) return false;
  }
  return true;
};

export default function PortfolioAdminImages({
  images,
  pageId,
}: {
  images: ImageType[];
  pageId: string;
}) {
  const [parent, imagesSorted, setImages] = useDragAndDrop<
    HTMLDivElement,
    ImageType
  >(images, {
    handleEnd: () => {
      onSubmit(imagesSorted);
    },
  });

  useEffect(() => {
    setImages(images);
  }, [images, setImages]);

  const onSubmit = debounce(async (lastImagesSorted: ImageType[]) => {
    if (!arrayIsEqual(lastImagesSorted, imagesSorted)) return;
    await reorderImagesAction(imagesSorted, pageId).then((res) => {
      if (res === 200) {
        toast({
          description: "Sauvegarde réussie",
        });
      } else {
        toast({
          description: "Une erreur est survenue",
          variant: "destructive",
        });
      }
    });
  }, 1000);

  return (
    <div
      className="grid grid-cols-2 gap-4 md:grid-cols-3 justify-center items-stretch w-screen max-w-6xl mx-auto p-4"
      ref={parent}
    >
      {imagesSorted.map((image) => (
        <React.Fragment key={image.id}>
          <ImageSorted image={image} pageId={pageId} />
        </React.Fragment>
      ))}
    </div>
  );
}
