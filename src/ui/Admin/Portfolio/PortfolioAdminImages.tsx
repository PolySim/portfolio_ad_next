"use client";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import React, { useEffect } from "react";
import ImageSorted from "@/ui/Admin/Portfolio/Image";
import { debounce } from "next/dist/server/utils";
import { toast } from "@/components/ui/use-toast";
import { ImageType } from "@/model/image.model";
import { updateImagesOrder } from "@/actions/images";

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
    const res = await updateImagesOrder(imagesSorted, pageId);
    if (res.success) {
      toast({
        description: "Trie des images réussie",
      });
    } else {
      toast({
        description: "Une erreur est survenue lors du tri des images",
        variant: "destructive",
      });
      setImages(images);
    }
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
