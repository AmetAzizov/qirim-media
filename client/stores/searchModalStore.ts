'use client';
import { create } from 'zustand';

type SearchModalStore = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

export const useSearchModalStore = create<SearchModalStore>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));
