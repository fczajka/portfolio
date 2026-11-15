import type { StaticImageData } from "next/image";
import { AiFillLinkedin, AiFillMail, AiFillGithub } from "react-icons/ai";
import { MdArrowUpward, MdPerson, MdPhoneEnabled } from "react-icons/md";
import { BiCodeAlt } from "react-icons/bi";
import { projectsMeta } from "@/data/projectsMeta";
import type { ExperienceSnapshot, MyWorkPhotos, ProjectItem } from "@/types";

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
import PlatterifyHero from "@/public/images/compressed/platterifyHero.webp";
import PlatterifyFloorPlan from "@/public/images/compressed/platterifyFloorPlan.webp";
import PlatterifyKds from "@/public/images/compressed/platterifyKds.webp";
import PlatterifyMenu from "@/public/images/compressed/platterifyMenu.webp";
import PlatterifyQrDesigner from "@/public/images/compressed/platterifyQrDesigner.webp";
import PlatterifyAnalytics from "@/public/images/compressed/platterifyAnalytics.webp";
import KipprLogo from "@/public/images/compressed/kippr_logo.webp";
import StorisLogo from "@/public/images/compressed/storis_logo.webp";
import KnoockerLogo from "@/public/images/compressed/knoocker_logo.webp";
import PlatterifyLogo from "@/public/images/compressed/platterify_logo.webp";
import CgiLogo from "@/public/images/compressed/cgi_logo.png";
import ComarchLogo from "@/public/images/compressed/comarch_logo.png";
import MuchaLogo from "@/public/images/compressed/mucha_logo.png";
import SolvdLogo from "@/public/images/compressed/solvd_logo.png";
import KnowlaCompanyLogo from "@/public/images/compressed/knowla_company_logo.png";

export const header = {
  links: [
    { text: "To the top", href: "/" },
    { text: "My work", href: "/#my-work" },
    { text: "About me", href: "/#about-me" },
    { text: "Contact me", href: "/#contact-me" },
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
      label: "Email Franciszek",
      href: "franekczajkaa@gmail.com",
      type: "mail",
    },
    {
      icon: AiFillGithub,
      key: "Github",
      label: "GitHub profile",
      href: "https://github.com/fczajka",
      type: "link",
    },
    {
      icon: AiFillLinkedin,
      key: "Linkedin",
      label: "LinkedIn profile",
      href: "https://www.linkedin.com/in/franciszek-czajka/",
      type: "link",
    },
  ],
  links: [
    {
      text: "TOP",
      href: "/",
      desc: "Back to the top.",
    },
    {
      text: "WORK",
      href: "/#my-work",
      desc: "Take a look at my work.",
    },
    {
      text: "ABOUT",
      href: "/#about-me",
      desc: "A little about me.",
    },
    {
      text: "CONTACT",
      href: "/#contact-me",
      desc: "Contact me!",
    },
  ],
};

export const landing = {
  h1: "Hi, my name is Franciszek",
  paragraph:
    "I am a full-stack web & mobile developer from Poznań, Poland — building cross-platform Flutter apps and real-time Next.js web experiences.",
  ctas: [
    { text: "View my work", href: "#my-work", variant: "primary" as const },
    { text: "Contact me", href: "#contact-me", variant: "secondary" as const },
  ],
  letters: [
    { id: "0", letter: "S" },
    { id: "1", letter: "C" },
    { id: "2", letter: "R" },
    { id: "3", letter: "O" },
    { id: "4", letter: "L" },
    { id: "5", letter: "L" },
  ],
};

const projectMediaBySlug: Record<
  string,
  { images: MyWorkPhotos; logo: StaticImageData }
