import { ReportType } from "@/model/reportModel";
import Link from "next/link";

const NavBar = ({ reports }: { reports: ReportType[] }) => {
  return (
    <div className="hidden md:flex flex-wrap gap-y-6 justify-center items-center w-9/12 mt-8 mx-auto font-bold font-helvetica text-md text-center">
      <Link
        href="/portfolio/3"
        className="hover:text-customblue-300 transition"
      >
        PORTFOLIO
      </Link>
      <span className="opacity-15 text-40 mx-6 ">⚫</span>
      <div className="flex flex-col relative group z-20">
        <p className="group-hover:text-customblue-300 transition">REPORTAGE</p>
        <div className="hidden absolute w-max rounded-b-lg top-0 mt-5 pt-3 -left-3 text-left group-hover:flex flex-col gap-1 bg-white">
          {(reports || []).map((report, i) => (
            <Link
              key={`${i}${report.title}`}
              href={`/portfolio/${report.index}`}
              className="hover:bg-gray-100 transition px-3 py-0.5 rounded-lg"
            >
              {report.title}
            </Link>
          ))}
        </div>
      </div>
      <span className="opacity-15 text-40 mx-6 ">⚫</span>
      <Link
        href="/portfolio/1"
        className="hover:text-customblue-300 transition"
      >
        PORTRAITS
      </Link>
      <span className="opacity-15 text-40 mx-6 ">⚫</span>
      <Link
        href="/portfolio/2"
        className="hover:text-customblue-300 transition"
      >
        PUBLICATIONS
      </Link>
      <span className="opacity-15 text-40 mx-6 ">⚫</span>
      <Link href="/contact" className="hover:text-customblue-300 transition">
        CONTACT
      </Link>
      <span className="opacity-15 text-40 mx-6 ">⚫</span>
      <Link href="/apropos" className="hover:text-customblue-300 transition">
        A PROPOS
      </Link>
    </div>
  );
};

export default NavBar;
