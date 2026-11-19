"use client";

import { useEffect } from "react";
import useAnimatedToggle from "@/hooks/useAnimatedToggle";
import Menu from "../UI/Menu";
import Links from "./Links";

export default function MobileNavbar() {
  const {
    isOpen,
    wantsToSee,
    toggle: handleMenu,
    close,
  } = useAnimatedToggle(700);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        close();
      }
    };
    mediaQuery.addEventListener("change", handleViewportChange);
    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, [isOpen, close]);

  return (
    <>
      <nav className="fixed w-full bottom-0 bg-zinc-50 shadow-custom shadow-zinc-400 h-12 z-30 dark:bg-dark-secondary-bg dark:shadow-none dark:text-zinc-200 min-[400px]:h-16 lg:hidden">
        <Links isOpen={isOpen} handleMenu={handleMenu} />
      </nav>
      {isOpen && <Menu wantsToSee={wantsToSee} handleMenu={handleMenu} />}
    </>
  );
}
