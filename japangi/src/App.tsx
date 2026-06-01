// Using BrowserRouter: Apps in Toss WebView renders in a full browser context
// and supports the HTML5 History API, so BrowserRouter is appropriate.
// If the WebView environment ever requires hash-based routing, swap to HashRouter.
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AdminBrandRequestsPage } from "./features/admin/AdminBrandRequestsPage";
import { MasterPage } from "./features/master/MasterPage";
import { FeedbackPage } from "./features/feedback/FeedbackPage";
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
import { useHardwareBack } from "./hooks/useHardwareBack";

function RouterChrome(): React.ReactElement {
  useHardwareBack();

  // PRD N9 (2026-06-01): 노인 본인 단독 사용 전제로 회귀. 첫 진입은 무조건
  // 노인 홈(/). RoleSelect 게이트는 제거되었고, /role-select 는 deep link 로만
  // 보호자가 직접 진입할 때 사용한다.
  return (
    <Routes>
      {/* `/` is always the elderly home. Guardians explicitly navigate to
          /guardian (e.g. from settings, the master page, or a deep link). */}
      <Route path="/" element={<HomePage />} />
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
      <Route path="/feedback" element={<FeedbackPage />} />
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
