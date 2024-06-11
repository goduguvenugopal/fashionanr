import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../App'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import "../index.css"
import "../css/cart.css"

const Account = () => {
    const [data, setData] = useState([])
    const [token, setToken] = useContext(tokenContext)
    const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)
    const [modal, setModal] = useState(false)
    const [deleSpinner, setDeleSpinner] = useState(false)


    useEffect(() => {

        // fetching user details name function 
        const getUserFunc = async () => {

            try {
                const response = await axios.get("https://fashionkart-server.onrender.com/authentication/getuser", {
                    headers: {
                        token: token
                    }
                })
                setData(response.data)
                localStorage.setItem("userName", JSON.stringify(response.data.name))


            } catch (error) {
                console.log(error)
            }
        }
        getUserFunc()

        if (!token) {
            navigate("/login")
        }

    }, [token, navigate])



    // delete user by id function 

    const deleteUser = async (userId) => {
        setDeleSpinner(true)
        setModal(false)
        try {
            await axios.delete(`https://fashionkart-server.onrender.com/authentication/delete/${userId}`)
            setToken("")
            localStorage.removeItem("token")
            localStorage.removeItem("userName")

        } catch (error) {
            console.log(error)
            setDeleSpinner(false)


        }
    }



    // logout function 
    const logout = () => {
        setSpinner(true)
        const timer = setTimeout(() => {
            localStorage.removeItem("token")
            localStorage.removeItem("userName")
            setToken("")
        }, 1300);


        return () => clearTimeout(timer)
    }

    return (
        <div className='container bg-white text-center fs-4 fw-bold pt-3 pb-3  ' id='account-main-card'>
            <h5 className='text-start bg-white'>Hey ! Fashionkart Customer</h5>
            <div className=' bg-white pt-3 pb-2'>

                <i class="fa-regular fa-circle-user account-image mb-2" style={{ marginRight: "0.4rem" }}></i>

                <h5 style={{ textTransform: "capitalize" }} className='bg-white mt-3 fw-bold' > {JSON.parse(localStorage.getItem("userName"))}</h5>
            </div>
            <hr />

            <div className='row bg-white'>
                <div className='col-6 col-md-3 bg-white'>
                    <div className='order-card-profile'>

                        <i class="fa-solid fa-box order-icon"></i>
                        <h5 className='bg-white orders-text-pro'>Orders</h5>

                    </div>

                </div>
                <div className='col-6 col-md-3  bg-white'>
                    <div className='order-card-profile'>
                        <i class="fa-solid fa-heart order-icon"></i>
                        <h5 className='bg-white orders-text-pro'>Wishlist</h5>

                    </div>

                </div>



                <div className='col-6  col-md-3 bg-white'>
                    <div className='order-card-profile'>
                        <i class="fa-solid fa-gift order-icon"></i>
                        <h5 className='bg-white orders-text-pro'>Coupons</h5>

                    </div>

                </div>
                <div className='col-6 col-md-3 bg-white'>
                    <Link style={{textDecoration:"none"}} to="/contact"> 
                    <div className='order-card-profile text-dark'>

                        <i class="fa-solid fa-headset order-icon"></i>
                        <h5 className='bg-white orders-text-pro'>Contact Us</h5>

                    </div>
                    </Link>


                </div>

            </div>
            <hr />


            <div className='text-start mt-3 pt-3 bg-white p-3'>
                <h4 className='fw-bold bg-white'>Account Settings</h4>


                <div className='bg-white d-flex align-items-center mt-3 pt-3'>
                    <i className="fa-solid fa-user account-section-icons"></i>
                    <h5 className='bg-white account-setting-text'>Edit Profile</h5>
                </div>
                <div className='bg-white d-flex align-items-center mt-3 pt-1'>
                    <i className="fa-solid fa-credit-card account-section-icons" style={{ fontSize: "17px" }}></i>
                    <h5 className='bg-white account-setting-text'>Saved Cards & Wallets</h5>
                </div>
                <Link style={{ textDecoration: "none" }} to="/delivery">
                <div className='bg-white d-flex align-items-center mt-3 pt-1'>
                    <i className="fa-solid fa-location-dot account-section-icons" style={{ marginRight: "1.6rem" }}></i>
                    <h5 className='bg-white account-setting-text'>Saved Addresses</h5>
                </div>
                </Link>

                <div className='bg-white d-flex align-items-center mt-3 pt-1'>
                    <i className="fa-solid fa-bell account-section-icons"></i>
                    <h5 className='bg-white account-setting-text'>Notification Settings</h5>
                </div>
                <Link style={{ textDecoration: "none" }} to="/password">
                    <div className='bg-white d-flex align-items-center mt-3 pt-1'>


                        <i className="fa-solid fa-key account-section-icons" style={{ marginRight: "1.2rem" }}></i>
                        <h5 className='bg-white account-setting-text'>Change Password</h5>
                    </div>
                </Link>

            </div><hr />
            <div className='text-start m bg-white p-3'>
                <h4 className='fw-bold bg-white'>Earn with Fashionanr</h4>


                <div className='bg-white d-flex align-items-center mt-3 pt-3'>
                    <i className="fa-solid fa-star account-section-icons" style={{ marginRight: "1.0rem" }}></i>
                    <h5 className='bg-white account-setting-text'>Fashionanr Creator Studio</h5>
                </div>

                <a style={{ textDecoration: "none" }} href='https://fashionanr-dashboard.netlify.app/' target='_self' className='bg-white d-flex align-items-center mt-3 pt-1'>
                    <span class="material-symbols-outlined bg-white account-section-icons" style={{ marginRight: "1.0rem" }}>
                        storefront
                    </span>
                    <h5 className='bg-white account-setting-text'>Sell on Fashionanr</h5>
                </a>

            </div><hr />

            <div className='text-start m bg-white p-3'>
                <h4 className='fw-bold bg-white'>Feedback & Information</h4>


                <div className='bg-white d-flex align-items-center mt-3 pt-3'>
                    <i className="fa-solid fa-file account-section-icons"></i>
                    <h5 className='bg-white account-setting-text'>Terms, policies and licenses</h5>
                </div>
                <div className='bg-white d-flex align-items-center mt-3 pt-1'>
                    <i className="fa-solid fa-circle-question account-section-icons" style={{ fontSize: "19px" }} ></i>
                    <h5 className='bg-white account-setting-text'>Saved Cards & Wallets</h5>
                </div>

            </div><hr />

            <div className='px-4 bg-white'>
                {spinner ? <button className="logout-bt" type="button" disabled="">
                    <span
                        className="spinner-border bg-transparent spinner-border-sm "
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                </button> : <button onClick={logout} className='logout-bt'><i className="fa-solid fa-power-off bg-white " style={{ marginRight: "0.5rem" }}></i>Log out</button>
                }
            </div>

            <div className='px-4 pt-3 bg-white'>
                {deleSpinner ? <button className="logout-bt" type="button" disabled="">
                    <span
                        className="spinner-border bg-transparent spinner-border-sm "
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                </button> : <button onClick={() => setModal(true)} className='logout-bt text-danger'><i className="fa-solid fa-trash bg-white text-danger fs-5" style={{ marginRight: "0.5rem" }}></i>Delete Account</button>
                }
            </div>

{/* delete account modal  */}
            {modal ?
                (<div className='modal-card px-3'>
                    <div className="card shadow" style={{ width: "21rem" }}>
                        <div className="bg-white card-header fw-bold d-flex justify-content-between align-items-center">Delete Account
                            <i style={{ cursor: "pointer" }} onClick={() => setModal(false)} class="fa-solid fa-xmark bg-white"></i></div>

                        <div className="card-body  bg-white pb-0">
                            <h6 className="text-secondary bg-white ">
                                Are You Sure Want To Delete This Account ?
                            </h6>
                        </div>
                        <div className='card-body  d-flex justify-content-between pb-3  bg-white'>
                            <button onClick={() => setModal(false)} style={{ width: "8.5rem" }} className="btn btn-outline-dark">
                                CANCEL
                            </button>
                            <button onClick={() => deleteUser(data._id)} style={{ width: "8.5rem" }} className="btn btn-danger">
                                DELETE
                            </button></div>
                    </div>

                </div>) : ""}


        </div>



    )
}

export default Account