import { useContext } from "react"
import { cartContext } from "../../Context/CartContext"
import axios from "axios"
import { useQuery } from "react-query"


export default function Orders() {
    const { userId } = useContext(cartContext)

    const { isError, isLoading, data, isFetched} = useQuery(`getOrders:${userId}`, getOrders)

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

    if(isFetched && data?.data.length === 0){
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h2>No Orders</h2>
            </div>
        )
    }

    return (
        <>
            <div className="container py-5">
                <h2>Orders</h2>
                <div className="row g-2">
                    {data?.data.map((order: any) => (
                        <div className="col-md-4 d-flex" key={order._id}>
                            <div className="card mb-4 bg-dark">
                                <div className="card-body text-white">
                                    <p className="card-title">Order ID: {order._id}</p>
                                    <p className="card-text">Total Price: {order.totalOrderPrice}</p>
                                    <p className="card-text">Payment Method: {order.paymentMethodType}</p>
                                    <p className="card-text">Delivered State: {order.isDelivered ? "Delivered" : "Not Delivered"}</p>
                                    <div className="row g-2">
                                        {order.cartItems.map((item: any) => (
                                            <div className="col-md-6 d-flex">
                                                <div>
                                                    <div className="card bg-main">
                                                        <img src={item.product.imageCover} className="w-100" alt="" />
                                                        <p className="card-title">{item.product.title.split(" ").slice(0, 2).join(" ")} </p>
                                                        <p className="card-text">Count: {item.count} </p>
                                                        <p className="card-text">Price: {item.price} </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
