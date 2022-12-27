import { Link } from 'react-router-dom';
import '../App.css'
import { CgProfile } from 'react-icons/cg';
import { RxExit } from 'react-icons/rx';

export default function Header() {
    function clearStorage() {
        window.localStorage.clear()
    }
    return (
        <div className='header'>
            <div className='header-text'>
                <h1>My trips <span id='logo-span'> diary</span> </h1>
                <div className='icons'>
                    <Link to={"/trips"}> My trips </Link>
                    <CgProfile size={25} />
                    <RxExit size={25} />
                </div>
            </div>
        </div>
    )
}
