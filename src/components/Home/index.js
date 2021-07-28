import { useState } from 'react'
import Nav from '../Nav'
import Layout from './landing'
import Footer from '../Footer'
import BarChart from './barChart'
import '../../assets/styles/nav.css'

const Home = () => {
    return (
        <div>   
            <Nav active="home"/>
            <Layout/>
            <BarChart/>
            <Footer />
        </div>
    )
}
export default Home