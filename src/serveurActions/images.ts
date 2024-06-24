"use server";

import { ImageType } from "@/app/portfolio/[pageId]/page";
import { revalidatePath, revalidateTag } from "next/cache";

export const getImages = async (pageId: string) => {
  try {
    return await fetch(`${process.env.API_URL}/api/images?num=${pageId}`, {
      method: "GET",
      next: { tags: [`images_${pageId}`] },
    }).then((res) => res.json() as Promise<ImageType[]>);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const uploadImages = async (formData: FormData, pageId: string) => {
  try {
    return await fetch(
      `${process.env.API_URL}/api/images/upload_image/${pageId}`,
      {
        method: "POST",
        body: formData,
      },
    )
      .then((res) => res.json())
      .then(() => revalidateTag(`images_${pageId}`))
      .then(() => revalidatePath(`/admin/portfolio/${pageId}`, "page"))
      .then(() => 200);
  } catch (e) {
    console.log(e);
  }
};

export const deleteImage = async (imageId: number, pageId: string) => {
  try {
    return await fetch(`${process.env.API_URL}/api/images/delete_image`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ image_id: imageId, report_id: pageId }),
    })
      .then((res) => res.json())
      .then(() => revalidateTag(`images_${pageId}`))
      .then(() => revalidatePath(`/admin/portfolio/${pageId}`, "page"))
      .then(() => 200);
  } catch (e) {
    console.log(e);
  }
};