> = {
  platterify: {
    images: [
      {
        image: PlatterifyHero,
        alt: "Platterify hero section and interactive multi-screen simulation",
      },
      {
        image: PlatterifyFloorPlan,
        alt: "Platterify Floor Plan Command with live table statuses and guest alert loop",
      },
      {
        image: PlatterifyKds,
        alt: "Platterify Hot Line Kitchen Display System (KDS) with allergen alerts",
      },
      {
        image: PlatterifyMenu,
        alt: "Platterify interactive guest digital menu preview",
      },
      {
        image: PlatterifyQrDesigner,
        alt: "Platterify visual Table QR Generator and canvas card designer",
      },
      {
        image: PlatterifyAnalytics,
        alt: "Platterify P-Mix Menu Analytics and BCG growth-share matrix",
      },
    ],
    logo: PlatterifyLogo,
  },
  kippr: {
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
    logo: KipprLogo,
  },
  storis: {
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
    logo: StorisLogo,
  },
  "knowla-web": {
    images: [
      { image: KnowlaWebMain, alt: "Main view of Knowla Web" },
      { image: KnowlaWebPlanet, alt: "Planet view of Knowla Web" },
      { image: KnowlaWebSearch, alt: "Search view of Knowla Web" },
    ],
    logo: KnoockerLogo,
  },
};

export const myWork: {
  h2: string;
  desc: string;
  projects: ProjectItem[];
} = {
  h2: "Let's work together",
  desc: "My focus on building fast and aesthetically pleasing projects allows me to deliver engaging and compelling user experiences, while also ensuring that my solutions are both functional and efficient.",
  projects: projectsMeta.map((meta) => {
    const media = projectMediaBySlug[meta.slug];
    if (!media) {
      throw new Error(`Missing project media configuration for "${meta.slug}"`);
    }

    return {
      ...meta,
      images: media.images,
      logo: media.logo,
    };
  }),
};

