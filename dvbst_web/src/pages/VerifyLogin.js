import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import { verify } from "../features/authSlice";

export default function VerifyLogin(props) {
    const dispatch = useDispatch()
    let params = useParams();
    console.log("params", params)
    let navigate = useNavigate();
    const authState = useSelector((state) => state.authState)

    useEffect(() => {
        if (params.link) {
            dispatch(verify(params))
            .unwrap()
            .then((response)=>{
                setTimeout(function(){
                    window.close();
                }, 10000);
            }) 
        }
    }, [dispatch]);

    return (
        <div class="flex items-center justify-center min-h-screen bg-white">
            {authState.verifyStatus === "pending" && (
                <div class="flex flex-col items-center justify-center">
                    <SpinnerCircularFixed
                        size={50}
                        thickness={100}
                        speed={100}
                        color="#36ad47"
                        secondaryColor="rgba(0, 0, 0, 0.44)"
                    />
                    <p className="pt-3">Please Wait... Verifying your magic link</p>
                </div>
            )}
            {authState.verifyStatus === "failed" && (
                <div>
                    <h1>{authState.verifyError}</h1>
                    {/* <button onClick={() => window.location.reload(false)}>Reload!</button> */}
                </div>
            )}
            {authState.verifyStatus === "success" && (
                <div>
                    <h1>Verified Successfully!</h1>
                    <h3>Refresh your original page! This window will close in 10 seconds.</h3>
                    {/* <button onClick={() => window.location.reload(false)}>Reload!</button> */}
                </div>
            )}
            {/* <FadeLoader color={'black'} loading={true} css={override} size={50} /> */}
        </div>
    );
}
