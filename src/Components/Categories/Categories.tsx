import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import toast from 'react-hot-toast'

export default function Categories() {
    const { isError, isLoading, data} = useQuery('getCategories', getCategories)

    async function getCategories() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    function handleClick() {
        toast('not implemented by backend yet.')
        
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

    return (
        <div className="container py-5">
            <div className="row g-3">
                {data?.data.data.map((category: any) => {
                    return (
                        <div key={category._id} className="col-md-4 col-lg-3 col-sm-6">
                                <div onClick={handleClick} className="card cursor-pointer" >
                                    <img src={category.image} className="w-100" style={{ height: '300px' }} alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{category.name}</h5>
                                    </div>
                                </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
