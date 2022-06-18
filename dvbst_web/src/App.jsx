// import { makeStyles } from "@material-ui/core";
// import { purple } from "@material-ui/core/colors";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Login from "./pages/Login";
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
import { getUser } from "./features/userSlice";

function App() {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.authState)
  const userState = useSelector((state) => state.userState)

  console.log("Here")
  // React.useEffect(() => {
  //   dispatch(getUser(authState.id))

  // }, [dispatch, authState.id])

  // useEffect(() => {  
  //   return () => {
  //     localStorage.clear()
  //   }
  // })

  return (
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
  );
}

export default App;
