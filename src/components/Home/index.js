import { useState } from 'react'
import Nav from '../Nav'
import Layout from './landing'
import Footer from '../Footer'
import BarChart from './barChart'
import '../../assets/styles/nav.css'

const Home = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    return (
        <div className="home-layoout">
            <Nav setNavbarOpen={setNavbarOpen} navbarOpen={navbarOpen} />
            <div className={navbarOpen ? "layout-disable" : ""}>
                <Layout />
                <BarChart />
                <Footer />
            </div>
        </div>
    )
}
export default Home