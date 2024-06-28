"use client";

import { FormEvent, useState } from "react";
import { uploadImages } from "@/serveurActions/images";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function AddImage({ pageId }: { pageId: string }) {
  const [imagesDownload, setImagesDownLoad] = useState<FileList | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imagesDownload) {
      const formData = new FormData();
      for (let i = 0; i < imagesDownload.length; i++) {
        formData.append(`images`, imagesDownload[i]);
      }
      formData.append("hikingId", "1");
      await uploadImages(formData, pageId).then((res) => {
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
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 grid-cols-1 md:grid-cols-2 w-fit mx-auto"
    >
      <Input
        type="file"
        name="images"
        onChange={(e) => setImagesDownLoad(e.target.files)}
        className="cursor-pointer"
        multiple
      />
      <Button type="submit">Envoyer</Button>
    </form>
  );
}
