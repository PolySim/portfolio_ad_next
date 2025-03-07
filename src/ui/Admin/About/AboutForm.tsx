"use client";

import { FieldValue, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AboutType } from "@/model/about.model";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateBiography } from "@/actions/about";

const formSchema = z.object({
  fr: z.string(),
  en: z.string(),
});

export default function AdminAboutForm({
  biography,
}: {
  biography: AboutType;
}) {
  const form = useForm({
    defaultValues: biography,
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (data: FieldValue<AboutType>) => {
    const res = await updateBiography(data as AboutType);
    if (res.success) {
      toast({
        description: "Sauvegarde des biographies réussie",
      });
    } else {
      toast({
        description:
          "Une erreur est survenue lors de la sauvegarde des biographies",
        variant: "destructive",
      });
    }
  };

  const onReset = () => {
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6 p-6 max-w-4xl mx-auto"
    >
      <p>Biographie Fr</p>
      <Textarea
        placeholder="Il n'est pas autorisé de laisser libre"
        {...form.register("fr")}
        required
        className="min-h-48"
      />
      <p>Biography Us</p>
      <Textarea
        placeholder="Il n'est pas autorisé de laisser libre"
        {...form.register("en")}
        required
        className="min-h-48"
      />
      <div className="flex gap-3">
        <Input
          onClick={onReset}
          type="button"
          value="Annuler"
          className="cursor-pointer"
        />
        <Button asChild>
          <Input
            type="submit"
            value="Valider"
            className="hover:bg-customblue-300 hover:text-white transition cursor-pointer"
          />
        </Button>
      </div>
    </form>
  );
}
