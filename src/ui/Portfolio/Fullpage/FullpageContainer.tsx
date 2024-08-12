"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useFullPageStore } from "@/store/FullPageStore";
import QuitFullPage from "@/ui/Portfolio/Fullpage/QuitFullPage";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FullPageContainer = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentIndex = useFullPageStore((state) => state.currentIndex);
  const setCurrentIndex = useFullPageStore((state) => state.setCurrentIndex);
  const handleScroll = useFullPageStore((state) => state.handleScroll);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex === null) {
      setIsOpen(false);
    } else if (!isOpen) {
      setTimeout(() => {
        setIsOpen(true);
      }, 100);
    }
    const element = containerRef.current;
    if (element) {
      element.scrollLeft = (currentIndex || 0) * window.innerWidth;
    }
  }, [currentIndex, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          setCurrentIndex(null);
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
  });

  return (
    currentIndex !== null && (
      <>
        <QuitFullPage />
        <div
          className={cn(
            "flex fixed top-0 left-0 bg-black/70 w-screen h-screen overflow-x-auto snap-x snap-mandatory disable_scrollbar z-40",
            {
              "scroll-smooth": isOpen,
            },
          )}
          onContextMenu={(e) => e.preventDefault()}
          ref={containerRef}
        >
          <Button
            variant="ghost"
            onClick={() => handleScroll(containerRef, false, 1)}
            className="fixed top-1/2 left-4 -translate-y-1/2 z-20"
          >
            <ChevronLeft className="text-white" size={32} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleScroll(containerRef, true, 1)}
            className="fixed top-1/2 right-4 -translate-y-1/2 z-20"
          >
            <ChevronRight className="text-white" size={32} />
          </Button>
          {children}
        </div>
      </>
    )
  );
};

export default FullPageContainer;
