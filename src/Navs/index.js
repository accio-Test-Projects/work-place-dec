import * as React from "react";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import LandingPage from "../components/pages/LandingPage";
import AuthenticationPage from "../components/pages/AuthenticationPage";
import CandidateOnboarding from "../components/pages/candidate/CandidateOnboarding";
import CandidateProfile from "../components/pages/candidate/CandidateProfile";
import CandidateJobs from "../components/pages/candidate/CandidateJobs";
import CandidateApplication from "../components/pages/candidate/CandidateApplication";
import CandidateConversation from "../components/pages/candidate/CandidateConversation";
import EmployerOnboarding from "../components/pages/employerPages/EmployerOnboarding";
import EmployerProfile from "../components/pages/employerPages/EmployerProfile";
import EmployerJobs from "../components/pages/employerPages/EmployerJobs";
import EmployerApplicants from "../components/pages/employerPages/EmployerApplicants";
import EmployerConversation from "../components/pages/employerPages/EmployerConversation";
import EmployerHoc from "../HOC/EmployerHoc";
import CandidateHoc from "../HOC/CandidateHoc";

function Navs() {
  const ProtectedCandidateRoutes = () => {
    if (false) {
      return <Outlet />;
    } else {
      return <Navigate to="/candidate/auth" />;
    }
  };
  const ProtectedEmployerRoutes = () => {
    if (false) {
      return <Outlet />;
    } else {
      return <Navigate to="/employer/auth" />;
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />;
        <Route
          path="/candidate/auth"
          element={<AuthenticationPage type="candidate" />}
        />
        {/* <Route element={<ProtectedCandidateRoutes />}> */}
        <Route path="/candidate/onboarding" element={<CandidateOnboarding />} />
        <Route
          path="/candidate/profile"
          element={
            <CandidateHoc>
              <CandidateProfile />
            </CandidateHoc>
          }
        />
        <Route
          path="/candidate/jobs"
          element={
            <CandidateHoc>
              <CandidateJobs />
            </CandidateHoc>
          }
        />
        <Route
          path="/candidate/applications"
          element={
            <CandidateHoc>
              <CandidateApplication />
            </CandidateHoc>
          }
        />
        <Route
          path="/candidate/conversation"
          element={
            <CandidateHoc>
              <CandidateConversation />
            </CandidateHoc>
          }
        />
        {/* </Route> */}
      </Routes>
      <Routes>
        <Route
          path="/employer/auth"
          element={<AuthenticationPage type="employer" />}
        />
        {/* <Route element={<ProtectedEmployerRoutes />}> */}

        <Route path="/employer/onboarding" element={<EmployerOnboarding />} />

        <Route
          path="/employer/profile"
          element={
            <EmployerHoc>
              <EmployerProfile />
            </EmployerHoc>
          }
        />
        <Route
          path="/employer/jobs"
          element={
            <EmployerHoc>
              <EmployerJobs />
            </EmployerHoc>
          }
        />
        <Route
          path="/employer/applicants"
          element={
            <EmployerHoc>
              <EmployerApplicants />
            </EmployerHoc>
          }
        />
        <Route
          path="/employer/conversation"
          element={
            <EmployerHoc>
              <EmployerConversation />
            </EmployerHoc>
          }
        />
      </Routes>

      {/* </Route> */}
    </Router>
  );
}

export default Navs;
