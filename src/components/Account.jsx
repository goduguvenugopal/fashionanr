import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../index.css"

const Account = () => {

    const [token, setToken] = useContext(tokenContext)
    const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)


    useEffect(() => {

        // fetching user details name function 
        const getUserFunc = async () => {

            try {
                const response = await axios.get("https://fashionkart-server.onrender.com/authentication/getuser", {
                    headers: {
                        token: token
                    }
                })

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
        <div className='container bg-white text-center fs-4 fw-bold pt-3 pb-3' style={{ marginTop: "4.5rem" }}>
            <h5 className='text-start bg-white'>Hey ! Fashionkart Customer</h5>
            <div className=' bg-white pt-3 pb-2'>

                <i class="fa-regular fa-circle-user account-image mb-2" style={{ marginRight: "0.4rem" }}></i>

                <h5 className='bg-white mt-3 fw-bold' > {JSON.parse(localStorage.getItem("userName"))}</h5>
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
                    <div className='order-card-profile'>

                        <i class="fa-solid fa-headset order-icon"></i>
                        <h5 className='bg-white orders-text-pro'>Help Center</h5>

                    </div>

                </div>

            </div>
            <hr />


            <div className='text-start mt-3 pt-3 bg-white p-3'>
                <h4 className='fw-bold bg-white'>Account Settings</h4>


                <div className='bg-white d-flex align-items-center mt-3 pt-3'>
                    <i class="fa-solid fa-user account-section-icons"></i>
                    <h5 className='bg-white account-setting-text'>Edit Profile</h5>
                </div>
                <div className='bg-white d-flex align-items-center mt-3 pt-1'>
                    <i class="fa-solid fa-credit-card account-section-icons" style={{ fontSize: "17px" }}></i>
                    <h5 className='bg-white account-setting-text'>Saved Cards & Wallets</h5>
                </div>
                <div className='bg-white d-flex align-items-center mt-3 pt-1'>
                    <i class="fa-solid fa-location-dot account-section-icons"  style={{ marginRight: "1.6rem" }}></i>
                    <h5 className='bg-white account-setting-text'>Saved Addresses</h5>
                </div>
                <div className='bg-white d-flex align-items-center mt-3 pt-1'>
                    <i class="fa-solid fa-bell account-section-icons"></i>
                    <h5 className='bg-white account-setting-text'>Notification Settings</h5>
                </div>
            </div><hr />

            <div className='text-start m bg-white p-3'>
                <h4 className='fw-bold bg-white'>Feedback & Information</h4>


                <div className='bg-white d-flex align-items-center mt-3 pt-3'>
                    <i class="fa-solid fa-file account-section-icons"></i>
                    <h5 className='bg-white account-setting-text'>Terms, policies and licenses</h5>
                </div>
                <div className='bg-white d-flex align-items-center mt-3 pt-1'>
                    <i class="fa-solid fa-circle-question account-section-icons" style={{ fontSize: "19px" }} ></i>
                    <h5 className='bg-white account-setting-text'>Saved Cards & Wallets</h5>
                </div>

            </div><hr />

            <div className='p-4 bg-white'>
                {spinner ? <button  className="logout-bt" type="button" disabled="">
                                    <span
                                        className="spinner-border bg-transparent spinner-border-sm "
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="visually-hidden">Loading...</span>
                                </button>: <button onClick={logout} className='logout-bt'>Log out</button>
            }
                 </div>


        </div>



    )
}

export default Account