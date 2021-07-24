import {AiOutlineHome} from 'react-icons/ai'
import {BsPerson} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {IoExitOutline} from 'react-icons/io5'
import mainIcon from '../../assets/images/Group 1.svg'
import textIcon from '../../assets/images/Group 32.svg'
import '../../assets/styles/nav.css'


const Nav = ()=>{
    return(
        <nav class="nav">
            <div className="nav-title">
        <img src={mainIcon}/>
            </div>
    <div class="nav-left">
        <ul>

            <li>  Hello, LIQID!  </li>
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
    )
}
export default Nav