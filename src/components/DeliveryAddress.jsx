import React, { useState } from 'react'
import '../css/delivery.css'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';


const DeliveryAddress = () => {

    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("")
    const [spinner, setSpinner] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [toggle1, setToggle1] = useState(true)
    const [code , setCode] = useState("")

    const formData = { name, mobile, code , address }

    const formFunc = async (e) => {
        e.preventDefault();
        setSpinner(true)
        try {
            await axios.post("https://fashionkart-server.onrender.com/mail/sendmail", formData)
            toast.success("Address Added successfully")
            setName("")
            setMobile("")
            setCode("")
            setAddress("")
            setSpinner(false)
        }
        catch (error) {
            setSpinner(false)
            console.log(error)
            toast.error("Please try again Address not Added ")
        }
    }

    // toggle function 

    const addFunc = () => {
        setToggle(true)
        setToggle1(false)
    }


    const addressFunc = () => {
        setToggle(false)
        setToggle1(true)
    }

    return (
        <>
            <ToastContainer className="bg-transparent" />

            <div className='container delivery-main-card'>
                <div className='address-buttons-card bg-white'>
                    <button onClick={addressFunc}  className={toggle ? "add-address-bt" : 'show-address-bt'}>Address</button>
                    <button   onClick={addFunc} className= {toggle1 ? "add-address-bt" : 'show-address-bt'}>Add Address</button>
                </div>
                <hr />
                <div className='delivery-sub-card'>
                    {toggle ?
                        <form onSubmit={formFunc} className='bg-white add-address-card pt-3'>
                            <h5 className='bg-white text-center'>Add Address</h5><hr className='mt-0' />
                            <div className="mb-3 bg-white">
                                <label htmlFor="exampleFormControlInput1" className="bg-white form-label">
                                    Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="Enter Your Name"
                                />
                            </div>
                            <div className="mb-3 bg-white">
                                <label htmlFor="exampleFormControlInput1" className="bg-white form-label">
                                    Phone Number
                                </label>
                                <input
                                    required
                                    type="number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="Enter Mobile Number"
                                />
                            </div>
                            <div className="mb-3 bg-white">
                                <label htmlFor="exampleFormControlInput1" className="bg-white form-label">
                                    Pin code
                                </label>
                                <input
                                    required
                                    type="number"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="Enter Pin Code"
                                />
                            </div>
                            <div className="mb-3 bg-white">
                                <label htmlFor="exampleFormControlTextarea1" className="bg-white form-label">
                                    Address
                                </label>
                                <textarea
                                    required
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows={3}
                                    placeholder="Enter Delivery Address "
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}

                                />
                            </div>
                            {spinner ? <button style={{ width: "150px" }} className="btn btn-primary " type="button" disabled>
                                <span className="spinner-border bg-primary spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="visually-hidden">Loading...</span>
                            </button> : <button style={{ width: "150px" }} type='submit' className='btn bg-primary text-white '>Add Address</button>}


                        </form> : ""}

                    {toggle1 ? <div className='px-3 bg-white add-address-card pt-3'>
                        <h5 className='bg-white text-center'>Your Address</h5><hr/>
                        <h5 className='bg-white'>Name : Venugopal</h5>
                        <h5 className='bg-white'>Mobile : 115649158</h5>
                        <h5 className='bg-white'>Pin code : 518412</h5>
                        <h5 className='bg-white'>Address : njaneyanager pagidyala kurnool 518412</h5>


                    </div> : ""}



                </div>


            </div>
            <Footer />
        </>
    )
}

export default DeliveryAddress