import { Link, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/shopCart.css'
import {v4 as uuid} from 'uuid'

const fetchCartProducts = (cart) => {

  const [productInfo, setProductInfo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (cart.length > 0) {
      let temp = [];
      cart.map(product => {
        fetch(`https://fakestoreapi.com/products/${product.product}`, { mode: "cors" })
          .then(res => {
            if (res.status >= 400) {
              throw new Error("server error");
            }
            return res.json();
            })
          .then(res => {
            temp = [...temp, res];
  
          })
          .catch((error) => setError(error))
          .finally(() => {setLoading(false); setProductInfo(temp)});
      })
    } else {
      setLoading(false);
    }
  }, []);

  return { productInfo, error, loading };
}

const sumAllPrices = () => {
  const rows = [...document.querySelectorAll('tbody tr')];
  let rowsPrices = 0;
  rows.map((row) => {
    let rowPrice = Number(row.getElementsByTagName('td')[4].innerText.replace(/[^\d.-]/g, ''));
    rowsPrices += rowPrice;
  })
  return rowsPrices;
}

function CartPage() {
  const [priceSum, setPriceSum] = useState(0);
  const [cart, setCart] = useOutletContext();
  const { productInfo, error, loading } = fetchCartProducts(cart);

  useEffect(() => {
    setPriceSum(sumAllPrices().toFixed(2));
  }, [cart, productInfo])


  if (error) return (
    <div className='cartBox'>
        <h2>A network error was encountered</h2>
        <div className="shoppingCart"></div>
    </div>
  )
  if (loading) return (
      <div className='cartBox'>
          <h2>Loading...</h2>
          <div className="shoppingCart"></div>
      </div>
  )

  return (
    <div className='cartBox'>
      <h2>Shopping Cart</h2>
      <div className="shoppingCart">
        {(cart.length > 0 && !(productInfo.length < cart.length)) ? (
          <>
            <table className='cartItems'>
              <caption>Your Cart</caption>
              <thead>
                <tr>
                  <th colSpan="2" scope='colgroup'>Item</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Quantity</th>
                  <th colSpan="2" scope='col'>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  const cartProductInfo = productInfo.filter(obj => obj.id === product.product);
                  return (
                    <tr key={product.key}>
                      <td><img src={cartProductInfo[0].image} alt="" /></td>
                      <td><Link to={`/product/${product.product}`}>{cartProductInfo[0].title}</Link></td>
                      <td>${cartProductInfo[0].price}</td>
                      <td className='tableQuantity'><input value={product.quantity} type="number" min="1" max="99" onChange={ (e) => {
                          if (Number(e.target.value) !== 0) {
                            setCart(cart.map((obj) => {
                              if (obj.product !== product.product) {
                                return obj;
                              } else {
                                return { ...product, quantity: Number(e.target.value)};
                              }
                            }));
                          }
                      }} /></td>
                      <td>${(cartProductInfo[0].price * product.quantity).toFixed(2)}</td>
                      <td><button className='removeItem' onClick={() => {
                        setCart(cart.filter((obj) => obj.product !== cartProductInfo[0].id));
                      }}>DELETE</button></td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="4" className='subtotal'>Subtotal</th>
                  <td>${priceSum}</td>
                </tr>
              </tfoot>
            </table>
            <div className='checkoutDiv'><button className='checkout' onClick={() => {alert("order was succesfully placed!"); setCart([])}}>CHECKOUT</button></div>
          </>
        ) : (
          <div className='emptyMessage'>
            <p>
              Your cart is looking empty
              <br />
              <Link to="/shop">Shop Now</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage;
