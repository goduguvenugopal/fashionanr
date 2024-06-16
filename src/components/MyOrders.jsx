import React, { useContext, useEffect, useState } from 'react'
import "../css/cart.css"
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../App'
import axios from 'axios'


const MyOrders = () => {
  const [token] = useContext(tokenContext)
  const [userId, setUserId] = useState("")
  const [data, setData] = useState([])
  const [spinner, setSpinner] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    // fetching user id function 
    const getUserFunc = async () => {

      setSpinner(true)
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


    getUserFunc()

    // fetching all orders 
    const getOrders = async () => {

      try {
        const response = await axios.get(`https://fashionkart-server.onrender.com/order/get-all-orders/${userId}`)
        setData(response.data)
        setSpinner(false)
      }
      catch (error) {
        console.log(error)
      }


    }


    getOrders()


  }, [token, userId])


  useEffect(() => {
    if(!token){
      navigate("/")
    }
    
  }, [token , navigate])

  return (
    <div className='container bg-white  pt-3' id='cart-main-cont'>
      <h5 className='bg-white mt-2'>My Orders</h5>
      <hr className='my-3 ' />
      {data.length ?
        <>
          {data.map((item) => {
            return (
              <>
                <Link style={{ textDecoration: "none" }} className='text-dark' to={`/orders/${item._id}`}>
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
                </Link>

                <hr className='my-3 ' />

              </>

            )
          })}
        </>
        : <div style={{ height: "70vh" }} className="bg-white d-flex flex-column justify-content-center align-items-center fw-bold fs-4">

          {!spinner ? <div className=" d-flex flex-column align-items-center justify-content-center bg-white" disabled>
            No Orders
            <Link style={{ textDecoration: "none" }} className='mt-2 fw-bold fs-6 btn bg-primary text-white' to="/">Continue Shopping</Link>
          </div> : <div className=" d-flex align-items-center justify-content-center " disabled>
            <span className="spinner-border bg-white text-primary spinner-border-sm " style={{ height: "25px", width: "25px" }} role="status" aria-hidden="true"></span>
            <span className="visually-hidden">Loading...</span>
          </div>}




        </div>}

    </div>
  )
}

export default MyOrders