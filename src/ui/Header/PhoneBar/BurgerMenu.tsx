import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReportType } from "@/model/reportModel";

const BurgerMenu = ({
  reports,
  isOpen,
}: {
  reports: ReportType[];
  isOpen: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-10 fixed top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden transition-transform duration-300 bg-white font-bold font-helvetica text-md text-center px-4 z-20",
        {
          "-translate-x-full": !isOpen,
        },
      )}
    >
      <Link href="/portfolio/3">PORTFOLIO</Link>
      <div className="flex flex-col w-full justify-center items-center gap-5">
        <p className="text-md font-medium">REPORTAGE</p>
        {(reports || []).map((report, i) => (
          <Link key={`${i}${report.title}`} href={`/portfolio/${report.index}`}>
            {report.title}
          </Link>
        ))}
      </div>
      <Link href="/portfolio/1">PORTRAITS</Link>
      <Link href="/portfolio/2">PUBLICATIONS</Link>
      <Link href="/contact">CONTACT</Link>
      <Link href="/apropos">A PROPOS</Link>
    </div>
  );
};

export default BurgerMenu;
