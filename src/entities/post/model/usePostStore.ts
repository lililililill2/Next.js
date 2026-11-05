"use client";

import { create } from "zustand";

type PostStore = {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
};

export const usePostStore = create<PostStore>()((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}));