export const aboutMe = {
  h2: "Get to know me!",
  firstParagraph:
    "I'm a developer, maker and problem solver. When I'm not crafting code, I find joy in playing football or experimenting with new recipes and techniques in the kitchen.",
  experience: {
    badge: "Commercial Experience",
    headline: "Commercial work history",
    summary:
      "Full-stack and frontend engineering across enterprise and product teams in Poznań and remotely — from building greenfield web apps with TypeScript and React to developing the enterprise SZPROT platform in Java and Vaadin.",
    cv: {
      label: "Download CV / Resume",
      href: "/#contact-me",
      downloadUrl: "/Franciszek_Czajka_CV.pdf",
    },
    coreStack: [
      {
        category: "Enterprise & Backend",
        items: ["Java", "Vaadin", "TypeScript", "Prisma"],
      },
      {
        category: "Frontend & Web",
        items: [
          "React.js",
          "Next.js",
          "Angular",
          "JavaScript",
          "HTML5 / CSS",
          "Tailwind CSS",
        ],
      },
      {
        category: "Team & Practices",
        items: ["Full-Stack Delivery", "Responsive Web Design", "Code Reviews"],
      },
    ],
    milestones: [
      {
        step: "01",
        eyebrow: "CGI • Full-time",
        title: "Junior Fullstack Developer",
        period: "Jan 2026 – Present",
        location: "Poznań, Poland • Hybrid",
        description:
          'Transitioned to CGI via sector acquisition, continuing full-stack development on the enterprise "SZPROT" project with Java and Vaadin.',
        highlights: ["Java", "Vaadin", "SZPROT"],
        logo: CgiLogo,
        logoAlt: "CGI logo",
        icon: "enterprise",
      },
      {
        step: "02",
        eyebrow: "Comarch • Full-time",
        title: "Junior Fullstack Developer",
        period: "Jul 2025 – Dec 2025",
        location: "Poznań, Poland",
        description:
          'Progressed from intern to full-stack developer within the enterprise "SZPROT" engineering team:',
        roles: [
          {
            title: "Junior Fullstack Developer",
            period: "Oct 2025 – Dec 2025",
            workMode: "Hybrid",
            description:
              'Took on more complex full-stack responsibilities within the "SZPROT" project using Java and Vaadin, collaborating with the team on robust, scalable internal application features.',
          },
          {
            title: "Fullstack Developer (Intern)",
            period: "Jul 2025 – Sep 2025",
            workMode: "On-site",
            description:
              'Fast-tracked onboarding by adapting from Angular to Vaadin and Java to support the enterprise "SZPROT" project.',
          },
        ],
        highlights: ["Java", "Vaadin", "Angular", "SZPROT"],
        logo: ComarchLogo,
        logoAlt: "Comarch logo",
        icon: "enterprise",
      },
      {
        step: "03",
        eyebrow: "Mucha • Part-time",
        title: "Junior Fullstack Developer",
        period: "Apr 2025 – Jul 2025",
        location: "Poznań, Poland • Remote",
        description:
          "Co-developed a comprehensive catering application from scratch alongside a close-knit team of 3 developers.",
        highlights: ["React.js", "Responsive Web Design", "Full-Stack"],
        logo: MuchaLogo,
        logoAlt: "Mucha logo",
        icon: "web",
      },
      {
        step: "04",
        eyebrow: "Solvd, Inc. • Internship",
        title: "Front-End Developer Trainee (React.js)",
        period: "Jan 2025 – Mar 2025",
        location: "Remote",
        description:
          "Built strong proficiency in HTML, CSS, JavaScript, and React principles while actively participating in code reviews and learning from senior developers.",
        highlights: ["React.js", "JavaScript", "HTML5 & CSS", "Code Reviews"],
        logo: SolvdLogo,
        logoAlt: "Solvd, Inc. logo",
        icon: "code",
      },
      {
        step: "05",
        eyebrow: "Knoocker • Part-time",
        title: "Junior Fullstack Developer",
        period: "May 2024 – Dec 2024",
        location: "Poznań, Poland • Hybrid",
        description:
          "Developed a brand-new website from the ground up for KNOOCKER, focused on delivering a fast, visually appealing online experience accessible across all devices.",
        highlights: ["TypeScript", "JavaScript", "Next.js", "Tailwind CSS"],
        logo: KnowlaCompanyLogo,
        logoAlt: "Knoocker / Knowla logo",
        icon: "web",
      },
    ],
  } satisfies ExperienceSnapshot,
  h3: "Cooking",
  secondParagraph:
    "From savory meals to sweet treats, my culinary interests are broad, though I tend to lean toward recipes that feature sugar or chocolate.",
  foods: [
    { name: "Pizza", image: Pizza, alt: "Pizza" },
    { name: "Crème Caramel", image: Creme, alt: "Crème Caramel" },
    { name: "Beef", image: Beef, alt: "Beef" },
  ],
};

export const contact = {
  h3: "Write to me!",
  form: [
    {
      label: "Name:",
      htmlFor: "senderName" as const,
      type: "text",
      autoComplete: "name",
      maxLength: 120,
    },
    {
      label: "E - mail:",
      htmlFor: "email" as const,
      type: "email",
      autoComplete: "email",
      maxLength: 254,
    },
    {
      label: "Message:",
      htmlFor: "message" as const,
      type: null,
      maxLength: 4000,
    },
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
    { text: "To the top", href: "/", icon: MdArrowUpward },
    { text: "My work", href: "/#my-work", icon: BiCodeAlt },
    {
      text: "About me",
      href: "/#about-me",
      icon: MdPerson,
    },
    {
      text: "Contact me",
      href: "/#contact-me",
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

export const footer = {
  name: "Franciszek Czajka",
  tagline: "Full-stack web & mobile developer based in Poznań, Poland.",
  links: header.links,
  socials: [
    {
      label: "Email Franciszek",
      href: "mailto:franekczajkaa@gmail.com",
      icon: AiFillMail,
      external: false,
    },
    {
      label: "GitHub profile",
      href: "https://github.com/fczajka",
      icon: AiFillGithub,
      external: true,
    },
    {
      label: "LinkedIn profile",
      href: "https://www.linkedin.com/in/franciszek-czajka/",
      icon: AiFillLinkedin,
      external: true,
    },
  ],
};
