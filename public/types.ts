import { StaticImageData } from "next/image";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { IconType } from "react-icons";

export type ProjectProps = {
  name: string;
  shortDesc: string;
  longDesc: string;
  images: MyWorkPhotos;
  links: {
    text: string;
    href: string;
  }[];
  animationDelay: string;
  buttonInfo: {
    text: string;
    aria?: string;
    type: string;
    style?: string;
  };
};

export type MenuProps = {
  wantsToSee: boolean;
  handleMenu: () => void;
};

export type MobileMenuProps = {
  isOpen: boolean;
  handleMenu: () => void;
};

export type MenuLinksProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type ProjectDetailsProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  longDesc: string;
  images: MyWorkPhotos;
  links: {
    text: string;
    href: string;
  }[];
};

export type UseElementOnScreenProps = {
  root: HTMLDivElement | null;
  rootMargin: string;
  threshold: number;
};

export type TextAndImageProps = {
  h1: string;
  paragraph: string;
  image: StaticImageData;
  imageDark: StaticImageData;
};

export type ScrollProps = {
  letters: string[];
};

export type PanelProps = {
  headline: string;
  desc: string;
};

export type FoodsProps = {
  foods: {
    name: string;
    image: StaticImageData;
    alt: string;
  }[];
};

export type FoodProps = {
  food: {
    name: string;
    image: StaticImageData;
    alt: string;
  };
  delay: string;
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

export type SliderProps = { images: MyWorkPhotos };

export type ImagesProps = { images: MyWorkPhotos; currentIndex: number };

export type ButtonsProps = {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
};

export type IndicatorsProps = { indexes: number[]; currentIndex: number };

export type FormValidationProps = {
  name: string;
  message: string;
  mail: string;
};

export type FormValidationReturn = { status: string; message: string };

export type InputsAndLabelsProps = {
  form: Form;
  isVisible: boolean;
};

export type Form = {
  label: string;
  htmlFor: string;
  type: string | null;
}[];

export type ButtonProps = {
  text: string;
  callback?: () => void;
  aria?: string;
  type: string;
  href?: string;
  style?: string;
};

export type MutableRef = MutableRefObject<HTMLDivElement | null>;

export type SetStateActionBoolean = (
  value: React.SetStateAction<boolean>,
) => void;
