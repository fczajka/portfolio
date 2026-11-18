import type { StaticImageData } from "next/image";
import { AiFillLinkedin, AiFillMail, AiFillGithub } from "react-icons/ai";
import { MdArrowUpward, MdPerson, MdPhoneEnabled } from "react-icons/md";
import { BiCodeAlt } from "react-icons/bi";
import { getProjectsMeta } from "@/data/projectsMeta";
import type {
  ExperienceSnapshot,
  Locale,
  MyWorkPhotos,
  ProjectItem,
} from "@/types";

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

const PROJECT_IMAGE_ASSETS: Record<
  string,
  { images: StaticImageData[]; logo: StaticImageData }
> = {
  platterify: {
    images: [
      PlatterifyHero,
      PlatterifyFloorPlan,
      PlatterifyKds,
      PlatterifyMenu,
      PlatterifyQrDesigner,
      PlatterifyAnalytics,
    ],
    logo: PlatterifyLogo,
  },
  kippr: {
    images: [
      KipprHomeDark,
      KipprHomeLight,
      KipprPantryScreen,
      KipprRecipes,
      KipprGeneratedRecipe,
      KipprShoppingList,
    ],
    logo: KipprLogo,
  },
  storis: {
    images: [
      StorisHomeScreen,
      StorisLibraryDark,
      StorisLibraryLight,
      StorisReadingScreen,
      StorisTextSettings,
    ],
    logo: StorisLogo,
  },
  "knowla-web": {
    images: [KnowlaWebMain, KnowlaWebPlanet, KnowlaWebSearch],
    logo: KnoockerLogo,
  },
};

const PROJECT_IMAGE_ALTS: Record<Locale, Record<string, string[]>> = {
  en: {
    platterify: [
      "Platterify hero section and interactive multi-screen simulation",
      "Platterify Floor Plan Command with live table statuses and guest alert loop",
      "Platterify Hot Line Kitchen Display System (KDS) with allergen alerts",
      "Platterify interactive guest digital menu preview",
      "Platterify visual Table QR Generator and canvas card designer",
      "Platterify P-Mix Menu Analytics and BCG growth-share matrix",
    ],
    kippr: [
      "Home screen of Kippr in dark mode",
      "Home screen of Kippr in light mode",
      "Pantry screen of Kippr",
      "Recipes screen of Kippr",
      "Generated recipe screen of Kippr",
      "Shopping list screen of Kippr",
    ],
    storis: [
      "Home screen of Storis",
      "Library screen of Storis in dark mode",
      "Library screen of Storis in light mode",
      "Reading screen of Storis",
      "Text settings screen of Storis",
    ],
    "knowla-web": [
      "Main view of Knowla Web",
      "Planet view of Knowla Web",
      "Search view of Knowla Web",
    ],
  },
  pl: {
    platterify: [
      "Sekcja hero Platterify oraz interaktywna symulacja wielu ekranów",
      "Mapa sali Platterify ze statusami stolików na żywo i powiadomieniami gości",
      "System kuchenny KDS Platterify z alertami alergenów",
      "Podgląd interaktywnego cyfrowego menu Platterify",
      "Wizualny kreator kodów QR przy stolikach i kart do druku w Platterify",
      "Analityka menu P-Mix oraz macierz BCG w Platterify",
    ],
    kippr: [
      "Ekran główny Kippr w trybie ciemnym",
      "Ekran główny Kippr w trybie jasnym",
      "Ekran spiżarni w aplikacji Kippr",
      "Ekran przepisów w aplikacji Kippr",
      "Ekran wygenerowanego przepisu w Kippr",
      "Ekran listy zakupów w aplikacji Kippr",
    ],
    storis: [
      "Ekran główny aplikacji Storis",
      "Biblioteka Storis w trybie ciemnym",
      "Biblioteka Storis w trybie jasnym",
      "Ekran czytania w aplikacji Storis",
      "Ustawienia tekstu w aplikacji Storis",
    ],
    "knowla-web": [
      "Widok główny platformy Knowla Web",
      "Widok Planety na platformie Knowla Web",
      "Widok wyszukiwania na platformie Knowla Web",
    ],
  },
};

