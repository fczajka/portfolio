"use client";

import useAnimatedToggle from "@/hooks/useAnimatedToggle";
import Menu from "../UI/Menu";
import Links from "./Links";

export default function MobileNavbar() {
  const { isOpen, wantsToSee, toggle: handleMenu } = useAnimatedToggle(700);

  return (
    <>
      <nav className="fixed w-full bottom-0 bg-zinc-50 shadow-custom shadow-zinc-400 h-12 z-30 dark:bg-dark-secondary-bg dark:shadow-none dark:text-zinc-200 min-[400px]:h-16 lg:hidden">
        <Links isOpen={isOpen} handleMenu={handleMenu} />
      </nav>
      {isOpen && <Menu wantsToSee={wantsToSee} handleMenu={handleMenu} />}
    </>
  );
}
