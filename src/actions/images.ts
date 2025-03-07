"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ImageType } from "@/model/image.model";

export const getImages = async (pageId: string) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/images/all/${pageId}`, {
      method: "GET",
      next: { tags: [`images_${pageId}`] },
    });
    if (!res.ok) {
      console.error("Error fetching images", res.statusText);
      return [];
    }
    return (await res.json()) as ImageType[];
  } catch (e) {
    console.error("Error fetching images", e);
    return [];
  }
};

export const uploadImages = async (formData: FormData, pageId: string) => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/images/upload_image/${pageId}`,
      {
        method: "POST",
        body: formData,
      },
    );
    if (res.ok) {
      revalidateTag(`images_${pageId}`);
      revalidatePath(`/admin/portfolio/${pageId}`, "page");
      return { success: true };
    }
    console.log("Error in upload images", res.statusText);
    return { success: false };
  } catch (e) {
    console.log("Error in upload images", e);
    return { success: false };
  }
};

export const deleteImage = async (imageId: number, pageId: string) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/images/delete_image`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ image_id: imageId, report_id: pageId }),
    });

    if (!res.ok) {
      console.error(`Error deleting image-${imageId}`, res.statusText);
      return { success: false };
    }

    revalidateTag(`images_${pageId}`);
    return { success: true };
  } catch (e) {
    console.log(`Error deleting image-${imageId}`, e);
    return { success: false };
  }
};

export const updateImagesOrder = async (
  images: ImageType[],
  pageId: string,
) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/images/reorder`, {
      method: "PUT",
      body: JSON.stringify({ images }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!res.ok) {
      console.error("Error in reorder images", res.statusText);
      return { success: false };
    }

    revalidateTag(`images_${pageId}`);
    return { success: true };
  } catch (e) {
    console.error("Error in reorder images", e);
    return { success: false };
  }
};

export const updateImageDescription = async (
  imageId: number,
  description: string,
  pageId: string,
) => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/images/update_description`,
      {
        method: "PUT",
        body: JSON.stringify({ description, imageId }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );

    if (!res.ok) {
      console.error(
        `Error in updating image-${imageId} description`,
        res.statusText,
      );
      return { success: false };
    }

    revalidateTag(`images_${pageId}`);
    return { success: true };
  } catch (e) {
    console.error(`Error in updating image-${imageId} description`, e);
    return { success: false };
  }
};
