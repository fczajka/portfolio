import { AiFillLinkedin, AiFillMail, AiFillGithub } from "react-icons/ai";
import { MdArrowUpward, MdPerson, MdPhoneEnabled } from "react-icons/md";
import { BiCodeAlt } from "react-icons/bi";

import Hero from "@/public/images/compressed/hero.webp";
import HeroDark from "@/public/images/compressed/heroDark.webp";
import Pizza from "@/public/images/compressed/pizza.webp";
import Creme from "@/public/images/compressed/creme.webp";
import Beef from "@/public/images/compressed/beef.webp";

import KipprHomeDark from "@/public/images/compressed/kipprHomeDark.webp";
import KipprHomeLight from "@/public/images/compressed/kipprHomeLight.webp";
import KipprPantryScreen from "@/public/images/compressed/kipprPantryScreen.webp";
import KipprRecipes from "@/public/images/compressed/kipprRecipes.webp";
import KipprGeneratedRecipe from "@/public/images/compressed/kipprGeneratedRecipe.webp";
import KipprShoppingList from "@/public/images/compressed/kipprShoppingList.webp";
import StorisHomeScreen from "@/public/images/compressed/storisHomeScreen.webp";
import StorisLibraryDark from "@/public/images/compressed/storisLibraryDark.webp";
import StorisLibraryLight from "@/public/images/compressed/storisLibraryLight.webp";
import StorisReadingScreen from "@/public/images/compressed/storisReadingScreen.webp";
import StorisTextSettings from "@/public/images/compressed/storisTextSettings.webp";
import KnowlaWebMain from "@/public/images/compressed/knowlaWebMain.webp";
import KnowlaWebPlanet from "@/public/images/compressed/knowlaWebPlanet.webp";
import KnowlaWebSearch from "@/public/images/compressed/knowlaWebSearch.webp";
import KipprLogo from "@/public/images/compressed/kippr_logo.webp";
import StorisLogo from "@/public/images/compressed/storis_logo.webp";
import KnoockerLogo from "@/public/images/compressed/knoocker_logo.webp";

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
      name: "Kippr",
      shortDesc:
        "Kippr is an offline-first pantry tracker and inventory mobile application. It helps you easily manage your kitchen stock, reduce food waste, save money, and organize your groceries right from your phone.",
      techStack: ["Flutter", "PowerSync", "SQLite", "Supabase", "Riverpod"],
      longDesc:
        "Kippr is an offline-first pantry tracking mobile application engineered with Flutter. Built on a local-first architecture using PowerSync, SQLite, and Supabase, it ensures flawless offline utility with real-time cloud synchronization. The app maximizes user efficiency by integrating Mobile Scanner, Google MLKit OCR, and the OpenFoodFacts API for smart barcode and receipt scanning. State management is handled via Riverpod, while local data uses Hive CE. Complete with RevenueCat monetization, automated expiry alerts, and Firebase analytics, Kippr delivers a scalable, production-ready SaaS product.",
      images: [
        {
          image: KipprHomeDark,
          alt: "Home screen of Kippr in dark mode",
        },
        { image: KipprHomeLight, alt: "Home screen of Kippr in light mode" },
        {
          image: KipprPantryScreen,
          alt: "Pantry screen of Kippr",
        },
        {
          image: KipprRecipes,
          alt: "Recipes screen of Kippr",
        },
        {
          image: KipprGeneratedRecipe,
          alt: "Generated recipe screen of Kippr",
        },
        {
          image: KipprShoppingList,
          alt: "Shopping list screen of Kippr",
        },
      ],
      links: [
        {
          disabled: false,
          text: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.lapwingsoftware.kippr",
        },
        {
          disabled: false,
          text: "App Store",
          href: "https://apps.apple.com/pl/app/kippr-pantry-tracker/id6761077705",
        },
        {
          disabled: true,
          text: "Code on Github",
          href: "https://github.com/fczajka/fan-reactjs/",
        },
      ],
      buttonInfo: {
        text: "Read more",
        aria: "Check the details of Food and Nutrients",
        type: "button",
      },
      logo: KipprLogo,
      imagesInFormat: "3:4" as const,
    },
    {
      name: "Storis",
      shortDesc:
        "Storis is a mobile platform transforming interactive storytelling via edge AI. It leverages on-device machine learning to trigger dynamic, real-time audio soundscapes as a user reads aloud.",
      techStack: [
        "Flutter",
        "Sherpa ONNX",
        "Supabase",
        "Riverpod",
        "RevenueCat",
      ],
      longDesc:
        "Storis is an interactive mobile platform transforming digital storytelling via Flutter. I used the Sherpa ONNX engine for edge AI alongside record and audioplayers, it triggers real-time audio soundscapes as a user reads aloud. Designed for scale, the architecture pairs Riverpod for state management with Supabase for cloud data and seamless Google/Apple authentication. With RevenueCat integration for subscription monetization, Envied for asset security, and SharedPreferences caching, Storis stands as a production-ready SaaS product at the intersection of AI and edutainment.",
      images: [
        {
          image: StorisHomeScreen,
          alt: "Home screen of Storis",
        },
        {
          image: StorisLibraryDark,
          alt: "Library screen of Storis in dark mode",
        },
        {
          image: StorisLibraryLight,
          alt: "Library screen of Storis in light mode",
        },
        {
          image: StorisReadingScreen,
          alt: "Reading screen of Storis",
        },
        {
          image: StorisTextSettings,
          alt: "Text settings screen of Storis",
        },
      ],
      links: [
        {
          disabled: true,
          text: "Google Play",
          href: "",
        },
        {
          disabled: false,
          text: "App Store",
          href: "https://apps.apple.com/us/app/storis-bedtime-stories/id6773403059",
        },
        {
          disabled: true,
          text: "Code on Github",
          href: "https://github.com/fczajka/szczesliwy-puszek-nextjs/",
        },
      ],
      buttonInfo: {
        text: "Read more",
        aria: "Check the details of Szczesliwy Puszek",
        type: "button",
      },
      logo: StorisLogo,
      imagesInFormat: "3:4" as const,
    },
    {
      name: "Knowla - Web",
      shortDesc:
        "Knowla - Web is an interactive platform that supports children with disabilities through game-based learning. Using multimedia and gamification, it boosts cognitive skills, creativity, and problem-solving.",
      techStack: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
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
      logo: KnoockerLogo,
      imagesInFormat: "1:1" as const,
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
