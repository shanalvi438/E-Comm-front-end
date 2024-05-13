import { createContext } from "react";

interface ContextProps {
  compareItems: any;
  addToCompare: Function;
  removeFromComapre: Function;
  clickCounts: Record<string, number>;
}

export const CompareContext = createContext({} as ContextProps);
