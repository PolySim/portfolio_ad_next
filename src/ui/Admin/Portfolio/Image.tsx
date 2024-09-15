"use client";

import { ImageType } from "@/app/portfolio/[pageId]/page";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { updateImageDescriptionAction } from "@/ui/Admin/Portfolio/updateImageDescriptionAction";
import { deleteImage } from "@/serveurActions/images";
import Image from "next/image";

export default function ImageSorted({
  image,
  pageId,
}: {
  image: ImageType;
  pageId: string;
}) {
  const [ratio, setRatio] = useState<number>(1);
  const [description, setDescription] = useState<string>(
    image.description || "",
  );
  const imageRef = useRef<HTMLImageElement | null>(null);
  const calculRatio = () => {
    if (
      imageRef.current?.height &&
      imageRef.current?.width &&
      imageRef.current.height > imageRef.current.width
    ) {
      setRatio(2);
    } else {
      setRatio(1);
    }
  };
  useEffect(() => {
    calculRatio();
  }, [imageRef]);

  const onSubmit = async () => {
    await updateImageDescriptionAction(image.id, description, pageId).then(
      (res) => {
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
      },
    );
  };

  const onDelete = async () => {
    await deleteImage(image.id, pageId).then((res) => {
      if (res === 200) {
        toast({
          description: "Suppression réussie",
        });
      } else {
        toast({
          description: "Une erreur est survenue",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div
      className={cn("relative", {
        "row-span-2": ratio === 2,
      })}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${image.id}`}
        alt={`image_${image.id}`}
        unoptimized
        width={500}
        height={325}
        ref={imageRef}
        className="w-full h-auto cursor-grab"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 opacity-0 hover:opacity-100 bg-black/40 flex justify-center items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit image</Button>
          </DialogTrigger>
          <DialogContent className="z-[100000]">
            <DialogHeader>
              <DialogTitle>Edit description</DialogTitle>
            </DialogHeader>
            <DialogDescription />
            <div className="w-full px-4">
              <Input
                id="name"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={description}
              />
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={onDelete}>
                Supprimer l&apos;image
              </Button>
              <DialogClose>
                <Button type="submit" onClick={onSubmit}>
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
