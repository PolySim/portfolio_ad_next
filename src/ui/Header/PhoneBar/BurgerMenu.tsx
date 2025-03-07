"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReportType } from "@/model/report.model";
import { useNavigationStore } from "@/store/navigation.store";

const BurgerMenu = ({ reports }: { reports: ReportType[] }) => {
  const isOpen = useNavigationStore((state) => state.headerIsOpen);
  const setIsOpen = useNavigationStore((state) => state.toggleHeader);

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-10 fixed top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden transition-transform duration-300 bg-white font-bold font-helvetica text-md text-center px-4 z-20",
        {
          "-translate-x-full": !isOpen,
        },
      )}
    >
      <Link onClick={() => setIsOpen(false)} href="/portfolio/3">
        PORTFOLIO
      </Link>
      <div className="flex flex-col w-full justify-center items-center gap-5">
        <p className="text-md font-medium">REPORTAGE</p>
        {(reports || []).map((report, i) => (
          <Link
            onClick={() => setIsOpen(false)}
            key={`${i}${report.title}`}
            href={`/portfolio/${report.index}`}
          >
            {report.title}
          </Link>
        ))}
      </div>
      <Link onClick={() => setIsOpen(false)} href="/portfolio/1">
        PORTRAITS
      </Link>
      <Link onClick={() => setIsOpen(false)} href="/portfolio/2">
        PUBLICATIONS
      </Link>
      <Link onClick={() => setIsOpen(false)} href="/contact">
        CONTACT
      </Link>
      <Link onClick={() => setIsOpen(false)} href="/apropos">
        A PROPOS
      </Link>
    </div>
  );
};

export default BurgerMenu;
