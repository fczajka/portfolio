import type {
  ImageFormat,
  Locale,
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

type ProjectBaseConfig = {
  slug: string;
  name: string;
  category: ProjectCategory;
  techStack: string[];
  imagesInFormat: ImageFormat;
  linkTargets: Array<{
    href: string;
    disabled: boolean;
    role: "primary" | "secondary";
  }>;
};

type ProjectTranslation = {
  platform: string;
  shortDesc: string;
  longDesc: string;
  caseStudy: ProjectCaseStudy;
  linkTexts: string[];
  buttonText: string;
  buttonAria: string;
};

const PROJECT_BASE: ProjectBaseConfig[] = [
  {
    slug: "platterify",
    name: "Platterify",
    category: "web",
    techStack: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
    imagesInFormat: "1:1",
    linkTargets: [
      {
        disabled: false,
        href: "https://platterify.com/",
        role: "primary",
      },
    ],
  },
  {
    slug: "kippr",
    name: "Kippr",
    category: "mobile",
    techStack: ["Flutter", "PowerSync", "SQLite", "Supabase", "Riverpod"],
    imagesInFormat: "3:4",
    linkTargets: [
      {
        disabled: false,
        href: "https://play.google.com/store/apps/details?id=com.lapwingsoftware.kippr",
        role: "primary",
      },
      {
        disabled: false,
        href: "https://apps.apple.com/pl/app/kippr-pantry-tracker/id6761077705",
        role: "primary",
      },
    ],
  },
  {
    slug: "storis",
    name: "Storis",
    category: "mobile",
    techStack: ["Flutter", "Sherpa ONNX", "Supabase", "Riverpod", "RevenueCat"],
    imagesInFormat: "3:4",
    linkTargets: [
      {
        disabled: false,
        href: "https://apps.apple.com/us/app/storis-bedtime-stories/id6773403059",
        role: "primary",
      },
      {
        disabled: true,
        href: "",
        role: "secondary",
      },
    ],
  },
  {
    slug: "knowla-web",
    name: "Knowla - Web",
    category: "web",
    techStack: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    imagesInFormat: "1:1",
    linkTargets: [
      {
        disabled: true,
        href: "",
        role: "primary",
      },
    ],
  },
];

const PROJECT_TRANSLATIONS: Record<
  Locale,
  Record<string, ProjectTranslation>
> = {
  en: {
    platterify: {
      platform: "Live Web App",
      shortDesc:
        "Platterify is a real-time multiplayer hospitality platform for restaurants and bars. Guests scan table QR codes to browse digital menus, order collaboratively, and request bills in one tap, while staff manage live tables and kitchen tickets.",
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
      linkTexts: ["Live version"],
      buttonText: "Read more",
      buttonAria: "Check the details of Platterify",
    },
    kippr: {
      platform: "iOS & Android",
      shortDesc:
        "Kippr is an offline-first pantry tracker and inventory mobile application. It helps you easily manage your kitchen stock, reduce food waste, save money, and organize your groceries right from your phone.",
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
      linkTexts: ["Google Play", "App Store"],
      buttonText: "Read more",
      buttonAria: "Check the details of Kippr",
    },
    storis: {
      platform: "iOS App • Edge AI",
      shortDesc:
        "Storis is a mobile platform transforming interactive storytelling via edge AI. It leverages on-device machine learning to trigger dynamic, real-time audio soundscapes as a user reads aloud.",
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
      linkTexts: ["App Store", "Google Play (Coming soon)"],
      buttonText: "Read more",
      buttonAria: "Check the details of Storis",
    },
    "knowla-web": {
      platform: "Interactive Web Platform",
      shortDesc:
        "Knowla - Web is an interactive platform that supports children with disabilities through game-based learning. Using multimedia and gamification, it boosts cognitive skills, creativity, and problem-solving.",
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
      linkTexts: ["Private client platform"],
      buttonText: "Read more",
      buttonAria: "Check the details of Knowla Web",
    },
  },
  pl: {
    platterify: {
      platform: "Aplikacja webowa Live",
      shortDesc:
        "Platterify to platforma czasu rzeczywistego dla restauracji i barów. Goście skanują kod QR przy stoliku, aby przeglądać menu, zamawiać wspólnie i prosić o rachunek jednym kliknięciem, a obsługa zarządza stolikami i kuchnią na żywo.",
      longDesc:
        "Platterify to kompletny system operacyjny dla gastronomii zbudowany w oparciu o Next.js App Router, React 19, TypeScript i Tailwind CSS oraz Supabase (PostgreSQL z Row Level Security i Realtime). Goście skanują kod QR przy stoliku bez instalowania aplikacji, przeglądają menu z oznaczeniami alergenów, tworzą wspólne koszyki, dzielą rachunek i zgłaszają chęć płatności. Po stronie lokalu platforma oferuje system Kitchen Display System (KDS) na żywo z przełącznikami dostępności (86), interaktywną mapę sali, edytor menu CMS, kreator wydruków QR, raporty Z oraz obsługę języków EN/PL opartą na architekturze zero-trust.",
      caseStudy: {
        challenge:
          "Tradycyjna obsługa stolikowa traci płynność w trzech momentach: 10–15 minut oczekiwania na kartę i przyjęcie zamówienia, papierowe bony przekazywane na kuchnię oraz 15–20 minut czekania na rozliczenie lub podział rachunku — bez zmuszania lokalu do zakupu drogiego sprzętu ani płacenia prowizji od każdego zamówienia.",
        architecture:
          "System bazuje na wielodostępowych politykach PostgreSQL Row Level Security, które oddzielają anonimowe sesje QR przy stolikach od uwierzytelnionego personelu, a subskrypcje WebSocket synchronizują w czasie rzeczywistym stany stolików (Wolny, Zamawia, W trakcie) oraz kolejki stanowisk kuchennych (Nowe, W przygotowaniu, Gotowe). Walidacja po stronie serwera zabezpiecza edycję menu, statusy dostępności dań oraz dzienne raporty zamknięcia w wersjach EN i PL.",
        highlights: [
          "Eliminuje kolejki do zamawiania i płatności dzięki natychmiastowym sesjom QR w przeglądarce, wspólnym koszykom przy stoliku i dzieleniu rachunku jednym kliknięciem.",
          "Kieruje zamówienia posegregowane na stanowiska kuchenne wraz z wyraźnymi ostrzeżeniami o alergenach i szybką blokadą niedostępnych pozycji.",
          "Łączy interaktywny plan sali, kreator kodów QR do druku, edytor menu na żywo oraz raporty Z w jednym narzędziu przeglądarkowym bez przywiązania do dedykowanego sprzętu.",
        ],
      },
      linkTexts: ["Wersja live"],
      buttonText: "Zobacz więcej",
      buttonAria: "Zobacz szczegóły projektu Platterify",
    },
    kippr: {
      platform: "iOS i Android",
      shortDesc:
        "Kippr to mobilny tracker spiżarni i domowych zapasów działający w modelu offline-first. Pomaga łatwo kontrolować zawartość kuchni, ograniczać marnowanie żywności, oszczędzać pieniądze i organizować zakupy z poziomu telefonu.",
      longDesc:
        "Kippr to aplikacja mobilna do zarządzania domową spiżarnią stworzona we Flutterze w architekturze local-first z wykorzystaniem PowerSync, SQLite i Supabase, co zapewnia pełną niezawodność offline oraz synchronizację w chmurze w czasie rzeczywistym. Szybkie dodawanie produktów wspierają Mobile Scanner, Google MLKit OCR do odczytu paragonów oraz API OpenFoodFacts. Warstwę stanu obsługuje Riverpod, lokalne dane wspiera Hive CE, a całość uzupełniają subskrypcje RevenueCat, powiadomienia o terminach ważności i analityka Firebase.",
      caseStudy: {
        challenge:
          "Podczas zakupów i w domowych spiżarniach zasięg sieci bywa słaby, a aplikacje do inwentaryzacji przestają być używane, gdy wpisanie produktu trwa dłużej niż odłożenie go na półkę. Aplikacja musiała błyskawicznie zapisywać artykuły w lodówce, zamrażarce i szafkach oraz synchronizować wspólne zapasy między domownikami.",
        architecture:
          "Połączenie lokalnej bazy SQLite i pamięci podręcznej Hive CE z dwukierunkową replikacją PowerSync do backendu Supabase sprawia, że każdy zapis działa natychmiast offline i automatycznie uzgadnia stan po odzyskaniu połączenia. Moduł skanowania łączy odczyt kodów kreskowych przez Mobile Scanner i bazę OpenFoodFacts z rozpoznawaniem tekstu paragonów bezpośrednio na urządzeniu za pomocą Google MLKit OCR.",
        highlights: [
          "Zapewnia natychmiastowe odczyty i zapisy lokalne dla współdzielonych domowych spiżarni — bez utraty danych nawet całkowicie offline.",
          "Przyspiesza uzupełnianie zapasów, łącząc rozpoznawanie kodów kreskowych z lokalnym OCR paragonów zamiast ręcznego wpisywania formularzy.",
          "Koordynuje powiadomienia o kończącej się dacie ważności, współdzielenie gospodarstw domowych, telemetrię Firebase oraz subskrypcje RevenueCat przez Riverpod.",
        ],
      },
      linkTexts: ["Google Play", "App Store"],
      buttonText: "Zobacz więcej",
      buttonAria: "Zobacz szczegóły projektu Kippr",
    },
    storis: {
      platform: "Aplikacja iOS • Edge AI",
      shortDesc:
        "Storis to platforma mobilna odmieniająca interaktywne czytanie bajek dzięki Edge AI. Wykorzystuje uczenie maszynowe na urządzeniu, by w czasie rzeczywistym uruchamiać dynamiczne pejzaże dźwiękowe podczas głośnego czytania.",
      longDesc:
        "Storis to interaktywna platforma storytellingowa stworzona we Flutterze. W oparciu o silnik Sherpa ONNX do przetwarzania Edge AI oraz pakiety record i audioplayers aplikacja uruchamia dopasowane efekty i tła dźwiękowe w trakcie czytania na głos. Architektura łączy zarządzanie stanem w Riverpod z backendem Supabase oraz logowaniem Google i Apple. Integracja subskrypcji RevenueCat, zabezpieczenie zasobów przez Envied oraz lokalny cache SharedPreferences tworzą gotowy produkt SaaS na styku AI i edukacji.",
      caseStudy: {
        challenge:
          "Wysyłanie głosu na żywo do chmurowych API mowy podczas wieczornego czytania wprowadza wyczuwalne opóźnienia, szybciej rozładowuje baterię i wymaga przesyłania strumienia z mikrofonu poza urządzenie. Efekty dźwiękowe musiały reagować na wypowiadane frazy natychmiast na telefonie, przy zachowaniu spokojnego, konfigurowalnego interfejsu czytnika.",
        architecture:
          "Niskonarzutowe przechwytywanie dźwięku przez record współpracuje z lokalnym silnikiem detekcji fraz w Sherpa ONNX, kierując wykryte wyzwalacze bezpośrednio do kanałów audioplayers bez zapytań do chmury. Riverpod zarządza stanem biblioteki zsynchronizowanej z Supabase i logowaniem Apple/Google Sign-In, wspieranym przez subskrypcje RevenueCat, sekrety Envied i lokalny zapis w SharedPreferences.",
        highlights: [
          "Uruchamia rozpoznawanie słów kluczowych całkowicie lokalnie przez Sherpa ONNX dla minimalnych opóźnień i pełnej prywatności głosu.",
          "Synchronizuje głośną narrację z warstwą dźwiękową przy zachowaniu jasnego i ciemnego trybu czytania oraz regulowanej typografii.",
          "Dostarcza pełną infrastrukturę produkcyjną SaaS: uwierzytelnianie OAuth, subskrypcje iOS, lokalną trwałość stanu i ochronę kluczy Envied.",
        ],
      },
      linkTexts: ["App Store", "Google Play (Wkrótce)"],
      buttonText: "Zobacz więcej",
      buttonAria: "Zobacz szczegóły projektu Storis",
    },
    "knowla-web": {
      platform: "Interaktywna platforma webowa",
      shortDesc:
        "Knowla - Web to interaktywna platforma wspierająca dzieci z niepełnosprawnościami poprzez naukę przez zabawę. Wykorzystuje multimedia i grywalizację, rozwijając zdolności poznawcze, kreatywność oraz rozwiązywanie problemów.",
      longDesc:
        "Celem projektu było stworzenie w pełni funkcjonalnej i wydajnej platformy webowej odwzorowującej możliwości aplikacji desktopowej Knoocker. Zbudowana od podstaw w oparciu o Next.js, TypeScript, Prisma i Tailwind CSS, zapewnia płynne i intuicyjne korzystanie na różnych ekranach. Jako jedyny programista przez większość czasu trwania projektu odpowiadałem za jego realizację i pełną zgodność funkcjonalną z wersją desktopową.",
      caseStudy: {
        challenge:
          "Interaktywne oprogramowanie edukacyjne firmy Knoocker było wcześniej powiązane z dedykowanymi stanowiskami desktopowymi, co ograniczało dostępność zajęć w szkołach i domach. Przeniesienie całego katalogu do przeglądarki wymagało wiernego odwzorowania funkcji desktopowych i zadbania o wygodną obsługę dla dzieci o zróżnicowanych potrzebach poznawczych i motorycznych.",
        architecture:
          "Aplikacja powstała w Next.js i TypeScript z warstwą danych w Prisma, porządkującą tematyczne Planety edukacyjne (m.in. Planet Fruu, Planet Pi, Planet Emo, Planet Contrast, Planet Quizy oraz moduły językowe) wraz z szybkim wyszukiwaniem i responsywnym interfejsem w Tailwind CSS. Architektura i wdrożenie end-to-end były rozwijane głównie jednoosobowo.",
        highlights: [
          "Udostępniła pakiet edukacyjny Knoocker w przeglądarce bez instalacji, umożliwiając nauczycielom i uczniom uruchamianie ćwiczeń na dowolnym nowoczesnym urządzeniu.",
          "Uporządkowała dziesiątki modułów poznawczych, sensorycznych i językowych w przejrzyste Planety z bezpośrednim wyszukiwaniem opartym na modelach Prisma.",
          "Zrealizowana od modelowania schematu bazy danych po dopracowanie interfejsu i dostępności przede wszystkim jako jedyny deweloper.",
        ],
      },
      linkTexts: ["Prywatna platforma klienta"],
      buttonText: "Zobacz więcej",
      buttonAria: "Zobacz szczegóły projektu Knowla Web",
    },
  },
};

/** Returns project metadata localized for the requested language (`en` or `pl`). */
export function getProjectsMeta(locale: Locale = "en"): ProjectMeta[] {
  const translations = PROJECT_TRANSLATIONS[locale];

  return PROJECT_BASE.map((base) => {
    const copy = translations[base.slug];
    return {
      slug: base.slug,
      name: base.name,
      category: base.category,
      platform: copy.platform,
      shortDesc: copy.shortDesc,
      techStack: base.techStack,
      longDesc: copy.longDesc,
      caseStudy: copy.caseStudy,
      links: base.linkTargets.map((target, index) => ({
        disabled: target.disabled,
        href: target.href,
        role: target.role,
        text: copy.linkTexts[index] ?? "",
      })),
      buttonInfo: {
        text: copy.buttonText,
        aria: copy.buttonAria,
        type: "button",
      },
      imagesInFormat: base.imagesInFormat,
    };
  });
}

export const projectsMeta: ProjectMeta[] = getProjectsMeta("en");
