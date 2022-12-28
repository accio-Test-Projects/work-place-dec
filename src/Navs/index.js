import React , {useContext}from "react";
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
import {userContext} from '../context/userContext'
function Navs() {
  const [state,dispatch]=useContext(userContext)
  const isAuth  =state.isAuth;
  const userInfo=state.userInfo;
  const ProtectedCandidateRoutes = () => {
    if (isAuth&&userInfo?.type==='candidate') {
      console.log(isAuth)
      return <Outlet />;
    } else {
      return <Navigate to="/candidate/auth" />;
    }
  };
  const ProtectedEmployerRoutes = () => {
    if (isAuth&&userInfo?.type==='employer') {
      return <Outlet />;
    } else {
      return <Navigate to="/employer/auth" />;
    }
  };

  const OnboardingProtectedRoute=()=>{
    if(isAuth){
      return <Outlet/>
    }
    else{
      return <Navigate to="/" />
    }
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />;
        <Route
          path="/candidate/auth"
          element={<AuthenticationPage type="candidate" />}
        />
        <Route element={<OnboardingProtectedRoute/>}>
          <Route path="/candidate/onboarding" element={<CandidateOnboarding />} />
          </Route>
        <Route element={<ProtectedCandidateRoutes />}>
       
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
        </Route>
      </Routes>
      <Routes>
        <Route
          path="/employer/auth"
          element={<AuthenticationPage type="employer" />}
        />
         <Route element={<OnboardingProtectedRoute/>}>
          <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
         </Route>
        <Route element={<ProtectedEmployerRoutes />}>
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
          </Route>
      </Routes>

    
    </Router>
  );
}

export default Navs;
