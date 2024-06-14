import React, { useContext, useEffect, useState } from 'react'
import "../css/products.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "../css/order.css"
import "../css/cart.css"
import { addressContext } from '../App'


const Payment = () => {

    const [data, setData] = useState([])
    const { paymentId } = useParams()
    const [loader, setLoader] = useState(false)
    const [deliveryAddress] = useContext(addressContext);
    const [subject] = useState("Fashionanr Order Placed Successfully")
    const [to] = useState(deliveryAddress.email)
    const [text] = useState(`Hii ${deliveryAddress.name}, Order successfully Placed, Your order will be delivered In few days .Confirm Your Order No : ${paymentId}. Thank You for shopping with Fashionanr. Track your Order https://fashionanr.netlify.app/`)
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate()



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


    const formData = { to: to, subject: subject, text: text }



    // sending mail to the customer oder details
    const orderConfirmMail = async () => {
        setSpinner(true)
        try {
            const response = await axios.post("https://fashionkart-server.onrender.com/mail/sendmail", formData)

            if (response) {
                setTimeout(() => {
                    navigate("/orderplaced")
                }, 1000);
            }



        }
        catch (error) {
            setSpinner(false)
            console.log(error)

        }
    }





    return (

        <>
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
                                </div> : <div className='d-flex bg-transparent '>
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
                    <div className="accordion-item bg-white ">
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
                                        <i className="fa-solid fa-credit-card account-section-icon mb-2" style={{ fontSize: "20px" }}></i>
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
                            className="accordion-collapse collapse "
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body bg-white row gap-2   ">

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

                                    <div onClick={orderConfirmMail} className='btn bg-warning fs-6 fw-bold d-flex align-items-center  justify-content-center'>
                                        <span className='bg-transparent' style={{ marginRight: "0.5rem" }}>Pay</span>
                                        <i class="fa-solid fa-indian-rupee-sign  bg-transparent " id='totalAmount-rupee'></i>{data.price}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    <hr className='my-4' />

                    <div className="accordion-item bg-white">
                        <h2 className="accordion-header bg-white" id="headingThree">
                            <div
                                className="accordion-button collapsed bg-white border"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                            >
                                <div className='bg-transparent d-flex flex-column align-items-start'>
                                    <div className='bg-white d-flex flex-row align-items-center gap-3'>
                                        <i className="fa-solid  fa-building-columns account-section-icon mb-2" style={{ fontSize: "20px" }}></i>
                                        <h5 className='bg-white'>UPI</h5>
                                    </div>

                                    <div className='bg-white'>
                                        <h6 className='bg-white rbi-text text-success'>Pay by any UPI app</h6>
                                    </div>
                                </div>
                            </div>
                        </h2>
                        <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body bg-white">
                                <details className='bg-white py-3   '>
                                    <summary className='bg-white p-1 fw-bold d-flex justify-content-between fs-5'>
                                        Amazon Pay
                                        <i class="fa-brands fa-cc-amazon-pay bg-white text-primary fs-2"></i>

                                    </summary>

                                    <div className='bg-white d-flex justify-content-center mt-2'>
                                        <div onClick={orderConfirmMail} className='col-12 col-md-4 btn bg-warning fs-6 fw-bold d-flex align-items-center  justify-content-center'>
                                            <span className='bg-transparent' style={{ marginRight: "0.5rem" }}>Pay</span>
                                            <i class="fa-solid fa-indian-rupee-sign  bg-transparent " id='totalAmount-rupee'></i>{data.price}
                                        </div>
                                    </div>


                                </details>
                                <hr className='m-0' />
                                <details className='bg-white py-3   '>
                                    <summary className='bg-white p-1 fs-5 fw-bold d-flex justify-content-between'>
                                        Google Pay
                                        <i class="fa-brands fa-google bg-white text-info fs-2"></i>

                                    </summary>

                                    <div className='bg-white d-flex justify-content-center mt-2'>
                                        <div onClick={orderConfirmMail} className='col-12 col-md-4 btn bg-warning fs-6 fw-bold d-flex align-items-center  justify-content-center'>
                                            <span className='bg-transparent' style={{ marginRight: "0.5rem" }}>Pay</span>
                                            <i class="fa-solid fa-indian-rupee-sign  bg-transparent " id='totalAmount-rupee'></i>{data.price}
                                        </div>
                                    </div>


                                </details>
                                <hr className='m-0' />
                                <details className='bg-white py-3   '>
                                    <summary className='fs-5 bg-white p-1 fw-bold d-flex justify-content-between'>
                                        PayPal
                                        <i class="fa-brands fa-paypal bg-white text-danger fs-2"></i>

                                    </summary>

                                    <div className='bg-white d-flex justify-content-center mt-2'>
                                        <div onClick={orderConfirmMail} className='col-12 col-md-4 btn bg-warning fs-6 fw-bold d-flex align-items-center  justify-content-center'>
                                            <span className='bg-transparent' style={{ marginRight: "0.5rem" }}>Pay</span>
                                            <i class="fa-solid fa-indian-rupee-sign  bg-transparent " id='totalAmount-rupee'></i>{data.price}
                                        </div>
                                    </div>


                                </details>
                                <hr className='m-0' />
                                <details className='bg-white py-3   '>
                                    <summary className='bg-white fs-5 p-1 fw-bold d-flex justify-content-between'>
                                        Whatsapp Pay
                                        <i class="fa-brands fa-whatsapp bg-white text-success fs-2"></i>

                                    </summary>

                                    <div className='bg-white d-flex justify-content-center mt-2'>
                                        <div onClick={orderConfirmMail} className='col-12 col-md-4 btn bg-warning fs-6 fw-bold d-flex align-items-center  justify-content-center'>
                                            <span className='bg-transparent' style={{ marginRight: "0.5rem" }}>Pay</span>
                                            <i class="fa-solid fa-indian-rupee-sign  bg-transparent " id='totalAmount-rupee'></i>{data.price}
                                        </div>
                                    </div>


                                </details>
                                <hr className='m-0' />


                            </div>
                        </div>
                    </div>
                </div>
                <hr className='my-4' />

                <div className="accordion bg-white" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item bg-white">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                            <div
                                className="accordion-button bg-white"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseOne"
                                aria-expanded="true"
                                aria-controls="panelsStayOpen-collapseOne"
                            >
                                <div className='bg-white d-flex flex-row align-items-center gap-3'>
                                    <i className="fa-solid  fa-money-check-dollar account-section-icon mb-2" style={{ fontSize: "20px" }}></i>
                                    <h5 className='bg-white'>Cash on Delivery</h5>
                                </div>
                            </div>
                        </h2>
                        <div
                            id="panelsStayOpen-collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="panelsStayOpen-headingOne"
                        >
                            <div onClick={orderConfirmMail} className="accordion-body  d-flex justify-content-center py-5">
                                <div className='col-12 col-md-4 btn bg-warning fs-6 fw-bold d-flex align-items-center  justify-content-center'>
                                    Place Order
                                </div>

                            </div>
                        </div>
                    </div>

                </div>



            </div>

            {/* payment spinner  */}
            {spinner ?
                <div className='payment-spinner-card'>
                    <div className="container bg-white d-flex flex-column align-items-center justify-content-center shadow" style={{ height: "3rem", width: "3rem", borderRadius: "50%" }}>

                        <div className=" bg-white spinner-border text-primary " role="status">
                            <span className="visually-hidden ">Loading...</span>

                        </div>

                    </div>
                </div>
                : ""}


        </>
    )
}

export default Payment