function getProjectMediaBySlug(
  locale: Locale,
): Record<string, { images: MyWorkPhotos; logo: StaticImageData }> {
  const altsBySlug = PROJECT_IMAGE_ALTS[locale];
  const entries = Object.entries(PROJECT_IMAGE_ASSETS).map(([slug, asset]) => {
    const alts = altsBySlug[slug] ?? [];
    return [
      slug,
      {
        logo: asset.logo,
        images: asset.images.map((image, index) => ({
          image,
          alt: alts[index] ?? slug,
        })),
      },
    ] as const;
  });
  return Object.fromEntries(entries);
}

const SHARED_SOCIALS = {
  email: "franekczajkaa@gmail.com",
  github: "https://github.com/fczajka",
  linkedin: "https://www.linkedin.com/in/franciszek-czajka/",
} as const;

const HEADER_TRANSLATIONS: Record<
  Locale,
  { links: { text: string; href: string }[] }
> = {
  en: {
    links: [
      { text: "To the top", href: "/" },
      { text: "My work", href: "/#my-work" },
      { text: "About me", href: "/#about-me" },
      { text: "Contact me", href: "/#contact-me" },
    ],
  },
  pl: {
    links: [
      { text: "Na górę", href: "/" },
      { text: "Projekty", href: "/#my-work" },
      { text: "O mnie", href: "/#about-me" },
      { text: "Kontakt", href: "/#contact-me" },
    ],
  },
};

const MENU_TRANSLATIONS: Record<
  Locale,
  {
    buttons: { text: string; aria: string }[];
    iconLabels: { mail: string; github: string; linkedin: string };
    links: { text: string; href: string; desc: string }[];
  }
> = {
  en: {
    buttons: [
      { text: "MENU", aria: "Open menu" },
      { text: "CLOSE", aria: "Close menu" },
    ],
    iconLabels: {
      mail: "Email Franciszek",
      github: "GitHub profile",
      linkedin: "LinkedIn profile",
    },
    links: [
      { text: "TOP", href: "/", desc: "Back to the top." },
      { text: "WORK", href: "/#my-work", desc: "Take a look at my work." },
      { text: "ABOUT", href: "/#about-me", desc: "A little about me." },
      { text: "CONTACT", href: "/#contact-me", desc: "Contact me!" },
    ],
  },
  pl: {
    buttons: [
      { text: "MENU", aria: "Otwórz menu" },
      { text: "ZAMKNIJ", aria: "Zamknij menu" },
    ],
    iconLabels: {
      mail: "Napisz e-mail do Franciszka",
      github: "Profil GitHub",
      linkedin: "Profil LinkedIn",
    },
    links: [
      { text: "START", href: "/", desc: "Wróć na górę strony." },
      {
        text: "PROJEKTY",
        href: "/#my-work",
        desc: "Zobacz wybrane realizacje.",
      },
      { text: "O MNIE", href: "/#about-me", desc: "Kilka słów o mnie." },
      { text: "KONTAKT", href: "/#contact-me", desc: "Napisz do mnie!" },
    ],
  },
};

const LANDING_TRANSLATIONS: Record<
  Locale,
  {
    h1: string;
    paragraph: string;
    ctas: { text: string; href: string; variant: "primary" | "secondary" }[];
    letters: { id: string; letter: string }[];
  }
> = {
  en: {
    h1: "Hi, my name is Franciszek",
    paragraph:
      "I am a full-stack web & mobile developer from Poznań, Poland — building cross-platform Flutter apps and real-time Next.js web experiences.",
    ctas: [
      { text: "View my work", href: "#my-work", variant: "primary" },
      { text: "Contact me", href: "#contact-me", variant: "secondary" },
    ],
    letters: [
      { id: "0", letter: "S" },
      { id: "1", letter: "C" },
      { id: "2", letter: "R" },
      { id: "3", letter: "O" },
      { id: "4", letter: "L" },
      { id: "5", letter: "L" },
    ],
  },
  pl: {
    h1: "Cześć, jestem Franciszek",
    paragraph:
      "Jestem full-stack developerem web i mobile z Poznania — tworzę wieloplatformowe aplikacje we Flutterze oraz nowoczesne platformy webowe w Next.js.",
    ctas: [
      { text: "Zobacz projekty", href: "#my-work", variant: "primary" },
      { text: "Napisz do mnie", href: "#contact-me", variant: "secondary" },
    ],
    letters: [
      { id: "0", letter: "P" },
      { id: "1", letter: "R" },
      { id: "2", letter: "Z" },
      { id: "3", letter: "E" },
      { id: "4", letter: "W" },
      { id: "5", letter: "I" },
      { id: "6", letter: "Ń" },
    ],
  },
};

