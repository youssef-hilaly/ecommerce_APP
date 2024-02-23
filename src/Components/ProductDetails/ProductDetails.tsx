import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { authContext } from '../../Context/AuthContext'
import { wishContext } from '../../Context/WishContext'


export default function ProductDetails() {
  const [isWish, setIsWish] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const { token } = useContext(authContext)
  let { id } = useParams()
  const navigate = useNavigate();
  const { wishListIds, addToWishList, removeFromWishList } = useContext(wishContext)
  const { isError, isLoading, data, error } = useQuery(`ProductDetails/${id}`, ProductDetails)


  async function ProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  const { addToCart } = useContext(cartContext)


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

  async function toggleProductToWish() {
    if (!token) {
      toast.error("Please login first")
      navigate('/login')
      return;
    }
    const toastId = toast.loading("Please wait...")
    if (isWish) {
      const isOk = await removeFromWishList(id ?? "");
      isOk ? toast.success("Product removed from wishlist", { id: toastId }) :
        toast.error("Error removing product from wishlist", { id: toastId });
      return;
    }

    const isOk = await addToWishList(id ?? "");
    isOk ? toast.success("Product added to wishlist", { id: toastId }) :
      toast.error("Error adding product to wishlist", { id: toastId });
  }

  function handleImageClick(idx: number) {
    setActiveImage(idx)
  }

  useEffect(() => {
    if (wishListIds.includes(id ?? "")) {
      setIsWish(true)
    } else {
      setIsWish(false)
    }
  }, [wishListIds, id])

  if (isLoading || !data) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-main" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-1">
          <div className='d-flex flex-column'>
            <div className={'border overflow-hidden my-1 ' + ((activeImage == 0) ? "border-warning" : "border-secondary")} role='button' onClick={() => handleImageClick(0)}>
              <img className='w-100' style={{ transform: "scale(1.1)" }} src={data?.data.data.images[0]} alt="" />
            </div>
            <div className={'border overflow-hidden my-1 ' + ((activeImage == 1) ? "border-warning" : "border-secondary")} role='button' onClick={() => handleImageClick(1)}>
              <img className='w-100' style={{ transform: "scale(1.1)" }} src={data?.data.data.images[1]} alt="" />
            </div>
            <div className={'border overflow-hidden my-1 ' + ((activeImage == 2) ? "border-warning" : "border-secondary")} role='button' onClick={() => handleImageClick(2)}>
              <img className='w-100' style={{ transform: "scale(1.1)" }} src={data?.data.data.images[2]} alt="" />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <img className='w-100' style={{maxHeight:"500px"}} src={data?.data.data.images[activeImage]} alt="" />
        </div>
        <div className="col-md-6">
          <div className='h-100 p-3 d-flex flex-column justify-content-between '>
            <div className='border-bottom'>
              <h3 className='text-primary'>{data?.data.data.title}</h3>
              <h4>{"Price: " + data?.data.data.price}</h4>
            </div>
            <div>
              <h4 className='mt-3'>Details</h4>
              <p>{data?.data.data.description}</p>
              <div className='my-3'>
                <ul>
                  <li>Category: {data?.data.data.category.name}</li>
                  <li>Brand: {data?.data.data.brand.name}</li>
                </ul>
              </div>
              <h5>Availability: {data?.data.data.quantity ?
                <span className='text-success'>
                  {data?.data.data.quantity} in Stock
                </span> :
                <span className='text-danger'>
                  Out of stock
                </span>}
              </h5>
              <h5>Rating {data?.data.data.ratingsAverage} <i className='fa fa-star text-warning'></i></h5>
            </div>
            <div className='mt-3 d-flex justify-content-between flex-row'>
              <button onClick={() => addProductToCart(id || '')} className="btn bg-primary text-white w-50">Add to Cart</button>
              {isWish ?
                <button onClick={toggleProductToWish} className='bg-transparent border-0 p-0 mt-2'><i className='fa fa-heart  text-danger fs-4'></i></button>
                : <button onClick={toggleProductToWish} className='bg-transparent border-0 p-0 mt-2'><i className='fa fa-heart text-black fs-4'></i></button>
              }
            </div>
          </div>

        </div>

      </div>
    </div>
  )


  // return (
  //   <div className="container py-5">
  //     <div className="row">
  //       <div className="col-md-4">
  //         <img style={{ height: "400px" }} src={data?.data.data.imageCover} alt="" />
  //       </div>
  //       <div className="col-md-8">
  //         <div className='p-4'>
  //           <div>
  //             <h1>{data?.data.data.title}</h1>
  //             <p className='mt-2'>{data?.data.data.description}</p>
  //           </div>
  //           <div className='mt-4'>
  //             <p>{data && "Category: " + data.data.data.category.name}</p>
  //             <p>{data && "Brand: " + data.data.data.brand.name}</p>
  //             <p>{data && "Price: " + data.data.data.price}</p>
  //           </div>
  //           <button onClick={()=>addProduct(id || '')} className="btn bg-main text-white w-100 mt-5">Add to Cart</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}
