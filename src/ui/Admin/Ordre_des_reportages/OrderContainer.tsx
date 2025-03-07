"use client";

import { ReportType } from "@/model/report.model";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import React from "react";
import ReportOrder from "@/ui/Admin/Ordre_des_reportages/Report";
import { debounce } from "next/dist/server/utils";
import { toast } from "@/components/ui/use-toast";
import { updatePageOrder } from "@/actions/page";

const OrderContainer = ({ reports }: { reports: ReportType[] }) => {
  const [parent, tapes, setValue] = useDragAndDrop<HTMLDivElement, ReportType>(
    reports,
    {
      handleEnd: () => {
        void onSubmit(tapes);
      },
    },
  );

  const onSubmit = debounce(async (lastTapes: ReportType[]) => {
    if (lastTapes !== tapes) return;
    const res = await updatePageOrder(tapes.map((tape) => tape.index));
    if (res.success) {
      toast({
        description: "Sauvegarde réussie",
      });
    } else {
      toast({
        description: "Une erreur est survenue",
        variant: "destructive",
      });
      setValue(reports);
    }
  }, 1000);

  return (
    <div
      ref={parent}
      className="flex flex-col gap-6 w-10/12 max-w-lg mx-auto mt-12"
    >
      {tapes.map((report) => (
        <React.Fragment key={report.index}>
          <ReportOrder report={report} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderContainer;
