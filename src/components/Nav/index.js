import { useState } from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import {BsPerson} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoExitOutline} from 'react-icons/io5'
import mainIcon from '../../assets/images/Group 1.svg'
import '../../assets/styles/nav.css'


const Nav = ()=>{
    const [navbarOpen, setNavbarOpen] = useState(false)
    const handleToggle = ()=>{
        setNavbarOpen(!navbarOpen)
    }
    const closeMenu = () => {
        setNavbarOpen(false)
    }
    return(
        <div>
        <nav class="nav">
    <div className="toggleButton">
    <GiHamburgerMenu onClick={handleToggle}/>
    </div>
    <div className="nav-title">
        <div className="logo">
        <img src={mainIcon}/>
        </div>
            </div>
    <div class="nav-left">
        <ul>
            <li> | </li>
            <li><a>   <IoExitOutline className="icon"/>Logout</a></li>
        </ul>
    </div>
    <div class="nav-right">
        <ul>
            <li><a className="active"><AiOutlineHome className="icon"/>Home</a></li>
            <li><a><BsPerson className="icon"/>Profile</a></li>
            <li><a><FiSettings className="icon"/>Settings</a></li>
        </ul>
    </div>
</nav>
</div>
    )
}
export default Nav