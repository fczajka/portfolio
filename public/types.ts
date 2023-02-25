import { Dispatch, SetStateAction } from "react";

export type ProjectProps = { name: string; desc: string };

export type MenuProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};
