import { create } from "zustand";
import { RefObject } from "react";

type UseFullPageStore = {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  containerRef: RefObject<HTMLDivElement> | null;
  setContainerRef: (ref: RefObject<HTMLDivElement>) => void;
  handleScroll: (
    element: RefObject<HTMLDivElement> | null,
    add: boolean,
    step: number,
  ) => void;
};

export const useFullPageStore = create<UseFullPageStore>()((set) => ({
  currentIndex: 0,
  setCurrentIndex: (index: number) => set({ currentIndex: index }),
  containerRef: null,
  setContainerRef: (ref) => set({ containerRef: ref }),
  handleScroll: (element, add, step) => {
    if (element?.current) {
      add
        ? (element.current.scrollLeft += step * window.innerWidth)
        : (element.current.scrollLeft -= step * window.innerWidth);
    }
  },
}));
