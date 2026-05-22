import type { BrandTheme, Step } from "../types";

export interface CustomLayoutProps {
  step: Step;
  theme?: BrandTheme;
  rejectedChoiceId: string | null;
  onChoice: (choiceId: string) => void;
}

export type CustomLayoutComponent = React.FC<CustomLayoutProps>;
