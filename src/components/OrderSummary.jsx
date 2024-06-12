
import React, { useContext, useEffect, useState } from 'react'
import "../css/products.css"
import { addressContext, tokenContext } from '../App'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom'
import "../css/cart.css"
import axios from 'axios';


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
        setData(response.data.data)
        setLoader(false)

      } catch (err) {
        setLoader(false)
        console.log(err)
      }
    }
    getSingle()

    const addPropertyFunc = () => {
      setData(addProperty => {
        const upDatedArray = addProperty.map((item) => {
          const upDatedItem = { ...item, quantity: 1 }
          return upDatedItem
        })
        

        return upDatedArray

      });
    };

    addPropertyFunc()


  }, [itemId])





  return (
    <div className='container bg-white py-5 pt-2 ' id='single-product-main-card'>
      <h5 className='bg-white'>Order Summary</h5>
      <div className='bg-white row'>
        {token ? <> <div className='col-12 bg-white py-3 d-flex align-items-center justify-content-between  px-3'>
          <div className='bg-white '>
            <h5 class="bg-white mb-1 fw-bold" style={{ marginRight: "1rem" }}>
              <span className='fw-normal bg-white text-secondary'>Delivery to:</span>  {deliveryAddress.name}.. <span style={{ fontSize: "1rem" }} className='bg-white'>{deliveryAddress.code}</span> </h5>
            <h5 className='bg-white text-secondary'>{deliveryAddress.address}</h5>
          </div>
          <div className='bg-white'> {deliveryAddress.length === 0 ?
            <Link to="/delivery"> <button style={{ width: "110px", border: "none" }} className='single-address-bt bg-primary text-white'>Add address</button></Link> :
            <Link to="/delivery"><button className='single-address-bt'>Change</button> </Link>
          }</div>


        </div> <hr className=' mb-0 ' /></> : ""}

      </div>

      <div className='cart-item-card bg-white px-3 pt-2'>
        <div>
          <img src={data.image} alt={data.category} className='cart-item-img bg-white' />

        </div>
        <div className=' bg-white pt-3 px-3'>
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

      <div className=' pb-4 pt-3 bg-white cart-bt-card px-3'>
        <div className='gap-2 increment-card bg-white '>
          <button id={data.quantity === 1 ? "disable-bt" : ""} className='incre-bt'>- </button>
          <div className='qty-count-card'> {data.quantity}</div>
          <button className='incre-bt '> +</button>
        </div>

      </div>
      <hr className='mb-0 mt-0 ' />

    </div>
  )
}

export default OrderSummary