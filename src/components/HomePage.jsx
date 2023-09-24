import { Link } from 'react-router-dom'
import '../styles/homePage.css'
import homeImg from '../assets/images/homeImg.jpg'

function HomePage() {

  return (
    <div className='introBox'>
        <img src={homeImg} alt="" className='mainHomeImg' />
        <div className='introBoxText'>
            <h2>Where fashion meets beauty</h2>
            <p>
                We are a company that aims to offer high quality beautiful and fashionable clothing and jewelery for men and women.
                <br />
                <br />
                All of our products are met with affordable pricing and suberb quality, all based on the latest market fashion trends.
                <br />
                <br />
                We also offer free shipping for first time users. Interested? Check out our <Link to="/shop">assortment of products</Link>!
            </p>
        </div>
    </div>        
  );
}

export default HomePage;