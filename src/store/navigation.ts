import { create } from "zustand";
import type { SectionId } from "@/types";

interface NavigationState {
  activeSection: SectionId;       // Which section user is reading (mid-viewport) — drives nav underline
  navbarSection: SectionId;       // Which section is behind the navbar (top of viewport) — drives navbar color
  setActiveSection: (section: SectionId) => void;
  setNavbarSection: (section: SectionId) => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeSection: "hero",
  navbarSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
  setNavbarSection: (section) => set({ navbarSection: section }),
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
}));
