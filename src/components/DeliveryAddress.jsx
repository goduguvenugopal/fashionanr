import React, { useContext, useEffect, useState } from 'react'
import '../css/delivery.css'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import { addressContext, tokenContext } from '../App';


const DeliveryAddress = () => {
    const [data, setData] = useState([])
    const [token] = useContext(tokenContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("")
    const [userId, setUserId] = useState("")
    const [spinner, setSpinner] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [toggle1, setToggle1] = useState(true)
    const [code, setCode] = useState("")
    const [loader, setLoader] = useState(false)
    const [remov, setRemov] = useState("")
    const [deliveryAddress, setDeliveryAddress] = useContext(addressContext)


    // save delivery address function 

    const formData = { name, mobile, email, code, address, userId }

    const formFunc = async (e) => {
        e.preventDefault();
        setSpinner(true)
        try {
            await axios.post("https://fashionanr-backend.onrender.com/address/add-address", formData)
            toast.success("Address Added successfully")
            setName("")
            setMobile("")
            setCode("")
            setAddress("")
            setEmail("")
            setSpinner(false)


        }
        catch (error) {
            setSpinner(false)
            console.log(error)
            toast.error("Please try again Address not Added ")
        }
    }


    useEffect(() => {

        // fetching user id function 
        const getUserFunc = async () => {

            try {
                const response = await axios.get("https://fashionkart-server.onrender.com/authentication/getuser", {
                    headers: {
                        token: token
                    }
                })
                setUserId(response.data._id)

            } catch (error) {
                console.log(error)
            }
        }

        // fetching user address 

        const fetchAddress = async () => {
            setLoader(true)
            try {
                const response = await axios.get(`https://fashionkart-server.onrender.com/address/get-address/${userId}`)
                setData(response.data)
                setLoader(false)

            } catch (error) {
                console.log(error)

            }
        }


        fetchAddress()
        getUserFunc()


    }, [token, userId, spinner])



    // delete address function 

    const deleteAddress = async (delelteId) => {
        setRemov(delelteId)
        try {
            await axios.delete(`https://fashionkart-server.onrender.com/address/delete-address/${delelteId}`)
            toast.success("Address has deleted Successfully")
            const deleted = data.filter((item) => item._id !== delelteId)
            setData(deleted)
            setRemov("")
        } catch (error) {
            console.log(error)
            toast.error("Address has not deleted")
            setRemov(false)
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


    // set default address function 

    const setDefaultFunc = (defAddress) => {
        const defaulted = data.find((item) => item._id === defAddress)
        setDeliveryAddress(defaulted)
        localStorage.setItem("userAddress", JSON.stringify(defaulted))

        toast.success("This is the Default Address for All Delivery")
    }




    return (
        <>
            <ToastContainer className="bg-transparent" />

            <div className='container delivery-main-card'>
                <div className='address-buttons-card bg-white'>
                    <button onClick={addressFunc} className={toggle ? "add-address-bt" : 'show-address-bt'}>Address</button>
                    <button onClick={addFunc} className={toggle1 ? "add-address-bt" : 'show-address-bt'}>+ Add Address</button>
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
                                    name='name'
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
                                    name='mobile'
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
                                 Email
                                </label>
                                <input
                                    name='email'
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="Enter Your Email"
                                />
                            </div>
                            <div className="mb-3 bg-white">
                                <label htmlFor="exampleFormControlInput1" className="bg-white form-label">
                                    Pin code
                                </label>
                                <input
                                    name='code'
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
                                    name='address'
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

                    {toggle1 ? <> {data.length === 0 ?

                        <div style={{ height: "80vh" }} className='container d-flex justify-content-center align-items-center bg-white fs-5'>
                            {loader && <div className="d-flex justify-content-center align-items-center bg-white" style={{ height: "20rem" }}>
                                <div className="spinner-border bg-white text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}

                            {!loader ? <h5 className='bg-white'>No Saved Addresses</h5> : ""}




                        </div>
                        :
                        <> <div className='bg-white all-address-card'>


                            <h5 className='bg-white text-start'>Saved Addresses ({data.length})</h5>


                            {data.map((item) => (
                                <div key={item._id} className='p-3 bg-white results-address-card '>

                                    <h5 className='bg-white mt-3'>{item.name}</h5>
                                    <h6 style={{ fontSize: "0.9rem" }} className='bg-white text-secondary mt-3'>{item.email}</h6>
                                    <h6 className='bg-white my-2'>{item.address} {item.code}</h6>
                                    <h6 style={{ fontSize: "0.9rem" }} className='bg-white text-secondary'>{item.mobile}</h6>
                                   

                                    {deliveryAddress._id === item._id ? <button className='default-bt'>Default</button> :

                                        <button onClick={() => setDefaultFunc(item._id)} className='set-default-bt'>Set Default</button>
                                    }

                                    {remov === item._id ? <h6 style={{ border: "none" }} className="del-delete-icon"  disabled>
                                        <span className="spinner-border bg-white text-primary spinner-border-sm " role="status" aria-hidden="true"></span>
                                        <span className="visually-hidden">Loading...</span>
                                    </h6> : <h6 onClick={() => deleteAddress(item._id)} className=" del-delete-icon">Remove</h6>
                                    }

                                </div>
                            ))}





                        </div></>}</>



                        : ""}



                </div>


            </div >
            <Footer />
        </>
    )
}

export default DeliveryAddress