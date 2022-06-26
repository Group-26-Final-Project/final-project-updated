import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import PendingPage from "./pages/PendingPage";
import { useDispatch } from "react-redux";
import { getUser } from "./features/userSlice";
import { SpinnerCircularFixed } from "spinners-react";
import Login from "./pages/Login";
import PendingNavbar from "./components/PendingNavbar";

function PrivateRoute({ children }) {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.authState)
  const userState = useSelector((state) => state.userState)

  useEffect(() => {
    dispatch(getUser(authState.id))
  }, [dispatch, authState.id])

  useEffect(() => {
    localStorage.getItem("token")
  }, [])

  return (
    <>
      {userState.getUserStatus === 'pending' && (
        <div class="flex flex-col items-center justify-center min-h-screen bg-white">
          <div class="flex items-center justify-center">
            <SpinnerCircularFixed
              size={50}
              thickness={100}
              speed={100}
              color="#36ad47"
              secondaryColor="rgba(0, 0, 0, 0.44)"
            />
          </div>
        </div>
      )}
      {userState.getUserStatus !== 'pending' && (
        <>
          {/* {authState.token ? (userState.user.approved ? children : <Navigate to="/pending" replace/>) : <Navigate to="/login" replace/>}; */}
          {authState.token ? children : <><Login /></>};
          {/* {authState.token ? (userState.user?.approved ? children : <><PendingNavbar /><PendingPage /> </>) : <><Login /></>}; */}
        </>
      )}
    </>
  )

}

export default PrivateRoute;
