import { AiFillLinkedin, AiFillMail, AiFillGithub } from "react-icons/ai";
import { MdArrowUpward, MdPerson, MdPhoneEnabled } from "react-icons/md";
import { BiCodeAlt } from "react-icons/bi";

import Hero from "@/public/images/compressed/hero.webp";
import HeroDark from "@/public/images/compressed/heroDark.webp";
import Pizza from "@/public/images/compressed/pizza.webp";
import Creme from "@/public/images/compressed/creme.webp";
import Beef from "@/public/images/compressed/beef.webp";

import FoodAndNutrientsLanding from "@/public/images/compressed/foodAndNutrientsLanding.webp";
import FoodAndNutrientsSearch from "@/public/images/compressed/foodAndNutrientsSearch.webp";
import FoodAndNutrientsDetails from "@/public/images/compressed/foodAndNutrientsDetails.webp";
import SzczesliwyPuszekLanding from "@/public/images/compressed/szczesliwyPuszekLanding.webp";
import SzczesliwyPuszekWhyUs from "@/public/images/compressed/szczesliwyPuszekWhyUs.webp";
import SzczesliwyPuszekContact from "@/public/images/compressed/szczesliwyPuszekContact.webp";
import KnowlaWebMain from "@/public/images/compressed/knowlaWebMain.webp";
import KnowlaWebPlanet from "@/public/images/compressed/knowlaWebPlanet.webp";
import KnowlaWebSearch from "@/public/images/compressed/knowlaWebSearch.webp";

export const header = {
  links: [
    { text: "To the top", href: "#" },
    { text: "My work", href: "#my-work" },
    { text: "About me", href: "#about-me" },
    { text: "Contact me", href: "#contact-me" },
  ],
};

export const menu = {
  buttons: [
    { text: "MENU", aria: "Open menu" },
    { text: "CLOSE", aria: "Close menu" },
  ],
  icons: [
    {
      icon: AiFillMail,
      key: "Mail",
      href: "franekczajkaa@gmail.com",
      type: "mail",
    },
    {
      icon: AiFillGithub,
      key: "Github",
      href: "https://github.com/fczajka",
      type: "link",
    },
    {
      icon: AiFillLinkedin,
      key: "Linkedin",
      href: "https://www.linkedin.com/in/franciszek-czajka/",
      type: "link",
    },
  ],
  links: [
    {
      text: "TOP",
      href: "#",
      desc: "Back to the top.",
    },
    {
      text: "WORK",
      href: "#my-work",
      desc: "Take a look at my work.",
    },
    {
      text: "ABOUT",
      href: "#about-me",
      desc: "A little about me.",
    },
    {
      text: "CONTACT",
      href: "#contact-me",
      desc: "Contact me!",
    },
  ],
};

export const landing = {
  h1: "Hi, my name is Franciszek",
  paragraph: "I am creative web developer from Poznań, Poland.",
  image: Hero,
  imageDark: HeroDark,
  letters: ["S", "C", "R", "O", "L", "L"],
};

