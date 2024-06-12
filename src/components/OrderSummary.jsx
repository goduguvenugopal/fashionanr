
import React, { useContext, useEffect, useState } from 'react'
import "../css/products.css"
import { addressContext, tokenContext } from '../App'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom'
import "../css/cart.css"
import axios from 'axios';
import "../css/order.css"


const OrderSummary = () => {
  const [token] = useContext(tokenContext)
  const [deliveryAddress] = useContext(addressContext)
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)


  const { itemId } = useParams()
  console.log(data)

  const API = "https://fashionkart-server.onrender.com"

  // fetching single product by id 
  useEffect(() => {

    const getSingle = async () => {
      setLoader(true)
      try {
        const response = await axios.get(`${API}/product/findproduct/${itemId}`)
        const product = response.data.data
        setData({ ...product, quantity: 1 })
        setLoader(false)

      } catch (err) {
        setLoader(false)
        console.log(err)
      }
    }
    getSingle()




  }, [itemId])


  // quantity increment function 
  const incrementFunc = (change) => {

    setData(prevData => ({
      ...prevData,
      quantity: Math.max(1, prevData.quantity + change)
    }));


  }

  // decrement function 
  const decrementFunc = (dec) => {
    setData(prevData => ({
      ...prevData,
      quantity: Math.max(1, prevData.quantity - dec)
    }))
  }




  return (
    <div className='container bg-white py-5 pb-3 pt-3 ' id='single-product-main-card'>
      <h5 className='bg-white'>Order Summary</h5>
      <hr className=' mb-0 ' />
      <div className='bg-white row'>
        {token ? <> <div className='col-12 bg-white py-3 d-flex align-items-center justify-content-between  px-3'>
          <div className='bg-white '>
            <h5 class="bg-white mb-2 fw-bold" style={{ marginRight: "1rem" }}>
              Delivery to:   </h5>
            <h5 className='bg-white'>{deliveryAddress.name}</h5>
            <h5 className='bg-white '>{deliveryAddress.address} <span style={{ fontSize: "1rem" }} className='bg-white'>{deliveryAddress.code}</span></h5>
            <h6 className='bg-white '>{deliveryAddress.mobile}</h6>
          </div>
          <div className='bg-white'> {deliveryAddress.length === 0 ?
            <Link to="/delivery"> <button style={{ width: "110px", border: "none" }} className='single-address-bt bg-primary text-white'>Add address</button></Link> :
            <Link to="/delivery"><button className='single-address-bt'>Change</button> </Link>
          }</div>


        </div> <hr className=' mb-0 ' /></> : ""}

      </div>

      <div className='cart-item-card bg-white px-3 pt-2'>
        <div>
          {loader ? <div className="cart-item-img  d-flex align-items-center justify-content-center " disabled>
            <span className="spinner-border bg-white text-primary spinner-border-sm " style={{ height: "25px", width: "25px" }} role="status" aria-hidden="true"></span>
            <span className="visually-hidden">Loading...</span>
          </div> : <img src={data.image} alt={data.category} className='cart-item-img bg-white' />}


        </div>
        <div className=' bg-white pt-3 px-3 '>
          <h5 className='text-uppercase bg-white cat-txt' >{data.category}</h5>
          <h4 className=' bg-white cat-title-text' >{data.title}</h4>
          <div className='bg-success mr-2 rating-card mt-3' >
            <h6 className='bg-success text-white mt-2 '>{data.rating}</h6>
            <i className='fa fa-star bg-success text-white ' style={{ fontSize: "13px" }}></i>
          </div>
          <h6 className='bg-white mt-1'>Rating</h6>
          <div className=' d-flex justify-content-flex-start align-items-center gap-1 bg-white '>
            <i class="fa-solid fa-indian-rupee-sign bg-white  " id='indian-rupee'></i>
            <h4 className='fs-5 bg-white'>{(data.price * data.quantity).toLocaleString('en-IN')}</h4>
          </div>


        </div>


      </div>

      <div style={{ position: "relative" }} className=' pb-4 pt-3 bg-white cart-bt-card  px-3'>
        <h6 className='bg-white quanty-text'>Qty</h6>
        <div className='gap-2 increment-card bg-white '>
          <button onClick={() => decrementFunc(1)} id={data.quantity === 1 ? "disable-bt" : ""} className='incre-bt'>- </button>
          <div className='qty-count-card'> {data.quantity}</div>
          <button onClick={() => incrementFunc(1)} className='incre-bt '> +</button>
        </div>

      </div>
      <hr className='mb-0 mt-0 ' />

      <div className='bg-white  pt-4 pb-2 container'>
        <h4 className='bg-white mb-4'>Price Details</h4>
        <div className='d-flex justify-content-between bg-white  '>
          <h5 className='bg-white '>Price ({data.length} items)</h5>
          <div className='d-flex bg-white'>
            <i class="fa-solid fa-indian-rupee-sign bg-white" id='totalAmount-rupee'></i>
            <h6 className='bg-white'>{(data.price * data.quantity).toLocaleString('en-IN')}</h6></div>

        </div>
        <div className='d-flex justify-content-between bg-white  '>
          <h5 className='bg-white '>Discount</h5>
          <div className='d-flex bg-white'>
            <i class="fa-solid fa-indian-rupee-sign text-success bg-white" id='totalAmount-rupee'></i>
            <h6 className='bg-white text-success'>-100</h6></div>

        </div>
        <div className='d-flex justify-content-between bg-white  '>
          <h5 className='bg-white '>Delivery Charges</h5>
          <div className='d-flex bg-white'>

            <h6 className='bg-white text-success'>FREE Delivery</h6></div>

        </div>
        <hr className='mb-0 mt-3 ' />
        <div className='d-flex justify-content-between bg-white   pt-2'>
          <h4 className='bg-white'>Toatal Amount</h4>
          <div className='bg-white d-flex'>
            <i class="fa-solid fa-indian-rupee-sign bg-white" id='totalAmount-rupee1'></i>
            <h5 className='bg-white'>{(data.price * data.quantity - 100).toLocaleString('en-IN')}</h5>
          </div>
        </div><hr className='mb-0 mt-0' />
        <div className='bg-white pt-4 text-end '>
          <button className='buy-bt bg-warning text-dark fw-bold'>Continue</button>

        </div>

      </div>

    </div>
  )
}

export default OrderSummary