"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

export type PageId = "home" | "vision" | "personality" | "journey" | "companion" | "personal";

interface PageContextValue {
  currentPage: PageId;
  navigateTo: (page: PageId) => void;
  isTransitioning: boolean;
}

const PageContext = createContext<PageContextValue>({
  currentPage: "home",
  navigateTo: () => {},
  isTransitioning: false,
});

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const postSwitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateTo = useCallback((page: PageId) => {
    // Clear any pending timers from a previous rapid navigation
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    if (postSwitchTimerRef.current) clearTimeout(postSwitchTimerRef.current);

    setIsTransitioning(true);

    // Delay actual page switch to ~400ms (peak leaf density)
    transitionTimerRef.current = setTimeout(() => {
      setCurrentPage(page);
    }, 400);

    // Reset isTransitioning after 900ms total (storm disperses)
    postSwitchTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      if (postSwitchTimerRef.current) clearTimeout(postSwitchTimerRef.current);
    };
  }, []);

  return (
    <PageContext.Provider value={{ currentPage, navigateTo, isTransitioning }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
