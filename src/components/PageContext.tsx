"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

export type PageId = "home" | "vision" | "about" | "journey" | "forcedConnection" | "companion" | "personal";

export const PAGE_ORDER: PageId[] = ["home", "vision", "about", "journey", "forcedConnection", "companion", "personal"];

interface PageContextValue {
  currentPage: PageId;
  navigateTo: (page: PageId) => void;
  isTransitioning: boolean;
  showLeafStorm: boolean;
  windDirection: 1 | -1;
}

const PageContext = createContext<PageContextValue>({
  currentPage: "home",
  navigateTo: () => {},
  isTransitioning: false,
  showLeafStorm: false,
  windDirection: 1,
});

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLeafStorm, setShowLeafStorm] = useState(false);
  const [windDirection, setWindDirection] = useState<1 | -1>(1);
  const pendingPage = useRef<PageId | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const navigateTo = useCallback((page: PageId) => {
    if (page === currentPage || isTransitioning) return;

    clearTimers();

    const currIdx = PAGE_ORDER.indexOf(currentPage);
    const nextIdx = PAGE_ORDER.indexOf(page);
    const dir: 1 | -1 = nextIdx > currIdx ? 1 : -1;

    setWindDirection(dir);
    setIsTransitioning(true);
    setShowLeafStorm(true);
    pendingPage.current = page;

    // Leaves arrive first (push illusion), content swaps at peak density
    timers.current.push(
      setTimeout(() => {
        setCurrentPage(page);
        pendingPage.current = null;
      }, 400)
    );

    // Storm disperses
    timers.current.push(
      setTimeout(() => {
        setShowLeafStorm(false);
        setIsTransitioning(false);
      }, 900)
    );
  }, [currentPage, isTransitioning, clearTimers]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return (
    <PageContext.Provider value={{ currentPage, navigateTo, isTransitioning, showLeafStorm, windDirection }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
