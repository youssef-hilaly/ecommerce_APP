import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { authContext } from '../../Context/AuthContext'
import { cartContext } from '../../Context/CartContext'
import './NavbarUI.css'
import { wishContext } from '../../Context/WishContext'

export default function NavbarUI() {

    const [Currency, setCurrency] = useState('USD')

    const { token, setToken, setUserId } = useContext(authContext)
    const navigate = useNavigate();

    const { totalItems, totalPrice, setEmpty } = useContext(cartContext)
    const { wishListIds, clearWishList } = useContext(wishContext)

    const changeCurrency = (e: any) => {
        if (e.target.value === '1') {
            setCurrency('USD')
        } else if (e.target.value === '2') {
            setCurrency('LE')
        } else {
            setCurrency('EUR')
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        setUserId(null);
        setToken(null);
        setEmpty();
        clearWishList();
        navigate('/login');
    }
    return <>
        <div className="bg-main-ui">
            <div className="container">
                <div className="nav-help d-flex justify-content-center justify-content-lg-between py-2">
                    <div className='d-flex text-white align-items-center'>
                        <div className='d-flex px-2'>
                            <p>Language: </p>
                            <select className="form-select" aria-label="Default select example">
                                <option value="1">English</option>
                                <option value="2">FRENCH</option>
                                <option value="3">Arabic</option>
                            </select>
                        </div>
                        <div className='d-flex px-2'>
                            <p>Currency: </p>
                            <select className="form-select" aria-label="Default select example" onChange={changeCurrency}>
                                <option value="1">USA</option>
                                <option value="2">LE</option>
                                <option value="3">EUR</option>
                            </select>
                        </div>
                        <p className='d-none d-sm-block'>Need Help? 0110000000</p>
                    </div>
                    <div className='d-lg-flex d-none text-white align-items-center'>
                        <Link to="#">
                            <p className='px-2'>About Us</p>
                        </Link>
                        <Link to="#">
                            <p className='px-2'> Order Tracking</p>
                        </Link>
                        <Link to="#">
                            <p className='px-2'> Contact Us</p>
                        </Link>
                        <Link to="#">
                            <p className='px-2'> FAQs</p>
                        </Link>
                    </div>
                </div>

                <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4">
                    <div className="container-fluid">
                        <Link className="navbar-brand fs-3" to="/home">Hilalymarket</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="home">
                                        Home
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
                                    <Link className="nav-link" to="allorders">
                                        Orders
                                    </Link>
                                </li>
                            </ul>
                            <ul className='navbar-nav flex-row justify-content-around'>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="cart">
                                        <div className='d-flex flex-wrap'>
                                            <div className="position-relative">
                                                <i className="fa-brands fa-shopify fs-3 me-2 ">
                                                </i>
                                                {totalItems ?
                                                    <span className="position-absolute translate-middle badge rounded-pill bg-secondary-ui" style={{ top: "-10px", right: "-15px" }}>
                                                        {totalItems.toString()}
                                                    </span> : <></>}
                                            </div>

                                            <div className='d-flex flex-column'>
                                                <p>Your Cart</p>
                                                <span className="badge bg-secondary-ui">{totalPrice.toString()} {Currency}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="wishlist">
                                        <span className="position-relative">
                                            <i className="fa-regular fa-heart fs-3 me-2"></i>
                                            {wishListIds ?
                                                <span className="position-absolute translate-middle badge rounded-pill bg-secondary-ui" style={{ top: "-10px", right: "-20px" }}>
                                                    {wishListIds.length.toString()}
                                                </span> : <></>}
                                        </span>
                                        Favorite
                                    </Link>
                                </li>
                                {token &&
                                    <li className="nav-item">
                                        <span onClick={logout} role='button' className="nav-link text-white">
                                            <i className="fa-regular fa-user fs-3 me-2"></i>
                                            Logout
                                        </span>
                                    </li>
                                }
                                {!token && <>
                                    {window.location.href.includes('login') ?
                                        <li className="nav-item">
                                            <Link className="nav-link mt-2" to="register">
                                                <i className="fa-regular fa-user fs-3 me-2"></i>
                                                Register
                                            </Link>
                                        </li>
                                        :
                                        <li className="nav-item">
                                            <Link className="nav-link" to="login">
                                                <i className="fa-regular fa-user fs-3 me-2"></i>
                                                Login
                                            </Link>
                                        </li>
                                    }
                                </>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </>
}