const MY_WORK_HEADINGS: Record<Locale, { h2: string; desc: string }> = {
  en: {
    h2: "Let's work together",
    desc: "My focus on building fast and aesthetically pleasing projects allows me to deliver engaging and compelling user experiences, while also ensuring that my solutions are both functional and efficient.",
  },
  pl: {
    h2: "Stwórzmy coś razem",
    desc: "Stawiam na szybkie, estetyczne i niezawodne aplikacje — dostarczam dopracowane doświadczenia użytkownika, dbając jednocześnie o wydajność i solidną architekturę.",
  },
};

const ABOUT_ME_TRANSLATIONS: Record<
  Locale,
  {
    h2: string;
    firstParagraph: string;
    experience: ExperienceSnapshot;
    h3: string;
    secondParagraph: string;
    foods: { name: string; image: StaticImageData; alt: string }[];
  }
> = {
  en: {
    h2: "Get to know me!",
    firstParagraph:
      "I'm a full-stack web and mobile developer focused on building fast, reliable, and well-crafted products — spanning enterprise Java platforms, modern TypeScript web apps, and cross-platform Flutter apps.",
    experience: {
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
          items: [
            "Full-Stack Delivery",
            "Responsive Web Design",
            "Code Reviews",
          ],
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
    },
    h3: "Beyond the code",
    secondParagraph:
      "I'm a developer, maker and problem solver. When I'm not crafting code, I find joy in playing football or experimenting with new recipes and techniques in the kitchen. From savory meals to sweet treats, my culinary interests are broad, though I tend to lean toward recipes that feature sugar or chocolate.",
    foods: [
      { name: "Pizza", image: Pizza, alt: "Pizza" },
      { name: "Crème Caramel", image: Creme, alt: "Crème Caramel" },
      { name: "Beef", image: Beef, alt: "Beef" },
    ],
  },
  pl: {
    h2: "Poznajmy się!",
    firstParagraph:
      "Jestem full-stack developerem web i mobile skupionym na tworzeniu szybkich, niezawodnych i dopracowanych produktów — od korporacyjnych platform w Javie, przez nowoczesne aplikacje webowe w TypeScript, po wieloplatformowe aplikacje we Flutterze.",
    experience: {
      headline: "Doświadczenie komercyjne",
      summary:
        "Rozwój oprogramowania full-stack i frontend w zespołach produktowych i enterprise w Poznaniu oraz zdalnie — od budowania aplikacji webowych od zera w TypeScript i React po rozwój korporacyjnej platformy SZPROT w Javie i Vaadin.",
      cv: {
        label: "Pobierz CV",
        href: "/#contact-me",
        downloadUrl: "/Franciszek_Czajka_CV.pdf",
      },
      coreStack: [
        {
          category: "Enterprise i Backend",
          items: ["Java", "Vaadin", "TypeScript", "Prisma"],
        },
        {
          category: "Frontend i Web",
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
          category: "Zespół i praktyki",
          items: [
            "Wdrożenia Full-Stack",
            "Responsywny Web Design",
            "Code Review",
          ],
        },
      ],
      milestones: [
        {
          step: "01",
          eyebrow: "CGI • Pełny etat",
          title: "Junior Fullstack Developer",
          period: "Sty 2026 – Obecnie",
          location: "Poznań, Polska • Hybrydowo",
          description:
            "Przejście do CGI w ramach przejęcia sektora i dalszy rozwój full-stackowy przy korporacyjnym projekcie „SZPROT” w technologiach Java i Vaadin.",
          highlights: ["Java", "Vaadin", "SZPROT"],
          logo: CgiLogo,
          logoAlt: "Logo CGI",
          icon: "enterprise",
        },
        {
          step: "02",
          eyebrow: "Comarch • Pełny etat",
          title: "Junior Fullstack Developer",
          period: "Lip 2025 – Gru 2025",
          location: "Poznań, Polska",
          description:
            "Awans ze stażysty na stanowisko Junior Fullstack Developera w zespole korporacyjnego projektu „SZPROT”:",
          roles: [
            {
              title: "Junior Fullstack Developer",
              period: "Paź 2025 – Gru 2025",
              workMode: "Hybrydowo",
              description:
                "Przejęcie bardziej złożonych zadań full-stackowych w projekcie „SZPROT” w oparciu o Javę i Vaadin oraz ścisła współpraca zespołowa przy rozwoju skalowalnych modułów wewnętrznych.",
            },
            {
              title: "Fullstack Developer (Staż)",
              period: "Lip 2025 – Wrz 2025",
              workMode: "Stacjonarnie",
              description:
                "Szybkie wdrożenie poprzez płynne przejście z Angulara na Vaadin i Javę w celu wsparcia zespołu projektu „SZPROT”.",
            },
          ],
          highlights: ["Java", "Vaadin", "Angular", "SZPROT"],
          logo: ComarchLogo,
          logoAlt: "Logo Comarch",
          icon: "enterprise",
        },
        {
          step: "03",
          eyebrow: "Mucha • Niepełny etat",
          title: "Junior Fullstack Developer",
          period: "Kwi 2025 – Lip 2025",
          location: "Poznań, Polska • Zdalnie",
          description:
            "Współtworzenie od podstaw rozbudowanej aplikacji cateringowej w zgranym, 3-osobowym zespole programistów.",
          highlights: ["React.js", "Responsive Web Design", "Full-Stack"],
          logo: MuchaLogo,
          logoAlt: "Logo Mucha",
          icon: "web",
        },
        {
          step: "04",
          eyebrow: "Solvd, Inc. • Staż",
          title: "Stażysta Front-End Developer (React.js)",
          period: "Sty 2025 – Mar 2025",
          location: "Zdalnie",
          description:
            "Ugruntowanie wiedzy z HTML, CSS, JavaScript oraz dobrych praktyk Reacta podczas aktywnego udziału w code review i nauki od starszych programistów.",
          highlights: ["React.js", "JavaScript", "HTML5 & CSS", "Code Reviews"],
          logo: SolvdLogo,
          logoAlt: "Logo Solvd, Inc.",
          icon: "code",
        },
        {
          step: "05",
          eyebrow: "Knoocker • Niepełny etat",
          title: "Junior Fullstack Developer",
          period: "Maj 2024 – Gru 2024",
          location: "Poznań, Polska • Hybrydowo",
          description:
            "Zaprojektowanie i stworzenie od zera nowej strony internetowej dla KNOOCKER z naciskiem na szybkość działania, estetykę i pełną responsywność.",
          highlights: ["TypeScript", "JavaScript", "Next.js", "Tailwind CSS"],
          logo: KnowlaCompanyLogo,
          logoAlt: "Logo Knoocker / Knowla",
          icon: "web",
        },
      ],
    },
    h3: "Poza kodem",
    secondParagraph:
      "Jestem programistą, twórcą i osobą, która lubi rozwiązywać złożone problemy. Kiedy nie piszę kodu, chętnie gram w piłkę nożną albo eksperymentuję w kuchni z nowymi przepisami i technikami. Od dań wytrawnych po słodkie wypieki — moje kulinarne zainteresowania są szerokie, choć najczęściej wygrywają przepisy z cukrem lub czekoladą.",
    foods: [
      { name: "Pizza", image: Pizza, alt: "Domowa pizza" },
      { name: "Crème Caramel", image: Creme, alt: "Deser Crème Caramel" },
      { name: "Wołowina", image: Beef, alt: "Danie z wołowiną" },
    ],
  },
};

