// import { makeStyles } from "@material-ui/core";
// import { purple } from "@material-ui/core/colors";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Login from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import AfterRegistration from "./pages/AfterRegistration";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/after" element={<AfterRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
