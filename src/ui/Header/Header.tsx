import Link from "next/link";
import PhoneBar from "@/ui/Header/PhoneBar/PhoneBar";
import { ReportType } from "@/model/reportModel";
import NavBar from "@/ui/Header/NavBar";
import SocialNetwork from "@/ui/SocialNetwork/SocialNetwork";

async function getReports() {
  "use server";
  return await fetch(`${process.env.API_URL}/api/pages`, {
    method: "GET",
  }).then((res) => res.json() as Promise<ReportType[]>);
}

const Header = async () => {
  const reports = await getReports();
  return (
    <>
      <div className="flex justify-between md:justify-center p-6">
        <Link href="/">
          <h1 className="w-fit font-helvetica no-underline font-bold text-2xl md:text-4xl mt-0 md:mt-8 text-black hover:text-customblue-300 transition cursor-pointer">
            Angeline Desdevises
          </h1>
        </Link>
        <PhoneBar reports={reports} />
      </div>
      <NavBar reports={reports} />
      <SocialNetwork isHeader />
    </>
  );
};

export default Header;
