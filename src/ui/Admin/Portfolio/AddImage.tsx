"use client";

import { FormEvent, useRef, useState } from "react";
import { uploadImages } from "@/actions/images";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { compressor } from "@/ui/Admin/Portfolio/compressor";

export default function AddImage({ pageId }: { pageId: string }) {
  const [imagesDownload, setImagesDownLoad] = useState<FileList | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imagesDownload) {
      setIsPending(true);
      const formData = new FormData();
      for (let i = 0; i < imagesDownload.length; i++) {
        const newFile = await compressor({
          file: imagesDownload[i],
          maxSize: 2_000_000,
          quality: 0.95,
        });
        formData.append(`images`, newFile);
      }
      formData.append("hikingId", "1");
      const res = await uploadImages(formData, pageId);
      if (res.success) {
        toast({
          description: "Images ajoutées",
        });
      } else {
        toast({
          description: "Une erreur est survenue lors de l'ajout des images",
          variant: "destructive",
        });
      }

      setImagesDownLoad(null);
      formRef.current?.reset();
      setIsPending(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="grid gap-4 grid-cols-1 md:grid-cols-2 w-fit mx-auto"
    >
      <Input
        type="file"
        name="images"
        onChange={(e) => setImagesDownLoad(e.target.files)}
        className="cursor-pointer"
        multiple
        disabled={isPending}
      />
      <Button
        disabled={!imagesDownload || imagesDownload.length === 0 || isPending}
        type="submit"
      >
        Envoyer
      </Button>
    </form>
  );
}
