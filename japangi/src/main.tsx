import { QueryClientProvider } from "@tanstack/react-query";
import { TDSMobileAITProvider } from "@toss/tds-mobile-ait";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import config from "../granite.config.ts";
import App from "./App.tsx";
import { CurrentUserProvider } from "./hooks/useCurrentUser.ts";
import { FontSizeProvider } from "./hooks/useFontSize.ts";
import { HighContrastProvider } from "./hooks/useHighContrast.ts";
import { TtsProvider } from "./hooks/useTts.ts";
import "./index.css";
import { queryClient } from "./lib/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TDSMobileAITProvider brandPrimaryColor={config.brand.primaryColor}>
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <FontSizeProvider>
            <HighContrastProvider>
              <TtsProvider>
                <App />
              </TtsProvider>
            </HighContrastProvider>
          </FontSizeProvider>
        </CurrentUserProvider>
      </QueryClientProvider>
    </TDSMobileAITProvider>
  </StrictMode>,
);
