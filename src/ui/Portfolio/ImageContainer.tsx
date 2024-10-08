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
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      className="group relative w-full aspect-video cursor-pointer hover:scale-[0.98] transition duration-150"
    >
      {children}
    </div>
  );
};

export default ImageContainer;