const CONTACT_TRANSLATIONS: Record<
  Locale,
  {
    h3: string;
    labels: { senderName: string; email: string; message: string };
    buttonText: string;
  }
> = {
  en: {
    h3: "Write to me!",
    labels: {
      senderName: "Name:",
      email: "E - mail:",
      message: "Message:",
    },
    buttonText: "Send message!",
  },
  pl: {
    h3: "Napisz do mnie!",
    labels: {
      senderName: "Imię:",
      email: "E-mail:",
      message: "Wiadomość:",
    },
    buttonText: "Wyślij wiadomość!",
  },
};

const MOBILE_NAVBAR_TRANSLATIONS: Record<
  Locale,
  {
    links: { text: string; href: string }[];
    buttons: { text: string; aria: string }[];
  }
> = {
  en: {
    links: [
      { text: "To the top", href: "/" },
      { text: "My work", href: "/#my-work" },
      { text: "About me", href: "/#about-me" },
      { text: "Contact me", href: "/#contact-me" },
    ],
    buttons: [
      { text: "Menu", aria: "Open menu" },
      { text: "Close", aria: "Close menu" },
    ],
  },
  pl: {
    links: [
      { text: "Start", href: "/" },
      { text: "Projekty", href: "/#my-work" },
      { text: "O mnie", href: "/#about-me" },
      { text: "Kontakt", href: "/#contact-me" },
    ],
    buttons: [
      { text: "Menu", aria: "Otwórz menu" },
      { text: "Zamknij", aria: "Zamknij menu" },
    ],
  },
};

