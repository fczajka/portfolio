import { Dispatch } from "react";

export interface IsLightProps {
  isLight: boolean;
  setIsLight: Dispatch<React.SetStateAction<boolean>>;
}
