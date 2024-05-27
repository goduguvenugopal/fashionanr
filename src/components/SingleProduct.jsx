import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./products.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'




const SingleProduct = () => {

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const { id } = useParams()


    // fetching single product by id 
    useEffect(() => {
        const getSingle = async () => {
            setLoader(true)
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
                setData(response.data)
                setLoader(false)

            } catch (err) {
                setLoader(false)
                console.log(err)
            }
        }
        getSingle()
    }, [id])

    // loader function

    const Loading = () => {
        return (
            <>
                <div className='container bg-white py-5 ' style={{ marginTop: "5rem" }}>
                    <div className='row'>
                        <div className='col-12 col-md-6 bg-white text-center pb-4 '>
                            <Skeleton height="330px" width="320px" />

                        </div><hr className='d-md-none mb-0 ' />

                        <div className='pb-3 col-12 col-md-6 bg-white pt-3 px-3'>
                            <Skeleton width="170px" height="40px" />
                            <Skeleton className='mt-3' width="400px" height="40px" />
                            <Skeleton className='mt-3' width="400px" height="40px" />
                            <div className='mr-2 mt-2 bg-white' style={{ width: "50px", height: "55px" }}>
                                <Skeleton className='  mt-2' height="40px" />

                            </div>
                            <Skeleton className=' mt-1' width="60px" height="25px" />


                            <Skeleton className='mt-2' width="65px" height="35px" />



                        </div>

                        <hr className=' mb-0 ' />
                        <div className='col-12 bg-white py-3  px-3'>
                            <Skeleton width="400px" height="40px" />
                        </div> <hr className=' mb-0 ' />

                        <div className='col-12 bg-white py-3  px-3'>
                            <Skeleton width="400px" height="40px" />
                        </div> <hr className=' mb-0 ' />
                        <div className='col-12 bg-white py-4  px-3'>
                            <div className='bg-white d-flex align-items-center'>
                                <Skeleton style={{ marginRight: "2rem" }} width="170px" height="45px" />
                                <Skeleton width="170px" height="45px" />

                            </div>
                        </div> <hr className=' mb-0 ' />
                        <div className='col-12 bg-white py-3  px-3'>
                            <div className='bg-white'>
                                <Skeleton width="170px" height="45px" />
                                <Skeleton style={{ marginTop: "1rem" }} width="470px" height="15px" />
                                <Skeleton width="470px" height="15px" />
                                <Skeleton width="470px" height="15px" />
                                <Skeleton width="470px" height="15px" />
                            </div>
                        </div>




                    </div>
                </div>

            </>
        )
    }


    // delivery date logic code 

    let today = new Date()

    let dayafter = new Date(today)
    dayafter.setDate(today.getDate() + 3)

    let date = dayafter.toDateString()

    // single product mapping function 

    const ShowProduct = () => {
        return (
            <>
                <div className='container bg-white py-5 ' style={{ marginTop: "5rem" }}>
                    <div className='row'>
                        <div className='col-12 col-md-6 bg-white text-center pb-4 '>
                            <img height="330px" width="320px" src={data.image} className='single-img' alt={data.category} />

                        </div><hr className='d-md-none mb-0 ' />

                        <div className='pb-3 col-12 col-md-6 bg-white pt-3 px-3'>
                            <h5 className='text-uppercase text-black-50 bg-white' >{data.category}</h5>
                            <h4 className='display-5 bg-white' >{data.title}</h4>
                            <div className='bg-success mr-2 rating-card mt-3' >
                                <h6 className='bg-success text-white mt-2'>{data.rating && data.rating.rate}</h6>
                                <i className='fa fa-star bg-success text-white ' style={{ fontSize: "13px" }}></i>
                            </div>
                            <h6 className='bg-white mt-1'>Ratings</h6>
                            <div className=' d-flex justify-content-flex-start align-items-center gap-1 bg-white '>
                                <i class="fa-solid fa-indian-rupee-sign bg-white " id='rupee-icon'></i>
                                <h4 className='fs-1 bg-white'>{data.price}</h4>
                            </div>


                        </div>
                        <hr className=' mb-0 ' />
                        <div className='col-12 bg-white py-3  px-3'>
                            <div className='bg-white d-flex align-items-center'>
                                <i class="fa-solid fa-truck bg-white mb-1 text-secondary" style={{ marginRight: "1rem" }}></i>
                                <h5 className='bg-white'><span className='text-success bg-white'>Free Delivery</span> | Delivery by {date}</h5>
                            </div>
                        </div> <hr className=' mb-0 ' />

                        <div className='col-12 bg-white py-3  px-3'>
                            <div className='bg-white d-flex align-items-center'>

                                <i class="fa-solid fa-tag bg-white mb-1 text-secondary" style={{ marginRight: "1rem", fontSize: "20px", marginBottom: "0.3rem" }}></i>
                                <h5 className='bg-white'>All Offers & Coupons</h5>
                            </div>
                        </div> <hr className=' mb-0 ' />
                        <div className='col-12 bg-white py-4  px-3'>
                            <div className='bg-white d-flex align-items-center'>
                                {!data ?
                                    <Link to="/cart" style={{ textDecoration: "none" }}>
                                        <button className='cart-bt bg-success'> <i style={{ marginRight: "8px" }} class="fa-solid fa-cart-shopping bg-transparent"></i>GO TO CART</button></Link> :
                                    <button className='cart-bt  '> <i style={{ marginRight: "8px" }} class="fa-solid fa-cart-shopping bg-transparent"></i>ADD TO CART</button>}

                                <button className='buy-bt'><i style={{ marginRight: "8px" }} class="fa-solid fa-bolt bg-transparent"></i>BUY NOW</button>
                            </div>
                        </div> <hr className=' mb-0 ' />
                        <div className='col-12 bg-white py-3  px-3'>
                            <div className='bg-white'>
                                <h5 className='bg-white '>Product Description</h5>
                                <h6 className='bg-white text-secondary mt-3'>{data.description}</h6>
                            </div>
                        </div>




                    </div>
                </div>
            </>
        )
    }


    return (
        <div>
            {loader ? <Loading /> : <ShowProduct />}

        </div>
    )

}

export default SingleProduct