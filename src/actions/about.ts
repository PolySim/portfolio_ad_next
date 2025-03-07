"use server";

import { AboutType } from "@/model/about.model";
import { revalidateTag } from "next/cache";

export const getBiography = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/about`, {
      method: "GET",
      next: { tags: ["about"] },
    });
    if (!res.ok) {
      console.error("Error fetching biography", res.statusText);
      return { fr: "", en: "" };
    }
    return (await res.json()) as AboutType;
  } catch (e) {
    console.error("Error fetching biography", e);
    return { fr: "", en: "" };
  }
};

export const updateBiography = async (about: AboutType) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(about),
    });

    if (!res.ok) {
      console.error("Error updating biography", res.statusText);
      return { success: false };
    }
    revalidateTag("about");
    return { success: true };
  } catch (e) {
    console.error("Error updating biography", e);
    return { success: false };
  }
};