const FOOTER_TRANSLATIONS: Record<Locale, { tagline: string }> = {
  en: {
    tagline: "Full-stack web & mobile developer based in Poznań, Poland.",
  },
  pl: {
    tagline: "Full-stack developer web i mobile z Poznania.",
  },
};

export type UiCopy = {
  portrait: {
    svgAria: string;
    buttonAria: string;
    hoverHint: string;
    greetings: string[];
  };
  myWork: {
    filterAria: string;
    filters: { all: string; web: string; mobile: string };
  };
  projectModal: {
    fullPage: string;
    fullPageAria: (name: string) => string;
    copyLink: string;
    copied: string;
    copyLinkAria: (name: string) => string;
    copiedLinkAria: (name: string) => string;
    closeAria: (name: string) => string;
  };
  slider: {
    expandAria: (alt: string) => string;
    prevAria: string;
    nextAria: string;
    indicatorAria: (index: number) => string;
    lightboxAria: (projectName?: string) => string;
    closeLightboxAria: string;
  };
  projectPage: {
    backToAll: string;
    overviewHeading: string;
    problemLabel: string;
    architectureLabel: string;
    highlightsLabel: string;
    technologiesLabel: string;
    moreProjects: string;
    viewCaseStudy: string;
    logoAlt: (name: string) => string;
  };
  experience: {
    coreStackTitle: string;
  };
  contactForm: {
    sendingLabel: string;
    sendingAria: string;
    submitAria: string;
    toastPending: string;
    toastSuccess: string;
    toastErrorFallback: string;
  };
  menu: {
    navAria: string;
  };
  footer: {
    navAria: string;
    rightsReserved: string;
    backToTop: string;
  };
  themeToggleAria: string;
};

