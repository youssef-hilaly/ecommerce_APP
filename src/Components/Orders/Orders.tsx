import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthContext'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function Orders() {
    const { userId } = useContext(authContext)

    const { isError, isLoading, data, isFetched } = useQuery(`getOrders:${userId}`, getOrders)

    async function getOrders() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    }

    if (isError || isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-main" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (isFetched && data?.data.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h2>No Orders</h2>
            </div>
        )
    }

    return (<>
        <div className="container">
            <h2>Your Orders</h2>

            {data?.data.map((order: any) => (
                <div className="card my-2">
                    <div className='card-header bg-dark'>
                        <p className="card-title text-primary h5">Order ID: {order._id}</p>
                        <div className='d-flex justify-content-between text-white'>
                            <p className="card-text h5">Total Price: {order.totalOrderPrice} $</p>
                            <p className="card-text h5">Payment Method: {order.paymentMethodType}</p>
                            <p className="card-text h5">Delivered State: {order.isDelivered ? "Delivered" : "Not Delivered"}</p>
                        </div>
                    </div>
                    <div className='card-body overflow-x-scroll'>
                        <table className='table'>
                            <thead>
                                <tr className='text-center'>
                                    <th>Images</th>
                                    <th>Product</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.cartItems.map((item: any, index: number) => (
                                    <tr key={index} className='text-center' >
                                        <td><img src={item.product.imageCover} alt="" style={{ width: "100px" }} /></td>
                                        <td>{item.product.title.split(" ").slice(0, 4).join(" ")}</td>
                                        <td>{item.price}</td>
                                        <td>{item.count}</td>
                                        <td>{item.price * item.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>

            ))}




        </div>
    </>
    )
}
