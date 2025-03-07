import { create } from "zustand";
import { RefObject } from "react";

type UseFullPageStore = {
  currentIndex: number | null;
  setCurrentIndex: (index: number | null) => void;
  containerRef: RefObject<HTMLDivElement> | null;
  setContainerRef: (ref: RefObject<HTMLDivElement>) => void;
  handleScroll: (
    element: RefObject<HTMLDivElement> | null,
    add: boolean,
    step: number,
  ) => void;
};

export const useFullPageStore = create<UseFullPageStore>()((set) => ({
  currentIndex: null,
  setCurrentIndex: (index) => set({ currentIndex: index }),
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
