import Nav from '../Nav'
import Layout from './landing'
import ProductChart from './products'
import Footer from '../Footer'
import { useState } from 'react'
import '../../assets/styles/nav.css'
const Home = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <div>
            <Nav setToggle={setToggle} />
            <Layout/>
            <ProductChart/>
            <Footer />
        </div>
    )
}
export default Home