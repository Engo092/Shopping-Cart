import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../styles/rootPage.css'
import cartSvg from '../assets/svgs/shopping_cart.svg'

function RootPage() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <header>
        <h1>Shopping Cart</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart" className='cartNavigation'>{cart.length > 0 ? (<p>{cart.length}</p>) : ''}<img src={cartSvg} alt="Shopping Cart" /></Link>
        </nav>
      </header>
      <section>
        <Outlet context={[cart, setCart]} />
      </section>
    </>
  )
}

export default RootPage;
