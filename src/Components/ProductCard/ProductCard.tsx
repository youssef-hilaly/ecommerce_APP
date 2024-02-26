import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import './ProductCard.css'
import { cartContext } from '../../Context/CartContext'
import { wishContext } from '../../Context/WishContext'
import toast from 'react-hot-toast'
import { authContext } from '../../Context/AuthContext'
import { IProduct } from '../../interfaces/interfaces'

export default function ProductCard({ product }: { product: IProduct }) {
    const [rating, setRating] = useState(0)
    const [isWish, setIsWish] = useState(false)
    const { addToCart } = useContext(cartContext)
    const { token } = useContext(authContext)
    const { wishListIds, addToWishList, removeFromWishList } = useContext(wishContext)
    const navigate = useNavigate();

    const handleRating = (rate: number) => {
        setRating(rate)
    }


    async function addProductToCart(id: string) {
        if (!token) {
            toast.error("Please login first")
            navigate('/login')
            return;
        }
        const toastId = toast.loading("Please wait...")

        const isOk = await addToCart(id);
        isOk ? toast.success("Product added to cart", { id: toastId }) :
            toast.error("Error adding product to cart", { id: toastId });
    }

    async function toggleProductToWish(id: string) {
        if (!token) {
            toast.error("Please login first")
            navigate('/login')
            return;
        }
        const toastId = toast.loading("Please wait...")
        if (isWish) {
            const isOk = await removeFromWishList(id);
            isOk ? toast.success("Product removed from wishlist", { id: toastId }) :
                toast.error("Error removing product from wishlist", { id: toastId });
            return;
        }

        const isOk = await addToWishList(id);
        isOk ? toast.success("Product added to wishlist", { id: toastId }) :
            toast.error("Error adding product to wishlist", { id: toastId });
    }

    useEffect(() => {
        if (wishListIds.includes(product.id)) {
            setIsWish(true)
        } else {
            setIsWish(false)
        }
    }, [wishListIds, product.id])

    return (
        <>
            <div className="card product overflow-hidden">
                <div className='card-img overflow-hidden'>
                    <Link to={`/productDetails/${product.id}`}>
                        <img src={product.imageCover} className="card-img-top w-100" style={{ transform: "scale(1.2)" }} alt="..." />
                    </Link>
                </div>

                <div className='card-body'>
                    {/* category */}
                    <Link to={`/categories`} className="badge bg-primary position-absolute" style={{ top: "5px", right: "5px" }}>{product.category.name}</Link>
                    {/* discount badge */}
                    {product.priceAfterDiscount ? <Link to={`/productDetails/${product.id}`} className="badge bg-danger position-absolute" style={{ top: "5px", left: "5px" }}>-{
                        Math.floor(((product.price - product.priceAfterDiscount) / product.price) * 100)
                    }%</Link> : null}
                    {/* title */}
                    <h2 className="card-title text-primary h4">{product.title.split(" ").slice(0, 4).join(" ")}</h2>
                    <div className='d-flex flex-column'>
                        <div className='d-flex'>
                            <Rating onClick={handleRating} size={20} />
                            <p className="card-text mt-1 ms-1 ">{product.ratingsAverage}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex fw-bold'>
                                {product.priceAfterDiscount ? <>
                                    <p className="card-text text-danger text-decoration-line-through">${product.price} </p>
                                    <p className="card-text">-${product.priceAfterDiscount}</p>
                                </> : <p className="card-text">${product.price}</p>}
                            </div>
                            {isWish ? <span className='badge bg-danger'>wishlisted</span> : null}
                        </div>
                    </div>

                    <div className='buttons position-absolute d-flex flex-column bg-dark py-2 px-3 rounded-3' style={{ top: "40%" }}>
                        <Link to={`/productDetails/${product.id}`}><i className="fa-solid fa-magnifying-glass fs-4"></i></Link>
                        <button onClick={() => addProductToCart(product.id)} className='bg-transparent border-0 p-0 mt-2'> <i className="fa-solid fa-cart-arrow-down fs-4 text-white"></i></button>
                        {isWish ?
                            <button onClick={() => toggleProductToWish(product.id)} className='bg-transparent border-0 p-0 mt-2'><i className='fa fa-heart  text-danger fs-4'></i></button>
                            : <button onClick={() => toggleProductToWish(product.id)} className='bg-transparent border-0 p-0 mt-2'><i className='fa fa-heart text-white fs-4'></i></button>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}
