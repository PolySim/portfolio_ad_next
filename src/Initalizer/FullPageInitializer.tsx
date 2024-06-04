"use client";

import { useFullPageStore } from "@/store/FullPageStore";
import { PropsWithChildren, RefObject } from "react";

const FullPageInitializer = ({
  currentIndex,
  containerRef,
  children,
}: PropsWithChildren<{
  currentIndex: string;
  containerRef: RefObject<HTMLDivElement>;
}>) => {
  const setCurrentIndex = useFullPageStore((state) => state.setCurrentIndex);
  const setContainerRef = useFullPageStore((state) => state.setContainerRef);
  setCurrentIndex(parseInt(currentIndex));
  setContainerRef(containerRef);

  return <>{children}</>;
};

export default FullPageInitializer;
