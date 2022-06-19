import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyMagic } from "../features/votingSlice";
import { CgDanger } from 'react-icons/cg'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { SpinnerCircularFixed } from "spinners-react";

export default function VerifyVoteMagic(props) {
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const votingState = useSelector((state) => state.votingState)

  useEffect(() => {
    // debugger;
    // props.signIn(params.email, params.link)
    const verifyMagicLink = async () => {
      if (params.link) {
        console.log("params.link--", params.link, params.email);
        dispatch(verifyMagic({
          email: params.email,
          link: params.link
        }))
          .unwrap()
          .then((response) => {
            setTimeout(function () {
              navigate('/candidate_list')
            }, 5000)
          })
      }
    };
    // navigate('/')
    verifyMagicLink();
  }, [dispatch, navigate, params.email, params.link]);

  return (
    <div class="flex items-center justify-center min-h-screen bg-[#F6FAFA]">
      {votingState.verifyMagicStatus === "pending" && (
        <div class="flex flex-col items-center justify-center">
          <SpinnerCircularFixed
            size={50}
            thickness={100}
            speed={100}
            color="#36ad47"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
          <p className="text-center pt-3">Please Wait... Verifying your magic link</p>
        </div>
      )}
      {votingState.verifyMagicStatus === "failed" && (
        <div class="px-5 py-8 mt-4 text-left bg-white shadow-lg  w-[30vw]">
          <div class="flex justify-center">
            <CgDanger size={48} color={"#fb1032"} />
          </div>
          <div class="flex items-baseline justify-center">
            <h1 class="text-center text-2xl text-gray-700">Verification Failed</h1>
          </div>
          <div class="flex items-baseline justify-center pt-4">
            <p class="text-center text-sm text-gray-700">{votingState.verifyMagicError}</p>
          </div>
        </div >
      )}
      {votingState.verifyMagicStatus === "success" && (
        <div class="px-5 py-8 mt-4 text-left bg-white shadow-lg  w-[30vw]">
          <div class="flex justify-center">
            <AiOutlineCheckCircle size={48} color={'#00D05A'} style={{ borderWidth: '2px', borderRadius: '100%', borderColor: '#00D05A33' }} />
          </div>
          <div class="flex items-baseline justify-center">
            <h1 class="text-center text-2xl text-gray-700">Verification Successful</h1>
          </div>
          <div class="flex items-baseline justify-center pt-4">
            <p class="text-center text-sm text-gray-700">You will be redirected to the voting page in 5 seconds...</p>
          </div>
        </div >
      )}
    </div>
  )
}
