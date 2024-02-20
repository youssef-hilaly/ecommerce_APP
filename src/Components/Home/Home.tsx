import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import SimpleSlider from '../Slider/SimpleSlider'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';

export default function Home() {
  // get products
  const { isError, isLoading, data, error,
    // refetch, //refetch function to set the enabled property to true
  } = useQuery('getAllProducts', getAllProducts, {
    cacheTime: 1000 * 60, //cache for 1 minute after navigating to another page
    refetchInterval: 2000 * 60, //refetch every 2 minutes
    enabled: true, //default value
  })
  async function getAllProducts() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  // get categories
  const { isError: isError2, isLoading: isLoading2, data: data2, error: error2,
    // refetch: refetch2, //refetch function to set the enabled property to true
  } = useQuery('getCategories', getCategories, {
    cacheTime: 1000 * 60, //cache for 1 minute after navigating to another page
    refetchInterval: 2000 * 60, //refetch every 2 minutes
    enabled: true, //default value
  })
  async function getCategories() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  const {addToCart} = useContext(cartContext)

  async function addProduct(id: string){
    const toastId = toast.loading("Please wait...")
    const isOk = await addToCart(id);
    isOk? toast.success("Product added to cart", {id: toastId}):
       toast.error("Error adding product to cart", {id: toastId});
  }
  if (isError || isLoading || isError2 || isLoading2) { //loading just for the first time regardless the isFetching 
    if(isError || isError2) toast.error("Error fetching data")
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

      <div className="bg-dark p-2 mb-2">
        <div className="row">
          <div className="col-md-9">
            <div>
              <SimpleSlider slidesToShow={1}>
                <img className='w-100' style={{ height: "300px" }} src={require('../../imgs/slider-image-1.jpeg')} alt="" />
                <img className='w-100' style={{ height: "300px" }} src={require('../../imgs/slider-image-2.jpeg')} alt="" />
                <img className='w-100' style={{ height: "300px" }} src={require('../../imgs/slider-image-3.jpeg')} alt="" />
              </SimpleSlider>
            </div>
          </div>
          <div className="col-md-3">
            <div>
              <img className='w-100 pb-1' style={{ height: "150px" }} src={require('../../imgs/blog-img-1.jpeg')} alt="" />
              <img className='w-100 pt-2' style={{ height: "150px" }} src={require('../../imgs/blog-img-2.jpeg')} alt="" />
            </div>
          </div>
        </div>
      </div>



      <div className='bg-dark p-2 mb-2'>
        <SimpleSlider slidesToShow={4}>
          {data2?.data.data.map((category: any) => {
            return (
              <div key={category['_id']}>
                <img className='w-100' style={{ height: "200px" }} src={category.image} alt="" />
                <p className=" text-white text-center">{category.name}</p>
              </div>
            )
          })}
        </SimpleSlider>
      </div>

      <div className="row g-3">
        {data?.data.data.map((product: any) => {
          return (
            <div className=" col-md-4 col-lg-3 d-flex" key={product.id}>
              <div className=" card product bg-black overflow-hidden">
                <Link to={`/productDetails/${product.id}`}>
                  <img src={product.imageCover} className="card-img-top" alt="..." />
                  <div className="card-body text-white">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title text-main">{product.category.name}</h5>
                      <button className='bg-transparent border-0'><i className='fa fa-heart text-white'></i></button>
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
                </Link>
                <button onClick={()=>addProduct(product.id)} className="btn bg-main text-white w-75 mx-auto">Add to cart</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
