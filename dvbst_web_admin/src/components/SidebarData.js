import React from 'react'
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoHomeSharp, IoRibbon } from "react-icons/io5";
import { BsListTask } from "react-icons/bs";
import { BsAlarmFill } from 'react-icons/bs';
import { FaUserLock } from "react-icons/fa";
import { MdHowToVote, MdOutlinePendingActions } from "react-icons/md";

export const SidebarData = [
    {
        title: 'Home',
        icon: <IoHomeSharp/>,
        link: "/" 
    },
    // {
    //     title: 'Elections',
    //     icon: <MdHowToVote/>,
    //     link: "/elections" 
    // },
    {
        title: 'Phase',
        icon: <BsAlarmFill/>,
        link: "/phase" 
    },
    {
        title: 'Voters',
        icon: <AiOutlineUserAdd/>,
        link: "/voters" 
    },
    {
        title: 'Candidates',
        icon: <BsListTask/>,
        link: "/candidates" 
    },
    {
        title: 'Pending Approval',
        icon: <MdOutlinePendingActions/>,
        link: "/approval" 
    },
    {
        title: 'Elections',
        icon: <IoRibbon/>,
        link: "/results" 
    },
    {
        title: 'Blacklist',
        icon: <FaUserLock/>,
        link: "/blacklist" 
    },
]