import { ReportType } from "@/model/report.model";

const ReportOrder = ({ report }: { report: ReportType }) => {
  return (
    <div className="rounded-lg shadow-sm p-6 bg-white cursor-grab">
      <h2 className="text-2xl font-helvetica">{report.title}</h2>
    </div>
  );
};

export default ReportOrder;
