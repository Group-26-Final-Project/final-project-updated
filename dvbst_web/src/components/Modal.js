import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router';
import { editUser } from "../features/userSlice"

const Modal = ({ setModalOn, setInfo, info }) => {
    console.log("modal", info)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useSelector((state) => state.authState)

    const handleOKClick = () => {
        dispatch(editUser(
            {
                id: id,
                user: info
            }
        ))
            .unwrap()
            .then((response) => {
                setInfo(null)
                setModalOn(false)
                navigate('/')
                window.location.reload()
            })
    }
    const handleCancelClick = () => {
        setInfo(null)
        setModalOn(false)
    }

    return (

        <div className="bg-[#F6FAFA] opacity-90 fixed inset-0 z-50">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-white py-12 px-12 border-2 border-[#00D05A] rounded-xl ">
                    <div className="flex text-lg text-zinc-600 mb-10" >Are you sure? You can't make changes anymore</div>
                    <div className="flex justify-end">
                        <button onClick={handleCancelClick} className="rounded px-4 py-2 text-[#00D05A] bg-white border border-[#00D05A]">Cancel</button>
                        <button onClick={handleOKClick} className=" rounded px-4 py-2 ml-4 text-white bg-[#00D05A]">Yes</button>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Modal