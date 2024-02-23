import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';

export default function Cart() {
    const { cartItems, totalItems, totalPrice, deleteFromCart, updateItemCount, clearCart } = useContext(cartContext)

    const navigate = useNavigate();

    function Checkout() {
        navigate('/payment')
    }

    async function deleteItem(id: string) {
        const toastId = toast.loading("Please wait...")
        const isOk = await deleteFromCart(id);
        isOk ? toast.success("Product deleted", { id: toastId }) : toast.error("Error deleting product", { id: toastId });
    }

    async function updateCount(id: string, count: number) {
        const toastId = toast.loading("Please wait...")
        const isOk = await updateItemCount(id, count);
        isOk ? toast.success("Product count updated", { id: toastId }) : toast.error("Error updating product count", { id: toastId });
    }

    async function _clearCart() {
        if (cartItems.length === 0) return;
        const toastId = toast.loading("Please wait...")
        const isOk = await clearCart();
        isOk ? toast.success("Cart cleared", { id: toastId }) : toast.error("Error clearing cart", { id: toastId });
    }

    if (cartItems.length === 0) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <h2>Your cart is empty</h2>
        </div>
    )
    return (
        // table
        // table head: images | product name | price | quantity | total price | remove 
        <>
            <div className="container py-5">
                <div className="d-flex justify-content-between mb-2">
                    <h2>Your Cart</h2>
                    <button onClick={Checkout} className="btn btn-primary">Checkout</button>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <h5>Total Items: {totalItems.toString()}</h5>
                    <h5>Total Price: {totalPrice.toString()}</h5>
                    <button onClick={_clearCart} className="btn btn-danger">Clear Cart</button>
                </div>
                <div className='overflow-x-scroll'>
                    <table className='table'>
                        <thead>
                            <tr className='text-center'>
                                <th>Images</th>
                                <th>Product</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item: any, index: number) => (
                                <>
                                    <tr key={index} className='text-center' >
                                        <td><img src={item.product.imageCover} alt="" style={{ width: "100px" }} /></td>
                                        <td>{item.product.title.split(" ").slice(0, 4).join(" ")}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <div className='d-flex justify-content-between border-1 border'>
                                                <button className="btn border-0 border-end rounded-0" onClick={() => { updateCount(item.product._id, item.count + 1) }}>+</button>
                                                <p className="m-2">{item.count}</p>
                                                <button className="btn border-0 border-start rounded-0" onClick={() => {
                                                    if (item.count > 1) updateCount(item.product._id, item.count - 1)
                                                }}>-</button>
                                            </div>
                                        </td>
                                        <td>{item.price * item.count}</td>
                                        <td><button onClick={() => deleteItem(item.product._id)} className="btn btn-danger">Remove</button></td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
