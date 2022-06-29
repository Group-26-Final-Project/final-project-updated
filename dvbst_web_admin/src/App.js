import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Voters from "./components/Voters";
// import VoterDetail from './components/VoterDetail';
import NewVoter from "./components/NewVoter";
import Candidates from "./components/Candidates";
import CandidateDetail from "./components/CandidateDetail";
import NewCandidate from "./components/NewCandidate";
// import Election from './components/Elections';
// import NewElection from './components/NewElection';
import Result from "./components/Result";
import ResultDetail from "./components/ResultDetail";
import Blacklist from "./components/Blacklist";
import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/authSlice";
import { AiOutlineMenu } from "react-icons/ai";
import Approval from "./components/Approval";
import approvalDetail from "./components/ApprovalDetail";
import PrivateRoute from "./PrivateRoute";
import { useEffect, useState } from "react";
import ApprovalDetail from "./components/ApprovalDetail";
import Phase from "./components/Phase";
import Navbar from "./components/Navbar";
import Notifications from "./components/Notification";
import ElectionDetail from "./components/ElectionDetail";

// <Router>
//   <div class="md:flex bg-[#D3E8E6]/20 h-screen">
//       <div>
//         <div class="bg-[#2F313D] text-white md:hidden">
//           <button class="p-4">
//             <AiOutlineMenu />
//           </button>
//         </div>
//         <div class="w-[25vw] inset-y-0 left-0 absolute transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
//           <Sidebar />
//         </div>
//       </div>
//       <div class="flex-1 h-screen md:overflow-y-auto">
//         <Routes>
//           <Route path="/" exact element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           } />
//           <Route path="/voters" element={
//             <PrivateRoute>
//               <Voters />
//             </PrivateRoute>
//           } />
//           <Route path="/candidates" element={
//             <PrivateRoute>
//               <Candidates />
//             </PrivateRoute>
//           } />
//           <Route path="/candidateDetail" element={
//             <PrivateRoute>
//               <CandidateDetail />
//             </PrivateRoute>
//           } />
//           <Route path="/voters/newvoter" element={
//             <PrivateRoute>
//               <NewVoter />
//             </PrivateRoute>
//           } />
//           <Route path="/candidates/newcandidate" element={
//             <PrivateRoute>
//               <NewCandidate />
//             </PrivateRoute>
//           } />
//           <Route path="/approval" element={
//             <PrivateRoute>
//               <Approval />
//             </PrivateRoute>
//           } />

//           {/* <Route path="/blacklist" element={
//           <PrivateRoute>
//             <Blacklist />
//           </PrivateRoute>
//         } />

//         <Route path="/elections" element={
//           <PrivateRoute>
//             <Election />
//           </PrivateRoute>
//         } />
//         <Route path="/elections/newelection" element={
//           <PrivateRoute>
//             <NewElection />
//           </PrivateRoute>
//         } />
//         <Route path="/results" element={
//           <PrivateRoute>
//             <Result />
//           </PrivateRoute>
//         } /> */}
//           <Route
//             path="*"
//             element={<Navigate to="/" replace />}
//           />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//   </div>
// </Router >

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authState);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, token]);

  return (
    <Router>
      <div className="md:flex bg-[#D3E8E6]/20 h-screen">
        {token && (
          <div>
            <div className="bg-[#2F313D] text-white md:hidden">
              <button className="p-4">
                <AiOutlineMenu />
              </button>
            </div>
            <div className="w-[25vw] inset-y-0 left-0 absolute transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
              <Sidebar />
            </div>
          </div>
        )}
        <div className={(token ? 'flex w-[75vw] flex-col"' : 'flex w-full flex-col"')}>
          <div className="flex-1 h-screen md:overflow-y-auto">
            <PrivateRoute>
              <Navbar />
            </PrivateRoute>
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/voters"
                element={
                  <PrivateRoute>
                    {/* <Navbar /> */}

                    <Voters />
                  </PrivateRoute>
                }
              />
              <Route
                path="/candidates"
                element={
                  <PrivateRoute>
                    <Candidates />
                  </PrivateRoute>
                }
              />
              <Route
                path="/candidateDetail"
                element={
                  <PrivateRoute>
                    <CandidateDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/voters/newvoter"
                element={
                  <PrivateRoute>
                    <NewVoter />
                  </PrivateRoute>
                }
              />
              <Route
                path="/candidates/newcandidate"
                element={
                  <PrivateRoute>
                    <NewCandidate />
                  </PrivateRoute>
                }
              />
              <Route
                path="/approval"
                element={
                  <PrivateRoute>
                    <Approval />
                  </PrivateRoute>
                }
              />
              <Route
                path="/approvalDetail"
                element={
                  <PrivateRoute>
                    <ApprovalDetail />
                  </PrivateRoute>
                }
              />

              <Route
                path="/blacklist"
                element={
                  <PrivateRoute>
                    <Blacklist />
                  </PrivateRoute>
                }
              />

              <Route
                path="/phase"
                element={
                  <PrivateRoute>
                    <Phase />
                  </PrivateRoute>
                }
              />

              {/* <Route path="/elections" element={
              <PrivateRoute>
                <Election />
              </PrivateRoute>
            } /> */}
              {/* <Route path="/elections/newelection" element={
              <PrivateRoute>
                <NewElection />
              </PrivateRoute>
            } /> */}
              <Route
                path="/results"
                element={
                  <PrivateRoute>
                    <Result />
                  </PrivateRoute>
                }
              />
              <Route
                path="/resultsDetail"
                element={
                  <PrivateRoute>
                    <ResultDetail />
                  </PrivateRoute>
                }
              />
              <Route
              path="/electionDetail"
              element={
                <PrivateRoute>
                  <ElectionDetail />
                </PrivateRoute>
              }
            />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route
                path="/login"
                element={token ? <Navigate to="/" replace /> : <Login />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );

  // !loggedIn ? (
  //   <Router>
  //     <Routes>
  //       <Route path="/" exact element={<Login />} />
  //       <Route
  //         path="*"
  //         element={<Navigate to="/" replace />}
  //       />
  //     </Routes>
  //   </Router>
  // ) : (
  //   <Router>
  //     <div class="md:flex bg-[#D3E8E6]/20 h-screen">
  //       <div class="bg-[#2F313D] text-white md:hidden">
  //         <button class="p-4">
  //           <AiOutlineMenu />
  //         </button>
  //       </div>
  //       <div class="w-[25vw] inset-y-0 left-0 absolute transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
  //         <Sidebar />
  //       </div>
  //       <div class="flex-1 h-screen md:overflow-y-auto">
  //         <Routes>
  //           <Route path="/" exact element={<Home />} />
  //           <Route path="/login" exact element={<Login />} />
  //           {/* <Route path="/voters" element={<Voters />} />
  //           <Route path="/voterDetail" element={<VoterDetail />} />
  //           <Route path="/voters/newvoter" element={<NewVoter />} /> */}
  //           <Route path="/candidates" element={<Candidates />} />
  //           <Route path="/approval" element={<Approval />} />
  //           <Route path="/candidateDetail" element={<CandidateDetail />} />
  //           {/* <Route path="/candidates/newcandidate" element={<NewCandidate />} /> */}
  //           {/* <Route path="/elections" element={<Election />} />
  //           <Route path="/elections/newelection" element={<NewElection />} />
  //           <Route path="/blacklist" element={<Blacklist />} /> */}
  //           <Route
  //             path="*"
  //             element={<Navigate to="/" replace />}
  //           />
  //         </Routes>
  //       </div>
  //     </div>
  //   </Router>
  // );
}

export default App;
