import React, { useContext } from 'react'
import "./cart.css"
import { cartContext } from '../App'

const Cart = () => {
  const [cart, setCart] = useContext(cartContext)


  //cart items removing logic 

  const itemRemoveFunc = (removeId) => {
    const remainedItems = cart.filter((item) => item.id !== removeId)
    setCart(remainedItems)
  }


  return (
    <>
      {cart.length ? <div className='container pt-2 bg-white' style={{ marginTop: "5rem" }}>

        {cart.map((item) => {
          return (
            <>
              <div className='cart-item-card bg-white px-3 p'>
                <div>
                  <img src={item.image} alt={item.category} className='cart-item-img' />
                </div>
                <div className='pb- bg-white pt-3 px-3'>
                  <h5 className='text-uppercase bg-white cat-txt' >{item.category}</h5>
                  <h4 className=' bg-white cat-title-text' >{item.title}</h4>
                  <div className='bg-success mr-2 rating-card mt-3' >
                    <h6 className='bg-success text-white mt-2 '>{item.rating && item.rating.rate}</h6>
                    <i className='fa fa-star bg-success text-white ' style={{ fontSize: "13px" }}></i>
                  </div>
                  <h6 className='bg-white mt-1'>Rating</h6>
                  <div className=' d-flex justify-content-flex-start align-items-center gap-1 bg-white '>
                    <i class="fa-solid fa-indian-rupee-sign bg-white mb-1"></i>
                    <h4 className='fs-5 bg-white'>{item.price}</h4>
                  </div>


                </div>


              </div>
              <div className='px-3 pb-4 pt-3 bg-white cart-bt-card d-flex gap-2'>
                <div className=' d-flex '>
                  <button> -</button>
                  <button>5</button>
                  <button> +</button>
                </div>
                <button>BUY NOW</button>
                <button onClick={() => itemRemoveFunc(item.id)} className='remove-bt'>REMOVE</button>
              </div>
              <hr className='mb-0 mt-0' />
            </>
          )
        })}


      </div> :


        <div className=' d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh", width: "100vw" }} >
          <img src='\images\men\cart.png' alt='cart' className='cart-img' />
          <h5 className='text-secondary'>Oops, cart is Empty</h5>
        </div>}
    </>
  )
}

export default Cart