export const myWork = {
  h2: "Let's work together",
  desc: "My focus on building fast and aesthetically pleasing projects allows me to deliver engaging and compelling user experiences, while also ensuring that my solutions are both functional and efficient.",
  projects: [
    {
      name: "Food and Nutrients",
      shortDesc:
        "Food and Nutrients is a user-friendly web application that provides comprehensive nutrition information for any food and features a convenient meal calculator for tracking nutritional intake.",
      longDesc:
        "The development of this web based application was possible through the integration of the highly reliable Food Data Central API. As an official website of the United States government, the Food Data Central API guarantees that all nutritional information retrieved through this application is of the highest quality and accuracy. In order to create a seamless and user-friendly experience, this project was built using a technologies such as ReactJS, TypeScript, Tailwind, and Redux Toolkit.",
      images: [
        {
          image: FoodAndNutrientsLanding,
          alt: "Landing page of Food and Nutrients",
        },
        { image: FoodAndNutrientsSearch, alt: "Filled search input" },
        {
          image: FoodAndNutrientsDetails,
          alt: "Details page of Food and Nutrients",
        },
      ],
      links: [
        {
          disabled: false,
          text: "Live version",
          href: "https://fan-reactjs.vercel.app/",
        },
        {
          disabled: false,
          text: "Code on Github",
          href: "https://github.com/fczajka/fan-reactjs/",
        },
      ],
      buttonInfo: {
        text: "Read more",
        aria: "Check the details of Food and Nutrients",
        type: "button",
      },
    },
    {
      name: "Szczesliwy Puszek",
      shortDesc:
        "Szczesliwy Puszek is a portfolio website that has been specifically designed to showcase the work of newly emerged Samoyed dog breeders.",
      longDesc:
        "The primary objective of this project was to develop a highly functional and aesthetically pleasing website that provides a seamless user experience. To achieve this objective, the website was developed using NextJS in combination with technologies such as Tailwind, EmailJS, and React Toastify. This platform offers the owners a powerful and versatile tool for showcasing their dogs and services.",
      images: [
        {
          image: SzczesliwyPuszekLanding,
          alt: "Landing page of Szczesliwy Puszek",
        },
        {
          image: SzczesliwyPuszekWhyUs,
          alt: "Why Us section of Szczesliwy Puszek",
        },
        {
          image: SzczesliwyPuszekContact,
          alt: "Contact section of Szczesliwy Puszek",
        },
      ],
      links: [
        {
          disabled: false,
          text: "Live version",
          href: "https://szczesliwy-puszek.vercel.app/",
        },
        {
          disabled: false,
          text: "Code on Github",
          href: "https://github.com/fczajka/szczesliwy-puszek-nextjs/",
        },
      ],
      buttonInfo: {
        text: "Read more",
        aria: "Check the details of Szczesliwy Puszek",
        type: "button",
      },
    },
    {
      name: "Knowla - Web",
      shortDesc:
        "Knowla - Web is an interactive platform that supports children with disabilities through game-based learning. Using multimedia and gamification, it boosts cognitive skills, creativity, and problem-solving.",
      longDesc:
        "The goal of this project was to develop a fully functional and high-performance web platform that replicates the capabilities of Knoocker's desktop application. Built from the ground up using Next.js, TypeScript, Prisma, and Tailwind, this website delivers a seamless and intuitive user experience. As the only developer for most of the time, I was responsible for the development process, ensuring feature parity with the desktop application.",
      images: [
        { image: KnowlaWebMain, alt: "Main view of Knowla Web" },
        { image: KnowlaWebPlanet, alt: "Planet view of Knowla Web" },
        { image: KnowlaWebSearch, alt: "Search view of Knowla Web" },
      ],
      links: [
        {
          disabled: true,
          text: "Live version",
          href: "",
        },
        {
          disabled: true,
          text: "Code on Github",
          href: "",
        },
      ],
      buttonInfo: {
        text: "Read more",
        aria: "Check the details of Knowla Web",
        type: "button",
      },
    },
  ],
};

export const aboutMe = {
  h2: "Get to know me!",
  firstParagraph:
    "I'm a developer, maker and problem solver. When I'm not crafting code, I find joy in playing football or experimenting with new recipes and techniques in the kitchen.",
  h3: "Cooking",
  secondParagraph:
    "From savory meals to sweet treats, my culinary interests are broad, though I tend to lean torward recipes that feature sugar or chocolate.",
  foods: [
    { name: "Pizza", image: Pizza, alt: "Pizza" },
    { name: "Crème Caramel", image: Creme, alt: "Crème Caramel" },
    { name: "Beef", image: Beef, alt: "Beef" },
  ],
};

export const contact = {
  h3: "Write to me!",
  form: [
    { label: "Name:", htmlFor: "senderName", type: "text" },
    { label: "E - mail:", htmlFor: "email", type: "text" },
    { label: "Message:", htmlFor: "message", type: null },
  ],
  button: { text: "Send message!" },
  links: [
    {
      href: "franekczajkaa@gmail.com",
      icon: AiFillMail,
      type: "mail",
    },
    {
      href: "https://github.com/fczajka",
      icon: AiFillGithub,
      type: "link",
    },
    {
      href: "https://www.linkedin.com/in/franciszek-czajka/",
      icon: AiFillLinkedin,
      type: "link",
    },
  ],
};

export const mobileNavbar = {
  links: [
    { text: "To the top", href: "#", icon: MdArrowUpward },
    { text: "My work", href: "#my-work", icon: BiCodeAlt },
    {
      text: "About me",
      href: "#about-me",
      icon: MdPerson,
    },
    {
      text: "Contact me",
      href: "#contact-me",
      icon: MdPhoneEnabled,
    },
  ],
  buttons: [
    {
      text: "Menu",
      aria: "Open menu",
    },
    {
      text: "Close",
      aria: "Close menu",
    },
  ],
};
