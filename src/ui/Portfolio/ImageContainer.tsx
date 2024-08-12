"use client";

import { PropsWithChildren } from "react";
import { useFullPageStore } from "@/store/FullPageStore";

const ImageContainer = ({
  children,
  index,
}: PropsWithChildren<{ index: number }>) => {
  const setImageIndexOpen = useFullPageStore((state) => state.setCurrentIndex);

  return (
    <div
      onClick={() => setImageIndexOpen(index)}
      className="group hover:scale-95 transition relative w-full cursor-pointer"
    >
      {children}
    </div>
  );
};

export default ImageContainer;
