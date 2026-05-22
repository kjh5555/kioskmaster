// Using BrowserRouter: Apps in Toss WebView renders in a full browser context
// and supports the HTML5 History API, so BrowserRouter is appropriate.
// If the WebView environment ever requires hash-based routing, swap to HashRouter.
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "./features/home/HomePage";
import { BrandSelectPage } from "./features/scenarios/BrandSelectPage";
import { ScenarioCompletePage } from "./features/scenarios/ScenarioCompletePage";
import { ScenarioIntroPage } from "./features/scenarios/ScenarioIntroPage";
import { ScenarioStepPage } from "./features/scenarios/ScenarioStepPage";
import { SettingsPage } from "./features/settings/SettingsPage";
import { useHardwareBack } from "./hooks/useHardwareBack";

function RouterChrome(): React.ReactElement {
  useHardwareBack();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/scenario/:categoryId/brand" element={<BrandSelectPage />} />
      <Route
        path="/scenario/:categoryId/:brandId/intro"
        element={<ScenarioIntroPage />}
      />
      <Route
        path="/scenario/:categoryId/:brandId/step"
        element={<ScenarioStepPage />}
      />
      <Route
        path="/scenario/:categoryId/:brandId/complete"
        element={<ScenarioCompletePage />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <RouterChrome />
    </BrowserRouter>
  );
}

export default App;
