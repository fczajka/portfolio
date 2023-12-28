"use client";

import { useState } from "react";
import Menu from "../UI/Menu";
import Links from "./Links";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [wantsToSee, setWantsToSee] = useState(false);

  const handleMenu = () => {
    setWantsToSee(!wantsToSee);
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(!isOpen);
      }, 700);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <nav className="fixed w-full bottom-0 bg-zinc-50 shadow-custom shadow-zinc-400 h-12 z-30 min-[400px]:h-16 lg:hidden">
        <Links isOpen={isOpen} handleMenu={handleMenu} />
      </nav>
      {isOpen && <Menu wantsToSee={wantsToSee} handleMenu={handleMenu} />}
    </>
  );
}
