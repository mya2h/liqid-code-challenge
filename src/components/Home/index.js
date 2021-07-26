import Nav from '../Nav'
import Layout from './landing'
import ProductChart from './products'
import Footer from '../Footer'
import { useState } from 'react'

const Home = () => {
    const [toggle, setToggle] = useState(false)
    console.log(toggle)
    return (
        <div>
            <Nav setToggle={setToggle} />
            <Layout />
            <Footer />
        </div>
    )
}
export default Home