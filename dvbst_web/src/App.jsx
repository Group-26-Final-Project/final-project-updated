// import { makeStyles } from "@material-ui/core";
// import { purple } from "@material-ui/core/colors";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RegistrationPage from "./pages/RegistrationPage";
import AfterRegistration from "./pages/AfterRegistration";
import AfterLogin from "./pages/AfterLogin";
import VerifyLogin from "./pages/VerifyLogin";
import PrivateRoute from "./PrivateRoute"
import HomeScreen from "./pages/HomeScreen";
import PublicRoute from "./PublicRoute";
import Navbar from "./components/Navbar";
import { getUser } from "./features/userSlice";

function App() {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.authState)

  console.log("Here")
  React.useEffect(() => {
    dispatch(getUser(authState.id))
  }, [dispatch, authState.id])

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
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
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
        <Route path="/verify" element={
          <PublicRoute>
            <AfterLogin />
          </PublicRoute>
        } />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/after" element={<AfterRegistration />} /> */}
        <Route path="/login/enter/:email/:link" exact element={<VerifyLogin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
