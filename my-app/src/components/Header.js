import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import { CgProfile } from 'react-icons/cg';
import { RxExit } from 'react-icons/rx';

const Header = () => {
    const navigate = useNavigate()
    const clearStorage = () => {
        window.localStorage.clear()
        navigate("/log-in");
    }


    const gotoSettings = () => {
        navigate("/settings-profile");
    }
    return (
        <div className='w-full bg-white h-[80px]'>
            <div className='flex flex-row pt-[20px] pl-[50px] text-[#2B2B2B]'>
                <h1>My trips <span className='font-thin text-3xl'> diary</span> </h1>
                <div className='relative left-[70%]'>
                    <div className='flex flex-row gap-3'>
                        <Link to={"/trips"}> My trips </Link>
                        <CgProfile size={25} onClick={gotoSettings} />
                        <RxExit size={25} onClick={clearStorage} />                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header