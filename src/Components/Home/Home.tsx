import axios from 'axios'
import { useQuery } from 'react-query'
import toast from 'react-hot-toast';
import './Home.css'
import HomeBenefits from './HomeComponents/HomeBenefits/HomeBenefits'
import Top3Categories from './HomeComponents/HomeTop3Categories/Top3Categories'
import HomeMainSlider from './HomeComponents/HomeMainSlider/HomeMainSlider'
import ProductCard from '../ProductCard/ProductCard'

export default function Home() {
  // get products
  const { isError, isLoading, data,
    // refetch, //refetch function to set the enabled property to true
  } = useQuery('getAllProducts', getAllProducts, {
    cacheTime: 1000 * 60, //cache for 1 minute after navigating to another page
    refetchInterval: 2000 * 60, //refetch every 2 minutes
    enabled: true, //default value
  })
  async function getAllProducts() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }


  if (isError || isLoading) { //loading just for the first time regardless the isFetching 
    if (isError) toast.error("Error fetching data")
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <HomeMainSlider />
      <div className="container py-5">
        <HomeBenefits />
        <Top3Categories />
        <h2>Products</h2>
        <div className="row g-3">
          {data?.data.data.map((product: any) => {
            return (
              <div className=" col-md-4 col-lg-3 col-sm-6 d-flex" key={product.id}>
                <ProductCard product={product} />
              </div>
            )
          })}
        </div>
      </div >
    </>
  )
}