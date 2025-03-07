import OpenBurgerMenu from "@/ui/Header/PhoneBar/OpenBurgerMenu";
import BurgerMenu from "@/ui/Header/PhoneBar/BurgerMenu";
import { ReportType } from "@/model/report.model";

const PhoneBar = ({ reports }: { reports: ReportType[] }) => {
  return (
    <>
      <OpenBurgerMenu />
      <BurgerMenu reports={reports} />
    </>
  );
};

export default PhoneBar;
