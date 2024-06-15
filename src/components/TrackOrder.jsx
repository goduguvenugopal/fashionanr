import React, { useState, useEffect } from 'react'
import "../css/cart.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "../css/order.css"
import Footer from "./Footer"
const TrackOrder = () => {
    const [data, setData] = useState([])
    const { orderId } = useParams()
    const [loader, setLoader] = useState(false)

    const API = "https://fashionkart-server.onrender.com"

    // fetching single product by id 
    useEffect(() => {

        const getSingle = async () => {
            setLoader(true)
            try {
                const response = await axios.get(`${API}/product/findproduct/${orderId}`)

                setData(response.data.data)
                setLoader(false)

            } catch (err) {
                setLoader(false)
                console.log(err)
            }
        }
        getSingle()

    }, [orderId])


    return (
<> 
        <div className='container bg-white px-3 pt-3' id='cart-main-cont'>
            <h4 className='bg-white mt-2'>Order Details</h4>

            <hr className='my-3' />
            <h6 className='bg-white mt-2 orderid-text'>Order ID - {data._id}</h6>

            <hr className='my-3' />
            <div className='cart-item-card bg-white  pt-2'>
                <div>
                    {loader ? <div className="cart-item-img  d-flex align-items-center justify-content-center " disabled>
                        <span className="spinner-border bg-white text-primary spinner-border-sm " style={{ height: "25px", width: "25px" }} role="status" aria-hidden="true"></span>
                        <span className="visually-hidden">Loading...</span>
                    </div> : <img src={data.image} alt={data.category} className='cart-item-img bg-white' />}


                </div>
                <div className=' bg-white pt-3 px-3 '>
                    <h5 className='text-uppercase bg-white cat-txt' >{data.category}</h5>
                    <h4 className=' bg-white cat-title-text' >{data.title}</h4>
                    <div className='bg-success mr-2 rating-card mt-3' >
                        <h6 className='bg-success text-white mt-2 '>{data.rating}</h6>
                        <i className='fa fa-star bg-success text-white ' style={{ fontSize: "13px" }}></i>
                    </div>
                    <h6 className='bg-white mt-1'>Rating</h6>
                    <div className=' d-flex justify-content-flex-start align-items-center gap-1 bg-white '>
                        <i class="fa-solid fa-indian-rupee-sign bg-white  " id='indian-rupee'></i>
                        <h4 className='fs-5 bg-white'>{data.price}</h4>
                    </div>
                </div>
            </div>
            <hr className='my-3' />
            <div className='bg-white'>
                <div className='track-card'>
                    <div className='track-check-card'>
                        <i className="fa-solid fa-check track-check-icon "></i>
                    </div>
                    <div className='bg-transparent'>
                        <h5 className='bg-transparent order-confirm-text'>Order Confirmed, Today</h5>
                        <h6 className='bg-transparent order-confirm-subtext'>Your Order has been Placed.,  </h6>
                    </div>

                </div>
                <div className='track-card1'>
                    <div className='track-check-card1'>
                    </div>
                    <div className='bg-transparent'>
                        <h5 className='bg-transparent order-confirm-text1'>Shipped, Expected By </h5>
                    </div>

                </div>
                <div className='track-card1'>
                    <div className='track-check-card1'>
                    </div>
                    <div className='bg-transparent'>
                        <h5 className='bg-transparent order-confirm-text1'>Out For Delivery</h5>
                    </div>

                </div>
                <div className='track-card1'>
                    <div className='track-check-card1'>
                    </div>
                    <div className='bg-transparent'>
                        <h5 className='bg-transparent order-confirm-text1'>Delivery, </h5>
                    </div>

                </div>
            </div>

            <h6 style={{fontSize:"15px" , cursor:"pointer"}} className='bg-white text-primary mt-3'>See All Updates</h6>
       
            <hr className='my-3' />
       <div className='bg-white cancel-card pb-4'>
        <div className='cancel-text'>
               <h5 className='bg-white  '>Cancel</h5>
               </div>
               <div className='cancel-text' >
               <h5 className='bg-white '>Chat with us</h5>
               </div>
         
       </div>
       
        </div>

        <Footer/>
        </>
    )
}

export default TrackOrder