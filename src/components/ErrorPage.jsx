import { Link, Outlet } from 'react-router-dom'
import '../styles/errorPage.css'

function ErrorPage() {
  return (
    <div className='errorBox'>
      <h2>Oh no! It seems you have found a route that doesn't exist!</h2>
      <p>Don't worry though, you can always <Link to="/">go back</Link> to our home page.</p>
    </div>
  )
}

export default ErrorPage;