const UI_COPY: Record<Locale, UiCopy> = {
  en: {
    portrait: {
      svgAria: "Animated line-art portrait of Franciszek Czajka",
      buttonAria: "Say hi to Franciszek",
      hoverHint: "Click to say hi!",
      greetings: [
        "Hi there! 👋",
        "Nice to meet you!",
        "Let's build something cool!",
        "Coffee & code?",
      ],
    },
    myWork: {
      filterAria: "Filter projects by platform",
      filters: { all: "All", web: "Web", mobile: "Mobile" },
    },
    projectModal: {
      fullPage: "Full page",
      fullPageAria: (name) => `Open full case study page for ${name}`,
      copyLink: "Copy link",
      copied: "Copied!",
      copyLinkAria: (name) => `Copy link to ${name}`,
      copiedLinkAria: (name) => `Copied link to ${name}`,
      closeAria: (name) => `Close details of ${name}`,
    },
    slider: {
      expandAria: (alt) => `Expand screenshot: ${alt}`,
      prevAria: "Previous screenshot",
      nextAria: "Next screenshot",
      indicatorAria: (index) => `View screenshot ${index}`,
      lightboxAria: (projectName) =>
        `${projectName ?? "Project"} screenshot lightbox`,
      closeLightboxAria: "Close expanded screenshot",
    },
    projectPage: {
      backToAll: "Back to all projects",
      overviewHeading: "Overview & architecture",
      problemLabel: "Problem & scope",
      architectureLabel: "System architecture",
      highlightsLabel: "Key engineering highlights",
      technologiesLabel: "Technologies used",
      moreProjects: "More projects",
      viewCaseStudy: "View case study",
      logoAlt: (name) => `${name} logo`,
    },
    experience: {
      coreStackTitle: "Core Stack",
    },
    contactForm: {
      sendingLabel: "Sending...",
      sendingAria: "Sending message",
      submitAria: "Submit form",
      toastPending: "Sending message!",
      toastSuccess: "Message sent successfully!",
      toastErrorFallback: "Message was not sent!",
    },
    menu: {
      navAria: "Site navigation",
    },
    footer: {
      navAria: "Footer navigation",
      rightsReserved: "All rights reserved.",
      backToTop: "Back to top",
    },
    themeToggleAria: "Toggle theme",
  },
  pl: {
    portrait: {
      svgAria: "Animowany portret liniowy Franciszka Czajki",
      buttonAria: "Przywitaj się z Franciszkiem",
      hoverHint: "Kliknij i powiedz cześć!",
      greetings: [
        "Cześć! 👋",
        "Miło Cię poznać!",
        "Zbudujmy coś świetnego!",
        "Kawa i kod?",
      ],
    },
    myWork: {
      filterAria: "Filtruj projekty według platformy",
      filters: { all: "Wszystkie", web: "Web", mobile: "Mobile" },
    },
    projectModal: {
      fullPage: "Pełna strona",
      fullPageAria: (name) => `Otwórz pełną stronę case study dla ${name}`,
      copyLink: "Kopiuj link",
      copied: "Skopiowano!",
      copyLinkAria: (name) => `Kopiuj link do ${name}`,
      copiedLinkAria: (name) => `Skopiowano link do ${name}`,
      closeAria: (name) => `Zamknij szczegóły projektu ${name}`,
    },
    slider: {
      expandAria: (alt) => `Powiększ zrzut ekranu: ${alt}`,
      prevAria: "Poprzedni zrzut ekranu",
      nextAria: "Następny zrzut ekranu",
      indicatorAria: (index) => `Pokaż zrzut ekranu ${index}`,
      lightboxAria: (projectName) =>
        `Podgląd zrzutów ekranu: ${projectName ?? "Projekt"}`,
      closeLightboxAria: "Zamknij powiększony zrzut ekranu",
    },
    projectPage: {
      backToAll: "Wróć do wszystkich projektów",
      overviewHeading: "Przegląd i architektura",
      problemLabel: "Problem i zakres",
      architectureLabel: "Architektura systemu",
      highlightsLabel: "Kluczowe rozwiązania techniczne",
      technologiesLabel: "Użyte technologie",
      moreProjects: "Więcej projektów",
      viewCaseStudy: "Zobacz case study",
      logoAlt: (name) => `Logo ${name}`,
    },
    experience: {
      coreStackTitle: "Główny stack",
    },
    contactForm: {
      sendingLabel: "Wysyłanie...",
      sendingAria: "Wysyłanie wiadomości",
      submitAria: "Wyślij formularz",
      toastPending: "Wysyłanie wiadomości!",
      toastSuccess: "Wiadomość została wysłana!",
      toastErrorFallback: "Nie udało się wysłać wiadomości!",
    },
    menu: {
      navAria: "Nawigacja po stronie",
    },
    footer: {
      navAria: "Nawigacja w stopce",
      rightsReserved: "Wszelkie prawa zastrzeżone.",
      backToTop: "Wróć na górę",
    },
    themeToggleAria: "Zmień motyw",
  },
};

/** Returns localized UI labels and interaction copy for the active locale. */
export function getUiCopy(locale: Locale = "en"): UiCopy {
  return UI_COPY[locale];
}

