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
import { createReport } from "@/serveurActions/page";
import { toast } from "@/components/ui/use-toast";

const AddReportModal = () => {
  const form = useForm();

  const onSubmit = async () => {
    const values = form.getValues();
    if (!values.title || values.title === "") return;

    await createReport({
      title: values.title,
      article: values.description,
    }).catch(() =>
      toast({
        description: "Une erreur est survenue",
        variant: "destructive",
      }),
    );
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
