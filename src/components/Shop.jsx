import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/shopPage.css'

const fetchProducts = () => {
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products', { mode: "cors" })
      .then(res => {
        if (res.status >= 400) {
          throw new Error("server error");
        }
        return res.json();
        })
      .then(res => setProductList(res.filter((product) => product.category !== "electronics" )))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  
  return { productList, error, loading };
}

function ShopPage() {
  const { productList, error, loading } = fetchProducts();
  const navigate = useNavigate();
  
  if (error) return (
    <div className='shopBox'>
      <h2>A network error was encountered</h2>
      <div className='productCatalogue'></div>
    </div>
  );
  if (loading) return (
    <div className='shopBox'>
      <h2>Loading products...</h2>
      <div className='productCatalogue'></div>
    </div>
  );

  const sendToProduct = (productId) => {
    navigate(`/product/${productId}`);
  }

  return (
    <div className='shopBox'>
      <h2>Popular Products</h2>
      <div className='productCatalogue'>

        {productList.length > 1 ? (
          productList.map((product) => {
            return (
              <button key={product.id} className='productCard' onClick={(e) => {e.preventDefault; sendToProduct(product.id)}}>
                <div className='productImageBox'><img src={product.image} alt="" /></div>
                <span className='productInfo'>
                  <h3 className='productName'>{product.title}</h3>
                  <p className='productPrice'>${product.price}</p>
                </span>
              </button>
            );
          })
        ) : ''}

      </div>
    </div>
  )
}

export default ShopPage;
