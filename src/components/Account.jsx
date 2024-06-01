import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../index.css"

const Account = () => {
    const [ setData] = useState([])
    const [token] = useContext(tokenContext)
    const navigate = useNavigate()


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
                setData(response.data)

            } catch (error) {
                console.log(error)
            }
        }
        getUserFunc()

        if (!token) {
            navigate("/login")
        }

    }, [token, navigate])


    // const logout = () => {
    //     localStorage.removeItem("token")
    //     setToken("")
    // }

    return (
        <div className='container bg-white text-center fs-4 fw-bold pt-3' style={{ marginTop: "4.5rem" }}>
<h5 className='text-start bg-white'>Hey ! Fashionkart Customer</h5>
            <div className=' bg-white pt-3'>

                <i class="fa-regular fa-circle-user account-image " style={{ marginRight: "0.4rem" }}></i>

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
        <h5 className='bg-white orders-text-pro'>Orders</h5>

        </div>

    </div>
    <div className='col-6 col-md-3 bg-white'>
        <div className='order-card-profile'>
        
        <i class="fa-solid fa-headset order-icon"></i>
        <h5 className='bg-white orders-text-pro'>Orders</h5>

        </div>

    </div>
     
</div>
<hr />
 
</div>


         
    )
}

export default Account