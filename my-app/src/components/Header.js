import { Link, useNavigate} from 'react-router-dom';
import '../App.css'
import { CgProfile } from 'react-icons/cg';
import { RxExit } from 'react-icons/rx';


export default function Header() {
    const navigate = useNavigate();
    function clearStorage() {
        window.localStorage.clear() 
        navigate("/log-in");
    }
    function gotoSettings(){
        navigate("/settings-profile");
    }
    return (
        <div className='header'>
            <div className='header-text'>
                <h1>My trips <span id='logo-span'> diary</span> </h1>
                <div className='icons'>
                    <Link to={"/trips"}> My trips </Link>
                    <CgProfile size={25} onClick={gotoSettings} />
                    <RxExit size={25} onClick={clearStorage}/>
                </div>
            </div>
        </div>
    )
}