/** Returns complete localized portfolio content for the requested locale (`en` or `pl`). */
export function getContent(locale: Locale = "en") {
  const headerData = HEADER_TRANSLATIONS[locale];
  const menuData = MENU_TRANSLATIONS[locale];
  const landingData = LANDING_TRANSLATIONS[locale];
  const mediaBySlug = getProjectMediaBySlug(locale);
  const projects: ProjectItem[] = getProjectsMeta(locale).map((meta) => {
    const media = mediaBySlug[meta.slug];
    if (!media) {
      throw new Error(`Missing project media configuration for "${meta.slug}"`);
    }

    return {
      ...meta,
      images: media.images,
      logo: media.logo,
    };
  });
  const myWorkData = {
    ...MY_WORK_HEADINGS[locale],
    projects,
  };
  const aboutMeData = ABOUT_ME_TRANSLATIONS[locale];
  const contactCopy = CONTACT_TRANSLATIONS[locale];
  const mobileData = MOBILE_NAVBAR_TRANSLATIONS[locale];
  const footerData = FOOTER_TRANSLATIONS[locale];

  return {
    header: headerData,
    menu: {
      buttons: menuData.buttons,
      icons: [
        {
          icon: AiFillMail,
          key: "Mail",
          label: menuData.iconLabels.mail,
          href: SHARED_SOCIALS.email,
          type: "mail",
        },
        {
          icon: AiFillGithub,
          key: "Github",
          label: menuData.iconLabels.github,
          href: SHARED_SOCIALS.github,
          type: "link",
        },
        {
          icon: AiFillLinkedin,
          key: "Linkedin",
          label: menuData.iconLabels.linkedin,
          href: SHARED_SOCIALS.linkedin,
          type: "link",
        },
      ],
      links: menuData.links,
    },
    landing: landingData,
    myWork: myWorkData,
    aboutMe: aboutMeData,
    contact: {
      h3: contactCopy.h3,
      form: [
        {
          label: contactCopy.labels.senderName,
          htmlFor: "senderName" as const,
          type: "text",
          autoComplete: "name",
          maxLength: 120,
        },
        {
          label: contactCopy.labels.email,
          htmlFor: "email" as const,
          type: "email",
          autoComplete: "email",
          maxLength: 254,
        },
        {
          label: contactCopy.labels.message,
          htmlFor: "message" as const,
          type: null,
          maxLength: 4000,
        },
      ],
      button: { text: contactCopy.buttonText },
      links: [
        {
          href: SHARED_SOCIALS.email,
          icon: AiFillMail,
          type: "mail",
        },
        {
          href: SHARED_SOCIALS.github,
          icon: AiFillGithub,
          type: "link",
        },
        {
          href: SHARED_SOCIALS.linkedin,
          icon: AiFillLinkedin,
          type: "link",
        },
      ],
    },
    mobileNavbar: {
      links: [
        { ...mobileData.links[0], icon: MdArrowUpward },
        { ...mobileData.links[1], icon: BiCodeAlt },
        { ...mobileData.links[2], icon: MdPerson },
        { ...mobileData.links[3], icon: MdPhoneEnabled },
      ],
      buttons: mobileData.buttons,
    },
    footer: {
      name: "Franciszek Czajka",
      tagline: footerData.tagline,
      links: headerData.links,
      socials: [
        {
          label: menuData.iconLabels.mail,
          href: `mailto:${SHARED_SOCIALS.email}`,
          icon: AiFillMail,
          external: false,
        },
        {
          label: menuData.iconLabels.github,
          href: SHARED_SOCIALS.github,
          icon: AiFillGithub,
          external: true,
        },
        {
          label: menuData.iconLabels.linkedin,
          href: SHARED_SOCIALS.linkedin,
          icon: AiFillLinkedin,
          external: true,
        },
      ],
    },
  };
}

const defaultContent = getContent("en");

export const header = defaultContent.header;
export const menu = defaultContent.menu;
export const landing = defaultContent.landing;
export const myWork = defaultContent.myWork;
export const aboutMe: typeof defaultContent.aboutMe & {
  experience: ExperienceSnapshot;
} = defaultContent.aboutMe;
export const contact = defaultContent.contact;
export const mobileNavbar = defaultContent.mobileNavbar;
export const footer = defaultContent.footer;
