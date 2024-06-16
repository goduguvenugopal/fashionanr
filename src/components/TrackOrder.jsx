import React, { useState, useEffect} from 'react'
import "../css/cart.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "../css/order.css"
import Footer from "./Footer"
import "../css/cart.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TrackOrder = () => {

    const [data, setData] = useState([])
    const { orderId } = useParams()
    const [loader, setLoader] = useState(false)
    const [shipped, setShipped] = useState("")
    const [deliveryDate, setDeliveryDate] = useState("")
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    const API = "https://fashionkart-server.onrender.com"

    // fetching single product by id 
    useEffect(() => {

        const getSingle = async () => {
            setLoader(true)
            try {
                const response = await axios.get(`${API}/order/get-single-order/${orderId}`)

                setData(response.data)
                setLoader(false)

            } catch (err) {
                setLoader(false)
                console.log(err)
            }
        }
        getSingle()


        // shipped date 
        let today = new Date()

        let dayafter = new Date(today)
        dayafter.setDate(today.getDate() + 2)
        setShipped(dayafter.toDateString())

        // delivery expected date 
        let deliveryDate = new Date()
        let afterDayAfter = new Date(deliveryDate)
        afterDayAfter.setDate(deliveryDate.getDate() + 4)
        setDeliveryDate(afterDayAfter.toDateString())

    }, [orderId])


    // cancel order function

    const cancelFunc = async () => {

        try {
            await axios.delete(`${API}/order/delete-order/${orderId}`)

            setModal(false)
            toast.success("Order Has Been Cancelled")
            setTimeout(() => {
                navigate("/orders")
            }, 1000);

        } catch (err) {
            console.log(err)
            toast.success("Please Try Again Order Has Not Been Cancelled")
        }
    }

    return (
        <>
            <ToastContainer className="bg-transparent" />

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
                            <h6 className='bg-transparent order-confirm-subtext'>Your Order has been Placed., {new Date().toDateString()}  </h6>
                        </div>

                    </div>
                    <div className='track-card1'>
                        <div className='track-check-card1'>
                        </div>
                        <div className='bg-transparent'>
                            <h5 className='bg-transparent order-confirm-text1'>Shipped, Expected By {shipped}</h5>
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
                            <h5 className='bg-transparent order-confirm-text1'>Delivery, {deliveryDate}</h5>
                        </div>

                    </div>
                </div>

                <h6 style={{ fontSize: "15px", cursor: "pointer" }} className='bg-white text-primary mt-3'>See All Updates</h6>

                <hr className='my-3' />
                <div className='bg-white cancel-card pb-4'>
                    <div onClick={() => setModal(true)} className='cancel-text'>
                        <h6 className='bg-white '  >Cancel</h6>
                    </div>
                    <div className='cancel-text' >
                        <Link className='bg-white text-dark' style={{ textDecoration: "none" }} to="/contact">  <h6 className='bg-white '>Chat with us</h6></Link>

                    </div>

                </div>

            </div>

            {/* cancel order modal  */}
            {modal ?
                (<div className='modal-card px-3'>
                    <div className="card shadow" style={{ width: "21rem" }}>
                        <div className="bg-white card-header fw-bold d-flex justify-content-between align-items-center">Cancel Order
                            <i style={{ cursor: "pointer" }} onClick={() => setModal(false)} class="fa-solid fa-xmark bg-white"></i></div>

                        <div className="card-body  bg-white pb-0">
                            <h6 className="text-secondary bg-white ">
                                Are You Sure Want To Cancel Order ?
                            </h6>
                        </div>
                        <div className='card-body  d-flex justify-content-between pb-3  bg-white'>
                            <button onClick={() => setModal(false)} style={{ width: "8.5rem" }} className="btn btn-outline-dark">
                                Back
                            </button>
                            <button onClick={cancelFunc} style={{ width: "8.5rem" }} className="btn btn-danger">
                                Cancel Order
                            </button></div>
                    </div>

                </div>) : ""}

            <Footer />
        </>
    )
}

export default TrackOrder