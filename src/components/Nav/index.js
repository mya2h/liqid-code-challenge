import { useState, useRef } from 'react'
import { AiOutlineHome, AiOutlineClose } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import mainIcon from '../../assets/images/Group 1.svg'
import '../../assets/styles/nav.css'


const Nav = ({ setToggle }) => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const handleToggle = () => {
        setToggle(!navbarOpen)
        setNavbarOpen(!navbarOpen)

    }
    const closeMenu = () => {
        setNavbarOpen(false)
    }
    return (
        <div>
            <nav className={navbarOpen ? "active-nav" : "nav"}>
                <a href="#" className="nav-logo"> <img src={mainIcon} /></a>
                <ul className={navbarOpen ? "nav-menu active" : "nav-menu"} >
                    <li className="nav-item"><a className="active nav-link"><AiOutlineHome className="icon" />Home</a></li>
                    <li className="nav-item"><a className="nav-link"><BsPerson className="icon" />Profile</a></li>
                    <li className="nav-item"><a className="nav-link"><FiSettings className="icon" />Settings</a></li>
                </ul>
                <div className="humburger" onClick={handleToggle}>
                    {navbarOpen ? <AiOutlineClose className="toggle-icon" /> : <GiHamburgerMenu className="toggle-icon" />}
                </div>
            </nav>
        </div>
    )
}
export default Nav