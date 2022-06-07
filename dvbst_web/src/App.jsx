// import { makeStyles } from "@material-ui/core";
// import { purple } from "@material-ui/core/colors";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Login from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import AfterRegistration from "./pages/AfterRegistration";
import VerifyLogin from "./pages/VerifyLogin";
import PrivateRoute from "./PrivateRoute"
import HomeScreen from "./pages/HomeScreen";
import PublicRoute from "./PublicRoute";

function App() {
  const authState = useSelector((state) => state.authState)

  // useEffect(() => {  
  //   return () => {
  //     localStorage.clear()
  //   }
  // })

  return authState.isLoggedIn ? (
    <Router>
      <Routes>
      </Routes>
    </Router>
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <HomeScreen />
          </PrivateRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <RegistrationPage />
          </PublicRoute>
        } />
        <Route path="/after" element={
          <PublicRoute>
            <AfterRegistration />
          </PublicRoute>
        } />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/after" element={<AfterRegistration />} /> */}
        <Route path="/login/enter/:email/:link" exact element={<VerifyLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
