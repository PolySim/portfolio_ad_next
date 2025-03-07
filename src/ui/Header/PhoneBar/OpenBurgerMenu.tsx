"use client";

import { cn } from "@/lib/utils";
import { useNavigationStore } from "@/store/navigation.store";

const OpenBurgerMenu = () => {
  const isOpen = useNavigationStore((state) => state.headerIsOpen);

  const toggleOpen = () => {
    const toggleHeader = useNavigationStore.getState().toggleHeader;
    if (isOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    toggleHeader();
  };

  return (
    <button
      onClick={() => toggleOpen()}
      className={cn("flex z-30 md:hidden relative text-black w-[50px] mt-1", {
        "menu-open": isOpen,
        "menu-close": !isOpen,
      })}
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default OpenBurgerMenu;
