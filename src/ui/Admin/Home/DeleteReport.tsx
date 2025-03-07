"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteReport } from "@/actions/page";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const DeleteReport = ({ id }: { id: number }) => {
  const onDelete = async () => {
    const res = await deleteReport(id);
    if (res.success) {
      toast({
        description: "Suppression réussie",
      });
    } else {
      toast({
        description: "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Supprimer le reportage</DialogHeader>
        <DialogDescription>
          <p>Êtes-vous sûr de vouloir supprimer ce reportage ?</p>
          <p>La suppression est définitive</p>
        </DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button>Annuler</Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={onDelete} variant="destructive">
              Supprimer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReport;
