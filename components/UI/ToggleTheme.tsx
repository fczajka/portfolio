"use client";

import { useTheme } from "next-themes";

export default function ToggleTheme(props: { style?: string }) {
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    const checkbox = document.getElementById("toggle") as HTMLInputElement;
    setTheme(checkbox.checked ? "light" : "dark");
    localStorage.theme = checkbox.checked ? "light" : "dark";
  };

  return (
    <div
      className={`block switch relative overflow-hidden w-switch h-switch mx-auto my-0 ${props.style}`}
    >
      <label htmlFor="toggle" className="cursor-pointer">
        <input
          id="toggle"
          checked={theme === "light" ? true : false}
          onChange={handleTheme}
          className="toggle-switch absolute top-0 left-0 w-0 h-0 opacity-0 z-20"
          type="checkbox"
        />
        <div className="sun-moon absolute left-0 inline-block w-6 h-6 m-1 bg-zinc-300 rounded-full transtion-all duration-500 border-[0.125rem] bordre-[#dee2c6] z-20">
          <div className="dots absolute top-[1px] left-3 w-0.5 h-0.5 bg-[#efeedb] border-[0.125rem] border-[#dee2c6] rounded-full transition-all duration-500 before:absolute before:top-[9px] before:-left-[5px] before:[content:''] before:block before:w-0.5 before:h-0.5 before:bg-[#efeedb] before:border-[0.125rem] before:border-[#dee2c6] before:rounded-full before:transition-all before:duration-500 after:absolute after:-top-0.5 after:-left-[13px] after:[content:''] after:block after:w-0.5 after:h-0.5 after:bg-[#efeedb] after:border-[0.125rem] after:border-[#dee2c6] after:rounded-full after:transition-all after:duration-500"></div>
        </div>
        <div className="background absolute w-switch h-switch rounded-2xl border-[0.125rem] border-[#202020] bg-gradient-to-r from-[#484848] to-[#202020] transition-all duration-300 z-10">
          <div className="stars1 absolute top-[3px] right-3 w-[0.2rem] h-[0.2rem] bg-zinc-200 rounded-full transition-all duration-300 before:absolute before:top-[9px] before:-right-[6px] before:[content:''] before:w-0.5 before:h-0.5 before:bg-zinc-200 before:rounded-full before:transition-all before:duration-200 after:absolute after:top-1 after:right-2.5 after:[content:''] after:w-0.5 after:h-0.5 after:bg-zinc-200 after:rounded-full after:transition-all after:duration-200"></div>
          <div className="stars2 absolute top-5 right-6 w-[0.2rem] h-[0.2rem] bg-zinc-200 rounded-full transition-all duration-300 before:absolute before:top-[3px] before:-right-[13px] before:[content:''] before:w-0.5 before:h-0.5 before:bg-zinc-200 before:rounded-full before:transition-all before:duration-200 after:absolute after:-top-1 after:-right-2 after:[content:''] after:w-0.5 after:h-0.5 after:bg-zinc-200 after:rounded-full after:transition-all after:duration-200"></div>
        </div>
      </label>
    </div>
  );
}
