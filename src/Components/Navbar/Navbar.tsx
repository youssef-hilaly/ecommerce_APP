import { Link, useNavigate } from 'react-router-dom'
import logo from '../../imgs/freshcart-logo.svg'
import { useContext } from 'react'
import { authContext } from '../../Context/AuthContext'
import { cartContext } from '../../Context/CartContext'

export default function Navbar() {

  const { token, setToken } = useContext(authContext)
  const navigate = useNavigate();

  const {totalItems} = useContext(cartContext)

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          <img src={logo} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token?
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="brands">
                  Brands
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="wishlist">
                  wishList
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="cart">
                  <span className="position-relative">
                    Cart
                    {totalItems? 
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItems.toString()}
                    </span>:<></>}

                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="allorders">
                  Orders
                </Link>
              </li>
            </ul>:<ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul> // to move the links to the right
          }

          <div className="media d-flex align-items-center h-100">
            <a href="" target="_blank">
              <i className="fa-brands fa-instagram p-2"></i>
            </a>
            <a href="" target="_blank">
              <i className="fa-brands fa-facebook p-2"></i>
            </a>
            <a href="" target="_blank">
              <i className="fa-brands fa-tiktok p-2"></i>
            </a>
            <a href="" target="_blank">
              <i className="fa-brands fa-twitter p-2"></i>
            </a>
            <a href="" target="_blank">
              <i className="fa-brands fa-linkedin p-2"></i>
            </a>
            <a href="" target="_blank">
              <i className="fa-brands fa-youtube p-2"></i>
            </a>
          </div>
          <ul className="navbar-nav">
            {!token && <>
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="register">
                  Register
                </Link>
              </li>
            </>}

            {token &&
              <li className="nav-item">
                <span onClick={logout} role='button' className="nav-link">
                  Logout
                </span>
              </li>}

          </ul>
        </div>
      </div>
    </nav>

  )
}
