"use client";

import { useFullPageStore } from "@/store/FullPageStore";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuitFullPage = () => {
  const setCurrentIndex = useFullPageStore((state) => state.setCurrentIndex);

  return (
    <Button
      variant="ghost"
      className="fixed top-6 right-6 z-50"
      onClick={() => {
        setCurrentIndex(null);
      }}
    >
      <X size={30} className="text-white" />
    </Button>
  );
};

export default QuitFullPage;
