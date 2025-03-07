"use server";

import { revalidateTag } from "next/cache";
import { ImageType } from "@/model/image.model";

export const reorderImagesAction = async (
  images: ImageType[],
  pageId: string,
) => {
  return await fetch(`${process.env.API_URL}/api/images/reorder`, {
    method: "PUT",
    body: JSON.stringify({ images }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then(() => revalidateTag(`images_${pageId}`))
    .then(() => 200)
    .catch((e) => "error");
};
