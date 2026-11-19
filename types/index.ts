import type { StaticImageData } from "next/image";
import type { Dispatch, SetStateAction } from "react";
import type { IconType } from "react-icons";

export type Locale = "en" | "pl";

export type ImageFormat = "3:4" | "1:1";

export type ProjectCategory = "web" | "mobile";

export type ProjectLink = {
  text: string;
  href: string;
  disabled?: boolean;
  role?: "primary" | "secondary";
};

export type ProjectCaseStudy = {
  challenge: string;
  architecture: string;
  highlights: string[];
};

export type ProjectItem = {
  name: string;
  category: ProjectCategory;
  platform: string;
  shortDesc: string;
  techStack: string[];
  longDesc: string;
  caseStudy: ProjectCaseStudy;
  images: MyWorkPhotos;
  links: ProjectLink[];
  buttonInfo: {
    text: string;
    aria?: string;
    type: "button";
    style?: string;
  };
  logo: StaticImageData;
  imagesInFormat: ImageFormat;
};

export type TimelineIconKey =
  "enterprise" | "code" | "web" | "mobile" | "ai" | "education";

export type ExperienceSubRole = {
  title: string;
  period: string;
  workMode?: string;
  description: string;
};

export type ExperienceMilestone = {
  step: string;
  eyebrow: string;
  title: string;
  period?: string;
  location?: string;
  description: string;
  roles?: ExperienceSubRole[];
  highlights: string[];
  logo?: StaticImageData;
  logoAlt?: string;
  icon?: TimelineIconKey;
};

export type CoreStackGroup = {
  category: string;
  items: string[];
};

export type ExperienceSnapshot = {
  headline: string;
  summary: string;
  cv: {
    label: string;
    href: string;
    downloadUrl?: string;
  };
  coreStack: CoreStackGroup[];
  milestones: ExperienceMilestone[];
};

export type ProjectProps = {
  name: string;
  category: ProjectCategory;
  platform: string;
  shortDesc: string;
  techStack: string[];
  longDesc: string;
  images: MyWorkPhotos;
  links: ProjectLink[];
  animationDelay: string;
  buttonInfo: {
    text: string;
    aria?: string;
    type: "button";
    style?: string;
  };
  logo: StaticImageData;
  imagesInFormat: ImageFormat;
  onOpen?: () => void;
};

export type MenuProps = {
  wantsToSee: boolean;
  handleMenu: () => void;
};

export type MobileMenuProps = {
  isOpen: boolean;
  handleMenu: () => void;
};

export type ProjectDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  slug: string;
  platform?: string;
  longDesc: string;
  techStack: string[];
  images: MyWorkPhotos;
  links: ProjectLink[];
  imagesInFormat: ImageFormat;
};

export type UseElementOnScreenProps = {
  root: HTMLDivElement | null;
  rootMargin: string;
  threshold: number;
};

export type HeroCta = {
  text: string;
  href: string;
  variant: "primary" | "secondary";
};

export type TextAndImageProps = {
  h1: string;
  paragraph: string;
  ctas: HeroCta[];
};

export type PanelProps = {
  headline: string;
  desc: string;
};

export type FoodItem = {
  id: string;
  name: string;
  image: StaticImageData;
  alt: string;
  tagline: string;
  story: string;
  prepNote: string;
  highlights: string[];
};

export type FoodsProps = {
  foods: FoodItem[];
};

export type FoodProps = {
  food: FoodItem;
  delay: string;
  onOpen?: (food: FoodItem) => void;
};

export type LinksProps = {
  links: {
    href: string;
    icon: IconType;
    type: string;
  }[];
};

export type LinkProps = {
  href: string;
  icon: IconType;
  type: string;
  delay: string;
  isVisible: boolean;
};

export type MobileNavbarLinkProps = {
  text: string;
  href: string;
  icon: IconType;
  onClick?: () => void;
};

export type FormProps = {
  form: Form;
  button: {
    text: string;
  };
};

export type MyWorkPhotos = {
  image: StaticImageData;
  alt: string;
}[];

export type SliderProps = {
  images: MyWorkPhotos;
  imagesInFormat: ImageFormat;
  projectName?: string;
  isLightboxOpen?: boolean;
  onLightboxChange?: Dispatch<SetStateAction<boolean>>;
  immediate?: boolean;
};

export type ImagesProps = {
  images: MyWorkPhotos;
  currentIndex: number;
  imagesInFormat: ImageFormat;
  onExpand?: () => void;
};

export type ButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
};

export type IndicatorsProps = {
  indexes: number[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
};

export type FormValidationProps = {
  name: string;
  message: string;
  mail: string;
};

export type FormValidationReturn = { status: string; message: string };

export type FormFieldName = "senderName" | "email" | "message";

export type FormFieldErrors = Partial<Record<FormFieldName, string>>;

export type ContactPayload = {
  senderName: string;
  email: string;
  message: string;
  company?: string;
};

export type InputsAndLabelsProps = {
  form: Form;
  isVisible: boolean;
  errors: FormFieldErrors;
  onClearError: (field: FormFieldName) => void;
};

export type Form = {
  label: string;
  htmlFor: FormFieldName;
  type: string | null;
  autoComplete?: string;
  maxLength?: number;
}[];

type ButtonCommonProps = {
  text: string;
  aria?: string;
  style?: string;
  disabled?: boolean;
};

export type ButtonProps = ButtonCommonProps &
  (
    | {
        type: "button";
        callback: () => void;
        href?: never;
      }
    | {
        type: "link";
        href: string;
        callback?: never;
      }
  );
