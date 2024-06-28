import { ReportType } from "@/model/reportModel";

const ReportOrder = ({ report }: { report: ReportType }) => {
  return (
    <div className="rounded-lg shadow p-6 bg-white cursor-grab">
      <h2 className="text-2xl font-helvetica">{report.title}</h2>
    </div>
  );
};

export default ReportOrder;
