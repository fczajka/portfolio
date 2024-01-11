"use client";

import { useState } from "react";
import Menu from "../UI/Menu";
import Links from "./Links";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [wantsToSee, setWantsToSee] = useState(false);

  const handleMenu = () => {
    setWantsToSee(!wantsToSee);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    console.log(prefersReducedMotion);
    if (prefersReducedMotion) {
      setIsOpen(!isOpen);
      return;
    }
  };

  return (
    <>
      <nav className="fixed w-full bottom-0 bg-zinc-50 shadow-custom shadow-zinc-400 h-12 z-30 dark:bg-dark-secondary-bg dark:shadow-none dark:text-zinc-200 min-[400px]:h-16 lg:hidden">
        <Links isOpen={isOpen} handleMenu={handleMenu} />
      </nav>
      {isOpen && <Menu wantsToSee={wantsToSee} handleMenu={handleMenu} />}
    </>
  );
}
