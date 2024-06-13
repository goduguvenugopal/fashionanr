import React, { useEffect, useState } from 'react'
import "../css/products.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "../css/order.css"
import "../css/cart.css"


const Payment = () => {
    const [data, setData] = useState([])
    const { paymentId } = useParams()
    const [loader, setLoader] = useState(false)


    const API = "https://fashionkart-server.onrender.com"

    // fetching single product by id 
    useEffect(() => {

        const getSingle = async () => {
            setLoader(true)
            try {
                const response = await axios.get(`${API}/product/findproduct/${paymentId}`)

                setData(response.data.data)
                setLoader(false)

            } catch (err) {
                setLoader(false)
                console.log(err)
            }
        }


        getSingle()




    }, [paymentId])



    return (
        <div className='container bg-white py-5 pb-3 pt-3 px-3' id='single-product-main-card'>
            <h5 className='bg-white'>Payments</h5>


            <div className="accordion mt-3 bg-white" id="accordionExample">
                <div className="accordion-item bg-white">
                    <h2 className="accordion-header" id="headingOne">
                        <div
                            className="accordion-button text-primary d-flex gap-3"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            <h5 className='bg-transparent'>Total Amount</h5>
                            {loader ? <div className=" bg-transparent mb-1" disabled>
                                <span className="spinner-border bg-transparent text-primary spinner-border-sm " style={{ height: "20px", width: "20px" }} role="status" aria-hidden="true"></span>
                                <span className="visually-hidden">Loading...</span>
                            </div> : <div className='d-flex bg-transparent mt-1'>
                                <i class="fa-solid fa-indian-rupee-sign bg-transparent" id='totalAmount-rupee'></i>

                                <h6 className='bg-transparent'>{data.price}</h6>
                            </div>}


                        </div>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show bg-white"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body bg-transparent">
                            <div className='d-flex justify-content-between bg-white  '>
                                <h5 className='bg-transparent'>Price</h5>
                                <div className='d-flex  bg-transparent '>
                                    <i class="fa-solid fa-indian-rupee-sign  bg-transparent " id='totalAmount-rupee'></i>
                                    <h6 className=' bg-transparent '>{data.price}</h6></div>

                            </div>

                            <div className='d-flex justify-content-between  bg-transparent  '>
                                <h5 className=' bg-transparent  '>Delivery Charges</h5>
                                <div className='d-flex  bg-transparent '>

                                    <h6 className=' bg-transparent  text-success'>FREE Delivery</h6></div>

                            </div>
                        </div>
                    </div>
                </div>

                <hr className='my-4' />
                <div className="accordion-item bg-white">
                    <h2 className="accordion-header bg-white" id="headingTwo">
                        <div
                            className="accordion-button border collapsed bg-white"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            <div className='bg-transparent d-flex flex-column align-items-start'>
                                <div className='bg-white d-flex flex-row align-items-center gap-3'>
                                    <i className="fa-solid fa-credit-card account-section-icon mb-1" style={{ fontSize: "20px" }}></i>
                                    <h5 className='bg-white'>Credit / ATM Card</h5>
                                </div>

                                <div className='bg-white'>
                                    <h6 className='bg-white rbi-text'>Add and Secure cards as per RBI guidelines</h6>
                                </div>
                            </div>




                        </div>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body bg-white row gap-2">

                            <div className="col-12 col-md-5 bg-white">
                                <label htmlFor="validationCustom01" className="form-label bg-white">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-white"
                                    placeholder='XXXX XXXX XXXX XXXX'
                                    required
                                />

                            </div>
                            <div className="col-5 col-md-3 bg-white">
                                <label htmlFor="validationCustom01" className="form-label bg-white">
                                    Card Validity
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-white"
                                    placeholder='MM / YY'
                                    required
                                />

                            </div>
                            <div className="col-5 col-md-3 bg-white">
                                <label htmlFor="validationCustom01" className="form-label bg-white">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-white"
                                    placeholder='CVV'
                                    required
                                />

                            </div>

                            <div className="col-12 col-md-3 bg-white mt-2 ">

                                <div className='btn bg-warning fs-6 fw-bold d-flex align-items-center  justify-content-center'>
                                   <span className='bg-transparent' style={{marginRight:"0.5rem"}}>Pay</span>
                                    <i class="fa-solid fa-indian-rupee-sign  bg-transparent " id='totalAmount-rupee'></i>{data.price}
                                    </div>

                            </div>

                        </div>
                    </div>
                </div>


                {/* <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            Accordion Item #3
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden
                            by default, until the collapse plugin adds the appropriate classes that
                            we use to style each element. These classes control the overall
                            appearance, as well as the showing and hiding via CSS transitions. You
                            can modify any of this with custom CSS or overriding our default
                            variables. It's also worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the transition does limit
                            overflow.
                        </div>
                    </div>
                </div> */}
            </div>


        </div>
    )
}

export default Payment