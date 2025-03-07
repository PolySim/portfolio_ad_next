"use client";

import { ReportType } from "@/model/report.model";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { debounce } from "next/dist/server/utils";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { updateReportInformation } from "@/actions/page";

export default function FormInformation({
  information,
  pageId,
}: {
  information: ReportType;
  pageId: string;
}) {
  const form = useForm({ defaultValues: information });

  const onSubmit = debounce(async (data: Omit<ReportType, "index">) => {
    const values: ReportType = form.getValues();
    if (
      values.title === data.title &&
      values.article === data.article &&
      (values.title !== information.title ||
        values.article !== information.article)
    ) {
      const res = await updateReportInformation(pageId, data);

      if (res.success) {
        toast({
          description: "Sauvegarde des informations réussie",
        });
      } else {
        toast({
          description:
            "Une erreur est survenue lors de la sauvegarde des informations",
          variant: "destructive",
        });
      }
    }
  }, 1000);

  const infoWatch = form.watch(["title", "article"]);

  useEffect(() => {
    onSubmit({ title: infoWatch[0], article: infoWatch[1] });
  }, [infoWatch, onSubmit]);

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div>
        <Label className="text-xl font-medium pl-2" htmlFor="title">
          Titre*
        </Label>
        <Input {...form.register("title")} placeholder="Titre" required />
      </div>
      <div>
        <Label className="text-xl font-medium pl-2" htmlFor="article">
          Article
        </Label>
        <Textarea {...form.register("article")} placeholder="Article..." />
      </div>
    </form>
  );
}
