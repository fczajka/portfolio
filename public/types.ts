import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

export type ProjectProps = {
    name: string;
    shortDesc: string;
    longDesc: string;
    image: StaticImageData;
    links: {
        text: string;
        href: string;
    }[];
    animationDelay: string;
};

export type MenuProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type ProjectDetailsProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    name: string;
    longDesc: string;
    image: StaticImageData;
    links: {
        text: string;
        href: string;
    }[];
};

export type customHookOptions = {
    root: HTMLDivElement | null;
    rootMargin: string;
    threshold: number;
};

export type TextAndImageProps = {
    h1: string;
    paragraph: string;
    image: StaticImageData;
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

export type LinksProps = {
    links: {
        text: string;
        href: string;
        icon: IconType;
    }[];
    isVisible: boolean;
};

export type FormProps = {
    form: (
        | {
              label: string;
              htmlFor: string;
              type: string;
          }
        | {
              label: string;
              htmlFor: string;
              type: null;
          }
    )[];
    button: {
        text: string;
    };
    isVisible: boolean;
};
