import React, { useContext, useEffect } from 'react'
import "../css/order.css"
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../App'


const OrderPlaced = () => {

    const [token] = useContext(tokenContext)
    const navigate = useNavigate()


    useEffect(() => {

        if(!token) {
            navigate("/")
        }

    }, [token, navigate])

    return (
        <div className='container order-placed-card'>
            <div style={{ width: "20rem", height: "20rem", position: "relative" }} className='bg-white d-flex justify-content-center align-items-center'>
                <div className='check-card'>
                    <i className="fa-solid fa-check check-icon "></i>
                </div>
                <div className="dot-card1"></div>
                <div className="dot-card2"></div>
                <div className="dot-card3"></div>
                <div className="dot-card4"></div>
                <div className="dot-card5"></div>
                <div className="dot-card6"></div>
                <div className="dot-card7"></div>
                <div className="dot-card8"></div>

            </div>
            <div className='bg-white text-center'>
                <h4 className='bg-white fw-bold mb-2'>Order Placed</h4>
                <h6 className='bg-white text-secondary'>Track Your <Link className='bg-white fw-bold' style={{ textDecoration: "none" }} to="/orders">Order</Link></h6>
                <Link style={{ textDecoration: "none" }} className='mt-2 fw-bold fs-6 btn bg-primary text-white' to="/">Continue Shopping</Link>
            </div>
        </div>
    )
}

export default OrderPlaced