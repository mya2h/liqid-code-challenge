import Nav from '../Nav/index'
import Layout from './landing'
import ProductChart from './products'
import "../../assets/styles/home.css"
const Home = () => {

    return(
        <div>
            <Nav/>
            <Layout/>
            <ProductChart/>
        </div>
    )
}
export default Home