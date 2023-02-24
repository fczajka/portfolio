import { AiOutlineArrowUp, AiFillPhone } from "react-icons/ai";
import { BiCodeAlt } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";

import Hero from "@/public/images/hero.png";

export const header = {
    menu: "MENU",
    links: [
        { text: "To the top", href: "/" },
        { text: "My work", href: "/" },
        { text: "About me", href: "/" },
        { text: "Contact me", href: "/" },
    ],
};

export const landing = {
    h1: "Hi, my name is Franciszek!",
    paragraph: "I am creative web developer from Poznań, Poland.",
    image: Hero,
    letters: ["S", "C", "R", "O", "L", "L"],
};

export const mobileNavbar = [
    { text: "To the top", href: "#", icon: AiOutlineArrowUp, type: "link" },
    { text: "My work", href: "#", icon: BiCodeAlt, type: "link" },
    { text: "About me", href: "#", icon: BsFillPersonFill, type: "link" },
    { text: "Contact me", href: "#", icon: AiFillPhone, type: "link" },
    { text: "MENU", href: "#", icon: HiMenuAlt3, type: "button" },
];
