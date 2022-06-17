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
import PrivateRoute from "./PrivateRoute"
import HomeScreen from "./pages/HomeScreen";
import PublicRoute from "./PublicRoute";
import Navbar from "./components/Navbar";
import { SpinnerCircularFixed } from "spinners-react";
import userSlice, { getUser } from "./features/userSlice";
import { loadUser } from "./features/authSlice";

function App() {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.authState)
  const userState = useSelector((state) => state.userState)

  React.useEffect(() => {
    // dispatch(getUser(authState.id))
    dispatch(loadUser())
  }, [dispatch])

  // useEffect(() => {  
  //   return () => {
  //     localStorage.clear()
  //   }
  // })

  return (
    <Router>
      {userState.getUserStatus === "loading" && (
        <div class="flex items-center justify-center">
          <SpinnerCircularFixed
            size={50}
            thickness={100}
            speed={100}
            color="#36ad47"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        </div>
      )}
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Navbar />
            <HomeScreen />
          </PrivateRoute>
        } />
        {/* <Route path="/pending" element={
          <PrivateRoute>
            <Navbar />
            <PendingPage />
          </PrivateRoute>
        } /> */}
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
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
