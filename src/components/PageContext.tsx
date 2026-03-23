"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type PageId = "home" | "vision" | "personality" | "journey" | "companion" | "personal";

interface PageContextValue {
  currentPage: PageId;
  navigateTo: (page: PageId) => void;
}

const PageContext = createContext<PageContextValue>({
  currentPage: "home",
  navigateTo: () => {},
});

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>("home");

  const navigateTo = useCallback((page: PageId) => {
    setCurrentPage(page);
  }, []);

  return (
    <PageContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
