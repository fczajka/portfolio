import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";

export type ProjectProps = {
    name: string;
    shortDesc: string;
    longDesc: string;
    image: StaticImageData;
    links: {
        text: string;
        href: string;
    }[];
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
