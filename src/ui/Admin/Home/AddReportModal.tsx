"use client";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createReport } from "@/actions/page";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(3, { message: "Le titre est trop court" }),
  description: z.string().optional(),
});

const AddReportModal = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async () => {
    const values = form.getValues();
    if (!values.title || values.title === "") return;

    const res = await createReport({
      title: values.title,
      article: values.description,
    });

    if (!res.success) {
      toast({
        description: "Une erreur est survenue lors de la création du reportage",
        variant: "destructive",
      });
      return;
    }

    await router.push(`/admin/portfolio/${res.report.id}`);
  };

  const onReset = () => {
    form.reset();
  };

  return (
    <DialogContent className="w-[95vw] max-w-3xl">
      <DialogHeader>
        <DialogTitle>Ajouter un reportage</DialogTitle>
      </DialogHeader>
      <DialogDescription />
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <Label htmlFor="title">Titre</Label>
          <Input
            type="text"
            id="title"
            {...form.register("title", { required: true })}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...form.register("description")} />
        </div>
      </form>
      <DialogFooter>
        <Button
          onClick={onReset}
          type="submit"
          variant="outline"
          className="w-full"
        >
          Reset
        </Button>
        <Button onClick={onSubmit} type="submit" className="w-full">
          Valider
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddReportModal;
