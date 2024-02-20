import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
    <>
      <div className="container py-5">
        <div className="d-flex justify-content-between border-bottom mb-2 pb-2">
          <div>
            <h2>Summary</h2>
            <p>Total Items: {totalItems.toString()}</p>
            <p>Total Price: {totalPrice.toString()}</p>
          </div>
          <div>
            <button onClick={Checkout} className="btn btn-primary">Checkout</button>
          </div>
        </div>
        <div >
          <div className="d-flex justify-content-between mb-2">
            <h2>Cart</h2>
            <button onClick={_clearCart} className="btn btn-danger">ClearCart</button>
          </div>
          <div className="d-flex flex-column">
            {cartItems.map((item: any, index: number) => (
              <div key={index}>
                <div className="card mb-2 p-2 bg-dark text-white">
                  <div className="row">
                    <div className="col-md-2 col-sm-4">
                      <div>
                        <img src={item.product.imageCover} className="w-100" style={{ height: '200px' }} alt="..." />
                      </div>
                    </div>
                    <div className="col-md-7 col-sm-5">
                      <div className='p-3 d-flex justify-content-around flex-column h-100'>
                        <h5 className="card-title">{item.product.title}</h5>
                        <p className="card-text">Price: {item.price}</p>
                        <p className="card-text">Total: {item.price * item.count}</p>
                        <button className="btn btn-danger" onClick={() => { deleteItem(item.product._id) }}>Delete</button>
                      </div>
                    </div>
                    <div className="col-sm-3 align-self-center">
                      <div className='p-3 d-flex justify-content-center'>
                        {/* +/- buttons  and count*/}
                        <button className="btn btn-primary" onClick={() => { updateCount(item.product._id, item.count + 1) }}>+</button>
                        <p className="m-2">{item.count}</p>
                        <button className="btn btn-primary" onClick={() => {
                          if (item.count > 1) updateCount(item.product._id, item.count - 1)
                        }}>-</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  )
}
