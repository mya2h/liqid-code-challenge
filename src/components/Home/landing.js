import { WiDirectionRight } from 'react-icons/wi'
import '../../assets/styles/landing.css'

const Landing = ({ toggle }) => {
    return (
        <div className={toggle ? "hidenrow" : "row"}>
            <div class="column col1">
                <div className="col1content">
                    <h2>
                        | Welcome to your personal area.
                    </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris fermentum elit id auctor mollis. Aenean feugiat commodo quam, vulputate viverra lorem iaculis in. Curabitur varius commodo lacus eget vestibulum. Curabitur vitae risus nec justo faucibus vulputate. Nunc blandit nisi lobortis, gravida elit non, tincidunt dolor. Mauris ullamcorper suscipit risus, eget dictum dui consequat sed. Nam quis orci id dui consectetur elementum.
                        Nulla et lacus massa.</p>
                </div>
            </div>
            <div className="column ">
                <div className="col2">
                    <div className="investments">
                        <div>
                            <h3>
                                | Investments
                            </h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum elit id auctor mollis. Aenean feugiat commodo quam, vulputate viverra lorem iaculis in. Curabitur varius commodo
                                lacus eget vestibulum. Curabitur vitae risus nec justo faucibus vulputate.
                            </p>
                        </div>
                    </div>
                    <div className="stock">
                        <div>
                            <h3>
                                | Stocks
                            </h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum elit id auctor mollis.
                            </p>
                            <button className="btn">Explore<WiDirectionRight /></button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Landing