"use server";

import { revalidateTag } from "next/cache";

export const updateImageDescriptionAction = async (
  imageId: number,
  description: string,
  pageId: string,
) => {
  return await fetch(`${process.env.API_URL}/api/images/update_description`, {
    method: "PUT",
    body: JSON.stringify({ description, imageId }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then(() => revalidateTag(`images_${pageId}`))
    .then(() => 200)
    .catch((e) => "error");
};
