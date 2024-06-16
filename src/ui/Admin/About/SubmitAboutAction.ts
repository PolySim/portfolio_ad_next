"use server";

import { AboutType } from "@/model/aboutModel";
import { revalidateTag } from "next/cache";

export const submitAboutAction = async (about: AboutType) => {
  return await fetch(`${process.env.API_URL}/api/about`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(about),
  })
    .then((res) => res.json() as Promise<AboutType>)
    .then(() => revalidateTag("about"))
    .then(() => 200)
    .catch((e) => console.log(e));
};
