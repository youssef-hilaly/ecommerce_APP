import React, { useContext, useEffect } from 'react'
import { wishContext } from '../../Context/WishContext'
import toast from 'react-hot-toast'
import { cartContext } from '../../Context/CartContext'

export default function Wishlist() {
    const { lazy, wishList, getWishList, removeFromWishList } = useContext(wishContext)
    const { addToCart } = useContext(cartContext)

    function loadWishList() {
        if (lazy) {
            getWishList()
        }
    }

    async function addProductToCart(id: string) {
        const toastId = toast.loading("Please wait...")
        const isOk = await addToCart(id);
        isOk ? toast.success("Product added to cart", { id: toastId }) :
            toast.error("Error adding product to cart", { id: toastId });
        removeProductFromWishList(id)
    }

    async function removeProductFromWishList(id: string) {
        const toastId = toast.loading("Please wait...")
        const isOk = await removeFromWishList(id);
        isOk ? toast.success("Product removed from wishlist", { id: toastId }) :
            toast.error("Error removing product from wishlist", { id: toastId });
    }


    useEffect(() => {
        // load wishlist on component mount
        // and when lazy changes that means the user added a product to cart and it was removed from wishlist
        loadWishList()
    }, [lazy])

    if (wishList.length === 0) {
        return <div className="d-flex justify-content-center align-items-center vh-100">
            <div>No items in wishlist</div>
        </div>
    }

    return (
        <div className="container">
            <div className="row g-3">
                {wishList.map((product: any) => {
                    return (
                        <div className=" col-md-4 col-lg-3 d-flex" key={product.id}>
                            <div className=" card product bg-black overflow-hidden">
                                <img src={product.imageCover} className="card-img-top" alt="..." />
                                <div className="card-body text-white">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="card-title text-main">{product.category.name}</h5>
                                    </div>
                                    <p className="card-text">{product.title.split(" ").slice(0, 2).join(" ")}</p>
                                    <div className="d-flex justify-content-between">
                                        {product.priceAfterDiscount ?
                                            <div className='d-flex'>
                                                <p className="card-text text-danger text-decoration-line-through me-2">{product.price}</p>
                                                <p className="card-text text-white">{product.priceAfterDiscount} EGP</p>
                                            </div>
                                            :
                                            <p className="card-text text-white">{product.price} EGP</p>
                                        }
                                        <p className="card-text text-white "><i className="fa fa-star text-warning me-1"></i>{product.ratingsAverage}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                        <button onClick={() => removeProductFromWishList(product.id)} className="btn bg-danger text-white mx-1 w-50">Remove</button>
                                        <button onClick={() => addProductToCart(product.id)} className="btn bg-main text-white mx-1 w-50">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
