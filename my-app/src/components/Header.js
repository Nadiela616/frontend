import {Link} from 'react-router-dom';
import '../App.css'


export default function Header(){
    function clearStorage(){
        window.localStorage.clear()
    }
    return(
        <div className='header'> 
            <h1>My trips diary</h1>
        </div>
    // <nav id="menu">
    //     <Link to={"/sign-up"}>SignUp</Link>
    //     <Link to={"/log-in"}>Log-in</Link>
    //     <Link to={"/trips"}>Trips</Link>
    //     <Link to={"/map"}>Map</Link>
    //     <Link to={"/log-in"} onClick={clearStorage}>Log out</Link>
    // </nav>
    )
}
