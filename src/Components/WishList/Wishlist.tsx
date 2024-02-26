import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { cartContext } from '../../Context/CartContext'
import { wishContext } from '../../Context/WishContext'
import { IProduct } from '../../interfaces/interfaces'

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
        <>
            <div className="container py-5">
                <h2>Your WishList</h2>
                <div className='overflow-x-scroll'>
                    <table className='table'>
                        <thead>
                            <tr className='text-center'>
                                <th>Images</th>
                                <th>Product</th>
                                <th>Unit Price</th>
                                <th>Add to Cart</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishList.map((product: IProduct, index: number) => (
                                <tr key={index} className='text-center' >
                                    <td><img src={product.imageCover} alt="" style={{ width: "100px" }} /></td>
                                    <td>{product.title.split(" ").slice(0, 4).join(" ")}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button onClick={() => addProductToCart(product.id)} className="btn bg-main text-white mx-1 w-50">Add to cart</button>
                                    </td>
                                    <td> <button onClick={() => removeProductFromWishList(product.id)} className="btn bg-danger text-white mx-1 w-50">Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
