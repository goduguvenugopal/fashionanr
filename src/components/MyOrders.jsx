import React, { useContext } from 'react'
import { ordersContext } from '../App'
import "../css/cart.css"
import { Link } from 'react-router-dom'

const MyOrders = () => {
  const [orders] = useContext(ordersContext)


  return (
    <div className='container bg-white  pt-3' id='cart-main-cont'>
      <h5 className='bg-white mt-2'>My Orders</h5>
      <hr className='my-3 ' />
      {orders.length ?
        <>
          {orders.map((item) => {
            return (
              <>
                <div key={item._id} className='cart-item-card bg-white px-3 py-3'>


                  <div>
                    <img src={item.image} alt={item.category} className='cart-item-img bg-white' />

                  </div>
                  <div className=' bg-white pt-3 px-3'>
                    <h5 className='text-uppercase bg-white cat-txt' >{item.category}</h5>
                    <h4 className=' bg-white cat-title-text' >{item.title}</h4>
                    <div className=' d-flex justify-content-flex-start align-items-center gap-1 bg-white '>
                      <i class="fa-solid fa-indian-rupee-sign bg-white  " id='indian-rupee'></i>
                      <h4 className='fs-5 bg-white'>{item.price}</h4>
                    </div>


                  </div>


                </div>


                <hr className='my-3 ' />



              </>

            )
          })}
        </>
        : <div style={{ height: "70vh" }} className="bg-white d-flex flex-column justify-content-center align-items-center fw-bold fs-4">
          No Orders
          <Link style={{ textDecoration: "none" }} className='mt-2 fw-bold fs-6 btn bg-primary text-white' to="/">Continue Shopping</Link>
        </div>}

    </div>
  )
}

export default MyOrders