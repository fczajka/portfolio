import type {
  ImageFormat,
  ProjectCaseStudy,
  ProjectCategory,
  ProjectLink,
} from "@/types";

export type ProjectMeta = {
  slug: string;
  name: string;
  category: ProjectCategory;
  platform: string;
  shortDesc: string;
  techStack: string[];
  longDesc: string;
  caseStudy: ProjectCaseStudy;
  links: ProjectLink[];
  buttonInfo: {
    text: string;
    aria: string;
    type: "button";
  };
  imagesInFormat: ImageFormat;
};

export const projectsMeta: ProjectMeta[] = [
  {
    slug: "platterify",
    name: "Platterify",
    category: "web",
    platform: "Live Web App",
    shortDesc:
      "Platterify is a real-time multiplayer hospitality platform for restaurants and bars. Guests scan table QR codes to browse digital menus, order collaboratively, and request bills in one tap, while staff manage live tables and kitchen tickets.",
    techStack: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
    longDesc:
      "Platterify is a full-stack restaurant operating system engineered with Next.js App Router, React 19, TypeScript, and Tailwind CSS on top of Supabase (PostgreSQL with Row Level Security and Realtime). Guests scan a QR code at their table with no app download required to browse allergen-aware digital menus, build shared table carts, split bills, and request table-side settlement. For operators, the platform delivers a real-time Kitchen Display System (KDS) with 86 toggles, interactive floor plan management, a live Menu CMS, a custom QR code designer, Z-reports, and bilingual EN/PL support backed by a zero-trust server architecture.",
    caseStudy: {
      challenge:
        "Traditional dine-in service loses momentum across three wait states: 10–15 minutes waiting for menus or staff to take orders, multi-step paper ticket hand-offs into the kitchen, and 15–20 minutes waiting to split or settle the bill — all without pushing venues into costly proprietary hardware or per-order commissions.",
      architecture:
        "Built on multi-tenant PostgreSQL Row Level Security isolating anonymous table QR sessions from authenticated venue staff, paired with live WebSocket subscriptions syncing table states (Free, Ordering, Eating) on the floor plan and kitchen station queues (New, Preparing, Ready). Server-side validation secures menu edits, stock availability toggles, and daily settlement reports across English and Polish locales.",
      highlights: [
        "Eliminates ordering and checkout queues with instant browser-based QR table sessions, shared carts, and one-tap bill splitting — no app download required.",
        "Routes station-sorted orders with prominent allergen indicators and item availability toggles straight to kitchen screens, replacing paper ticket hand-offs.",
        "Bundles interactive floor-plan tracking, custom printable QR design, live menu management, and end-of-day Z-reports into a flat-rate browser workflow with zero hardware lock-in.",
      ],
    },
    links: [
      {
        disabled: false,
        text: "Live version",
        href: "https://platterify.com/",
        role: "primary",
      },
    ],
    buttonInfo: {
      text: "Read more",
      aria: "Check the details of Platterify",
      type: "button",
    },
    imagesInFormat: "1:1",
  },
  {
    slug: "kippr",
    name: "Kippr",
    category: "mobile",
    platform: "iOS & Android",
    shortDesc:
      "Kippr is an offline-first pantry tracker and inventory mobile application. It helps you easily manage your kitchen stock, reduce food waste, save money, and organize your groceries right from your phone.",
    techStack: ["Flutter", "PowerSync", "SQLite", "Supabase", "Riverpod"],
    longDesc:
      "Kippr is an offline-first pantry tracking mobile application engineered with Flutter. Built on a local-first architecture using PowerSync, SQLite, and Supabase, it ensures flawless offline utility with real-time cloud synchronization. The app maximizes user efficiency by integrating Mobile Scanner, Google MLKit OCR, and the OpenFoodFacts API for smart barcode and receipt scanning. State management is handled via Riverpod, while local data uses Hive CE. Complete with RevenueCat monetization, automated expiry alerts, and Firebase analytics, Kippr delivers a scalable, production-ready SaaS product.",
    caseStudy: {
      challenge:
        "Grocery runs and kitchen storage areas frequently suffer from poor connectivity, yet household inventory tools fail the moment logging groceries takes longer than putting them away. The app had to record items instantly across fridge, freezer, and pantry lists while keeping shared household stock synced among family members and roommates.",
      architecture:
        "Combines a local-first SQLite store and Hive CE cache with PowerSync bidirectional replication to a Supabase backend, letting every write commit offline immediately and converge once a network connection returns. On the capture pipeline, camera barcode frames pass through Mobile Scanner and OpenFoodFacts product lookup alongside on-device Google MLKit OCR for receipt parsing.",
      highlights: [
        "Delivers instant local reads and writes for shared household pantries that stay responsive offline without data loss.",
        "Speeds up grocery logging by pairing barcode product resolution with on-device receipt text recognition instead of manual form entry.",
        "Coordinates proactive expiry notifications, household sharing, Firebase usage telemetry, and RevenueCat subscription entitlements through Riverpod state providers.",
      ],
    },
    links: [
      {
        disabled: false,
        text: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.lapwingsoftware.kippr",
        role: "primary",
      },
      {
        disabled: false,
        text: "App Store",
        href: "https://apps.apple.com/pl/app/kippr-pantry-tracker/id6761077705",
        role: "primary",
      },
    ],
    buttonInfo: {
      text: "Read more",
      aria: "Check the details of Kippr",
      type: "button",
    },
    imagesInFormat: "3:4",
  },
  {
    slug: "storis",
    name: "Storis",
    category: "mobile",
    platform: "iOS App • Edge AI",
    shortDesc:
      "Storis is a mobile platform transforming interactive storytelling via edge AI. It leverages on-device machine learning to trigger dynamic, real-time audio soundscapes as a user reads aloud.",
    techStack: ["Flutter", "Sherpa ONNX", "Supabase", "Riverpod", "RevenueCat"],
    longDesc:
      "Storis is an interactive mobile platform transforming digital storytelling via Flutter. Built on the Sherpa ONNX engine for edge AI alongside record and audioplayers, it triggers real-time audio soundscapes as a user reads aloud. Designed for scale, the architecture pairs Riverpod for state management with Supabase for cloud data and seamless Google/Apple authentication. With RevenueCat integration for subscription monetization, Envied for asset security, and SharedPreferences caching, Storis stands as a production-ready SaaS product at the intersection of AI and edutainment.",
    caseStudy: {
      challenge:
        "Sending live voice audio to cloud speech APIs during bedtime reading introduces noticeable network latency, drains battery, and forces families to stream microphone streams off-device. Audio cues needed to trigger accurately against spoken phrases in real time right on the phone while preserving calm, customizable reading screens.",
      architecture:
        "Pairs low-overhead microphone capture via record with local speech-cue inference inside the Sherpa ONNX runtime, routing detected triggers straight into audioplayers soundscape channels without cloud speech round-trips. Riverpod coordinates library state across Supabase cloud storage and Apple/Google Sign-In, backed by RevenueCat entitlements, Envied build-time secrets, and SharedPreferences caching.",
      highlights: [
        "Executes edge speech-cue detection locally via Sherpa ONNX for minimal audio lag and on-device voice privacy.",
        "Synchronizes spoken narration with dynamic soundscape playback alongside light/dark reading themes and adjustable typography.",
        "Delivers full production SaaS infrastructure including OAuth authentication, iOS subscription management, local state persistence, and Envied secret handling.",
      ],
    },
    links: [
      {
        disabled: false,
        text: "App Store",
        href: "https://apps.apple.com/us/app/storis-bedtime-stories/id6773403059",
        role: "primary",
      },
      {
        disabled: true,
        text: "Google Play (Coming soon)",
        href: "",
        role: "secondary",
      },
    ],
    buttonInfo: {
      text: "Read more",
      aria: "Check the details of Storis",
      type: "button",
    },
    imagesInFormat: "3:4",
  },
  {
    slug: "knowla-web",
    name: "Knowla - Web",
    category: "web",
    platform: "Interactive Web Platform",
    shortDesc:
      "Knowla - Web is an interactive platform that supports children with disabilities through game-based learning. Using multimedia and gamification, it boosts cognitive skills, creativity, and problem-solving.",
    techStack: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    longDesc:
      "The goal of this project was to develop a fully functional and high-performance web platform that replicates the capabilities of Knoocker's desktop application. Built from the ground up using Next.js, TypeScript, Prisma, and Tailwind, this website delivers a seamless and intuitive user experience. As the only developer for most of the time, I was responsible for the development process, ensuring feature parity with the desktop application.",
    caseStudy: {
      challenge:
        "Knoocker's interactive educational software was originally tied to dedicated desktop setups, limiting where classrooms and families could run exercises. Bringing that catalog to standard web browsers required matching the desktop experience across screens while keeping controls accessible for children with diverse cognitive and motor needs.",
      architecture:
        "Engineered as a typed Next.js and TypeScript application over a Prisma data layer structuring thematic learning Planets (such as Planet Fruu, Planet Pi, Planet Emo, Planet Contrast, Planet Quizy, and multilingual hubs) alongside fast search filtering and responsive Tailwind CSS layouts. Maintained architecture and end-to-end delivery largely solo to ensure parity with the desktop release.",
      highlights: [
        "Brought zero-install browser parity to Knoocker's desktop suite so educators and learners can open activities from any modern device.",
        "Structured dozens of cognitive, sensory, and language modules into browsable Planets with direct search access through Prisma models.",
        "Carried full-stack implementation across schema modeling, UI engineering, and accessibility polish primarily as sole developer.",
      ],
    },
    links: [
      {
        disabled: true,
        text: "Private client platform",
        href: "",
        role: "primary",
      },
    ],
    buttonInfo: {
      text: "Read more",
      aria: "Check the details of Knowla Web",
      type: "button",
    },
    imagesInFormat: "1:1",
  },
];
