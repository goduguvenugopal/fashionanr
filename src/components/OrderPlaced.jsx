import React from 'react'
import "../css/order.css"
import { Link } from 'react-router-dom'


const OrderPlaced = () => {


  return (
    <div className='container order-placed-card'>
        <div style={{width:"20rem" ,height:"20rem" , position:"relative"}} className='bg-white d-flex justify-content-center align-items-center'> 
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
            <h3 className='bg-white fw-bold mb-2'>Order Placed</h3>
             <h5 className='bg-white text-secondary'>Track Your <Link className='bg-white fw-bold' style={{textDecoration:"none"}} to="/orders">Order</Link></h5>
        <Link style={{textDecoration:"none"}}className='mt-2 fw-bold fs-4 btn bg-primary text-white' to="/">Continue Shopping</Link>
         </div>
        </div>
  )
}

export default OrderPlaced