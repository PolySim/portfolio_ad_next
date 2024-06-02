"use client";

const OpenBurgerMenu = ({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  return (
    <div
      onClick={() => toggleOpen()}
      className={`flex z-10 md:hidden relative text-black w-[50px] mt-1 ${isOpen ? "menu-open" : "menu-close"}`}
    >
      <span />
      <span />
      <span />
    </div>
  );
};

export default OpenBurgerMenu;
