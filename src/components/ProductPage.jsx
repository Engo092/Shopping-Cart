import { useParams, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/productPage.css'
import {v4 as uuid} from 'uuid'

const fetchProduct = (productId) => {
    const [productInfo, setProductInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`, { mode: "cors" })
        .then(res => {
          if (res.status >= 400) {
            throw new Error("server error");
          }
          return res.json();
          })
        .then(res => setProductInfo(res))
        .catch((error) => setError(error))
        .finally(() => {setLoading(false)});
    }, [productId]);


    return { productInfo, error, loading };
}


function ProductPage() {
    const id = useParams();
    const [cart, setCart] = useOutletContext();
    const [productQuantity, setProductQuantity] = useState(1);
    const [hasOnCart, setHasOnCart] = useState(false);

    const { productInfo, error, loading } = fetchProduct(id.name);

    useEffect(() => {
        if (productInfo) {
            let isOnCart = false;
            cart.forEach(product => {
                if (product.product === productInfo.id) {
                    setHasOnCart(true);
                    isOnCart = true;
                }
            });
            if (isOnCart !== true) {
                setHasOnCart(false);
            }
        }
    }, [cart, productInfo]);


    if (error) return (
        <div className='productBox'>
            <h2>A network error was encountered</h2>
        </div>
    )
    if (loading) return (
        <div className='productBox'>
            <h2>Loading...</h2>
        </div>
    )

    return (
        <div className='productBox'>
            {productInfo ? (
                <>
                    <div className='imageContainer'><img src={productInfo.image} alt="" /></div>
                    <div className='productInfo'>
                        <h2>{productInfo.title}</h2>
                        <div className='description'>
                            <h3>Description</h3>
                            <p>{productInfo.description}</p>
                        </div>
                        <p className='productPrice'>${productInfo.price}</p>
                        <div className='addToCart'>
                            <span>
                                <label htmlFor="cartQuantity">Quantity: </label>
                                <input name='cartQuantity' type="number" value={productQuantity} min="1" max="99" onChange={(e) => setProductQuantity(Number(e.target.value))} />
                            </span>
                            {hasOnCart ? (
                                <button className='addToCartButton added' onClick={() => {
                                    setCart(cart.filter(product => product.product !== productInfo.id));
                                }}>Already in Cart</button>
                            ) : (
                                <button className='addToCartButton' onClick={() => {
                                    if (productQuantity <= 0) {
                                        alert("Please enter a valid quantity (minimum: 1; maximum: 99)");
                                    } else {
                                        setCart([...cart, {product: productInfo.id, quantity: productQuantity, key: uuid()}]);
                                    }
                                }}>Add to Cart</button>
                            )}
                            
                        </div>
                    </div>
                </>
            ) : ''}
        </div>        
    );
}

export default ProductPage;