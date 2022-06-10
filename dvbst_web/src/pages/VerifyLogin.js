import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import { verify } from "../features/authSlice";
import { CgDanger } from 'react-icons/cg'
import { AiOutlineCheckCircle } from 'react-icons/ai'

export default function VerifyLogin(props) {
    const dispatch = useDispatch()
    let params = useParams();
    console.log("params", params)
    let navigate = useNavigate();
    const authState = useSelector((state) => state.authState)

    useEffect(() => {
        if (params.link) {
            dispatch(verify(params))
                // .unwrap()
                // .then((response) => {
                //     setTimeout(function () {
                //         window.close();
                //     }, 10000);
                // })
        }
    }, [dispatch]);

    return (
        <div class="flex items-center justify-center min-h-screen bg-[#F6FAFA]">
            {authState.verifyStatus === "pending" && (
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
            {authState.verifyStatus === "failed" && (
                <div class="px-5 py-8 mt-4 text-left bg-white shadow-lg  w-[30vw]">
                    <div class="flex justify-center">
                        <CgDanger size={48} color={"#fb1032"} />
                    </div>
                    <div class="flex items-baseline justify-center">
                        <h1 class="text-center text-2xl text-gray-700">Verification Failed</h1>
                    </div>
                    <div class="flex items-baseline justify-center pt-4">
                        <p class="text-center text-sm text-gray-700">{authState.verifyError}</p>
                    </div>
                </div >
            )}
            {authState.verifyStatus === "success" && (
                <div class="px-5 py-8 mt-4 text-left bg-white shadow-lg  w-[30vw]">
                    <div class="flex justify-center">
                        <AiOutlineCheckCircle size={48} color={'#00D05A'} style={{ borderWidth: '2px', borderRadius: '100%', borderColor: '#00D05A33' }} />
                    </div>
                    <div class="flex items-baseline justify-center">
                        <h1 class="text-center text-2xl text-gray-700">Verification Successful</h1>
                    </div>
                    <div class="flex items-baseline justify-center pt-4">
                        <p class="text-center text-sm text-gray-700">Refresh your original page! This window will close in 10 seconds</p>
                    </div>
                </div >
            )}
            {/* <FadeLoader color={'black'} loading={true} css={override} size={50} /> */}
        </div>
    );
}
