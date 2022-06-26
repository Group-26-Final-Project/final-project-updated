// import { makeStyles } from "@material-ui/core";
// import { purple } from "@material-ui/core/colors";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Login from "./pages/Login";
import Result from "./pages/Result";
import PendingPage from "./pages/PendingPage";
import Profile from "./pages/Profile";
import RegistrationPage from "./pages/RegistrationPage";
import AfterRegistration from "./pages/AfterRegistration";
import AfterLogin from "./pages/AfterLogin";
import VerifyLogin from "./pages/VerifyLogin";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ConfirmCodePage from "./pages/ConfirmCodePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AfterResetPassword from "./pages/AfterResetPassword";
import PrivateRoute from "./PrivateRoute"
import HomeScreen from "./pages/HomeScreen";
import Navbar from "./components/Navbar";
import Ideas from "./pages/Ideas";
import VotingUnderway from "./pages/VotingUnderway";
import VotePage from "./pages/VotePage";
import VerifyVoteMagic from "./pages/VerifyVoteMagic"
import PreVoting from "./pages/PreVoting";
import CandidateProfilePage from "./pages/CandidateProfilePage";
import RequestPage from "./pages/RequestPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.authState)
  const userState = useSelector((state) => state.userState)

  console.log("Here")
  // useEffect(() => {  
  //   return () => {
  //     localStorage.clear()
  //   }
  // })

  return (
    <div>
       <ToastContainer
        progressClassName="w-10 h-10"
        bodyClassName="w-10 h-10"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <Router>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Navbar />
            <HomeScreen />
          </PrivateRoute>
        } />
        <Route path="/pending" element={
          <PrivateRoute>
            <Navbar />
            <PendingPage />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/auth/Result" element={
          <PrivateRoute>
            <Navbar />
            <Result />
          </PrivateRoute>
        } />
        <Route path="/auth/ideas" element={
          <PrivateRoute>
            <Navbar />
            <Ideas />
          </PrivateRoute>
        } />
        
        <Route path="/auth/PreVoting" element={
          <PrivateRoute>
            <Navbar />
            <PreVoting />
          </PrivateRoute>
        } />
        <Route path="/candidate_list" element={
          <PrivateRoute>
            <Navbar />
            <VotePage />
          </PrivateRoute>
        } />
        <Route path="/candidateProfile" element={
          <PrivateRoute>
            <Navbar />
            <CandidateProfilePage />
          </PrivateRoute>
        } />
          <Route path="/requests/add" element={
          <PrivateRoute>
            <Navbar />
            <RequestPage />
          </PrivateRoute>
        } />
        <Route path="/verify/:email/:link" element={
          <PrivateRoute>
            <VerifyVoteMagic />
          </PrivateRoute>
        } />
        <Route path="/forgot" element={
          <ForgotPasswordPage />
        } />
        <Route path="/reset" element={
          <ResetPasswordPage />
        } />
        <Route path="/confirm" element={
          <ConfirmCodePage />
        } />
        <Route path="/reset/success" element={
          <AfterResetPassword />
        } />
        <Route path="/login" element={
          <Login />
        } />
        <Route path="/signup" element={
          <RegistrationPage />
        } />
        <Route path="/after" element={
          <AfterRegistration />
        } />
        <Route path="/verify" element={
          <AfterLogin />
        } />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/after" element={<AfterRegistration />} /> */}
        <Route path="/login/enter/:email/:link" exact element={<VerifyLogin />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
    </div>

  );
}

export default App;
