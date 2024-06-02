"use client";

import { useEffect, useState } from "react";
import OpenBurgerMenu from "@/ui/Header/PhoneBar/OpenBurgerMenu";
import BurgerMenu from "@/ui/Header/PhoneBar/BurgerMenu";
import { usePathname } from "next/navigation";
import { ReportType } from "@/model/reportModel";

const PhoneBar = ({ reports }: { reports: ReportType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleOpen = () => {
    setIsOpen((curr) => !curr);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <OpenBurgerMenu isOpen={isOpen} toggleOpen={toggleOpen} />
      <BurgerMenu reports={reports} isOpen={isOpen} />
    </>
  );
};

export default PhoneBar;
