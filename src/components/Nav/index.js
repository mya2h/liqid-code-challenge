import { useState, useRef } from 'react'
import { AiOutlineHome, AiOutlineClose } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import {IoLogOutOutline} from 'react-icons/io5'
import mainIcon from '../../assets/images/Group 1.svg'
import '../../assets/styles/nav.css'


const Nav = ({ setToggle }) => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const handleToggle = () => {
        setToggle(!navbarOpen)
        setNavbarOpen(!navbarOpen)

    }
    return (
        <div>
            <nav className={navbarOpen ? "active-nav" : "nav"}>
                <div className="nav-title">
                <div className="nav-logo"> <img src={mainIcon} /></div>
                <div className="menu-title"><a className="nav-link">Hello, Liqid</a></div>
                <div className="menu-title separator">|</div>
                <div className="nav-item left-item"><a className="nav-link"><IoLogOutOutline className="icon" />Logout</a></div>
                </div>
              
                <div className={navbarOpen ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-right">
                    <li className="nav-item right-item"><a className="nav-link"><IoLogOutOutline className="icon" />Logout</a></li>
                    <li className="nav-item"><a className="nav-link"><AiOutlineHome className="icon" />Home</a></li>
                    <li className="nav-item"><a className="nav-link"><BsPerson className="icon" />Profile</a></li>
                    <li className="nav-item"><a className="nav-link"><FiSettings className="icon" />Settings</a></li>
                </ul>
                <h2 >LIQID</h2>
                </div>
                <div className="hamburger" onClick={handleToggle}>
                    {navbarOpen ? <AiOutlineClose className="toggle-icon" /> : <GiHamburgerMenu className="toggle-icon" />}
                </div>
            </nav>
        </div>
    )
}
export default Nav