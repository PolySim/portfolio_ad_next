"use client";

import FullPageInitializer from "@/Initalizer/FullPageInitializer";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useFullPageStore } from "@/store/FullPageStore";
import { useRouter } from "next/navigation";
import QuitFullPage from "@/ui/Portfolio/Fullpage/QuitFullPage";

const FullPageContainer = ({
  searchParams,
  children,
}: PropsWithChildren<{
  searchParams: { open: string; imageClick: string };
}>) => {
  const handleScroll = useFullPageStore((state) => state.handleScroll);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    handleScroll(containerRef, true, parseInt(searchParams.imageClick));
  });

  useEffect(() => {
    document.body.style.overflow =
      searchParams.open === "true" ? "hidden" : "auto";
  }, [searchParams.open]);

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          router.back();
          break;
        case "ArrowLeft":
          handleScroll(containerRef, false, 1);
          break;
        case "ArrowRight":
          handleScroll(containerRef, true, 1);
          break;
      }
    };

    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  }, []);

  return (
    <FullPageInitializer
      currentIndex={searchParams.imageClick}
      containerRef={containerRef}
    >
      {searchParams.open === "true" && (
        <>
          <QuitFullPage />
          <div
            className="flex scroll-smooth snap-mandatory snap-x fixed top-0 left-0 h-screen w-screen overflow-x-scroll bg-white z-40 disable_scrollbar"
            ref={containerRef}
          >
            {children}
          </div>
        </>
      )}
    </FullPageInitializer>
  );
};

export default FullPageContainer;
