import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'


export default function ProductDetails() {
  let { id } = useParams()

  const { isError, isLoading, data, error } = useQuery(`ProductDetails/${id}`, ProductDetails)

  async function ProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  const {addToCart} = useContext(cartContext)

  async function addProduct(id: string){
    toast.promise(
      addToCart(id),
       {
         loading: 'adding...',
         success: <b>added successfully!</b>,
         error: <b>error occurred.</b>,
       }
     );
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-main" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (isError) {
    if((error as any).response.data.errors.msg == "Invalid ID ")
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2>Product Not Found</h2>
      </div>
    )
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2>Error fetching data</h2>
      </div>
    )
  }


  return (
    <div className="container py-5">
      {/* awesome ui */}
      <div className="row">
        <div className="col-md-4">
          <img style={{ height: "400px" }} src={data?.data.data.imageCover} alt="" />
        </div>
        <div className="col-md-8">
          <div className='p-4'>
            <div>
              <h1>{data?.data.data.title}</h1>
              <p className='mt-2'>{data?.data.data.description}</p>
            </div>
            <div className='mt-4'>
              <p>{data && "Category: " + data.data.data.category.name}</p>
              <p>{data && "Brand: " + data.data.data.brand.name}</p>
              <p>{data && "Price: " + data.data.data.price}</p>
            </div>
            <button onClick={()=>addProduct(id || '')} className="btn bg-main text-white w-100 mt-5">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
