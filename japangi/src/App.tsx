// Using BrowserRouter: Apps in Toss WebView renders in a full browser context
// and supports the HTML5 History API, so BrowserRouter is appropriate.
// If the WebView environment ever requires hash-based routing, swap to HashRouter.
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AdminBrandRequestsPage } from "./features/admin/AdminBrandRequestsPage";
import { MasterPage } from "./features/master/MasterPage";
import { GuardianCuratePage } from "./features/family/GuardianCuratePage";
import { GuardianPairingPage } from "./features/family/GuardianPairingPage";
import { ParentPairingPage } from "./features/family/ParentPairingPage";
import { GuardianHomePage } from "./features/guardian/GuardianHomePage";
import { GuardianParentReportPage } from "./features/guardian/GuardianParentReportPage";
import { HomePage } from "./features/home/HomePage";
import { BrandRequestPage } from "./features/requests/BrandRequestPage";
import { RoleSelectPage } from "./features/role/RoleSelectPage";
import { BrandSelectPage } from "./features/scenarios/BrandSelectPage";
import { ScenarioCompletePage } from "./features/scenarios/ScenarioCompletePage";
import { ScenarioIntroPage } from "./features/scenarios/ScenarioIntroPage";
import { ScenarioStepPage } from "./features/scenarios/ScenarioStepPage";
import { SettingsPage } from "./features/settings/SettingsPage";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { useHardwareBack } from "./hooks/useHardwareBack";

function RouterChrome(): React.ReactElement {
  useHardwareBack();
  const { role, roleConfirmed } = useCurrentUser();

  // First-launch gate: until the user has explicitly picked a role we show
  // the role-select page in place of the home routes. Admin routes are
  // exempt because operators may open them directly via URL.
  if (!roleConfirmed) {
    return (
      <Routes>
        <Route path="/role-select" element={<RoleSelectPage />} />
        <Route
          path="/admin/brand-requests"
          element={<AdminBrandRequestsPage />}
        />
        <Route path="/master" element={<MasterPage />} />
        <Route path="*" element={<Navigate to="/role-select" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          role === "guardian" ? (
            <Navigate to="/guardian" replace />
          ) : (
            <HomePage />
          )
        }
      />
      <Route path="/role-select" element={<RoleSelectPage />} />
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
      <Route path="/pair" element={<ParentPairingPage />} />
      <Route path="/guardian" element={<GuardianHomePage />} />
      <Route path="/guardian/pair" element={<GuardianPairingPage />} />
      <Route
        path="/guardian/parent/:parentExternalId"
        element={<GuardianParentReportPage />}
      />
      <Route
        path="/guardian/parent/:parentExternalId/curate"
        element={<GuardianCuratePage />}
      />
      <Route path="/requests" element={<BrandRequestPage />} />
      <Route
        path="/admin/brand-requests"
        element={<AdminBrandRequestsPage />}
      />
      <Route path="/master" element={<MasterPage />} />
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
