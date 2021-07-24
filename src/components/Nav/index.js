import {AiOutlineHome} from 'react-icons/ai'
import {BsPerson} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import '../../assets/styles/nav.css'

const Nav = ()=>{
    return(
        <div className="navbar">
            <div className="leftitems">
                <a>Hello, LIQID!</a>
                <a className="itemseparator">|</a>
                <a>Logout</a>
            </div>
            <div className="rightitems">
            <a><AiOutlineHome/>Home</a>
            <a><BsPerson/>Profile</a>
            <a><FiSettings/>Settings</a>
            </div>
        </div>
    )
}
export default Nav