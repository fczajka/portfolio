"use client";

import { useState } from "react";
import Menu from "../UI/Menu";
import Links from "./Links";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full bottom-0 bg-zinc-50 shadow-custom shadow-zinc-400 h-12 z-30 min-[400px]:h-16 lg:hidden">
        <Links isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
      {isOpen && <Menu isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}
