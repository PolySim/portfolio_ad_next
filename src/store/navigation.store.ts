import { create } from "zustand";

type UseNavigationStore = {
  headerIsOpen: boolean;
  toggleHeader: (open?: boolean) => void;
};

export const useNavigationStore = create<UseNavigationStore>()((set) => ({
  headerIsOpen: false,
  toggleHeader: (open) =>
    set((state) => ({
      headerIsOpen: open === undefined ? !state.headerIsOpen : open,
    })),
}));
