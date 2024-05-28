import React, { useContext, useState } from 'react'
import "./cart.css"
import { cartContext } from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cart, setCart] = useContext(cartContext)
  const [modal, setModal] = useState(false)

  //cart items removing logic 




  const itemRemoveFunc = (removeId, title) => {
    setModal(false)
    const remainedItems = cart.filter((item) => item.id !== removeId);
    setCart(remainedItems);
    toast(`${title} has been removed successfully`);

  }



  return (
    <>
      <ToastContainer className="bg-white" />
      {cart.length ? <div className='container pt-2 bg-white' style={{ marginTop: "5rem" ,marginBottom:"2rem"}}>

        {cart.map((item) => {
          return (
            <>
              <div key={item.id} className='cart-item-card bg-white px-3 '>
                <div>
                  <img src={item.image} alt={item.category} className='cart-item-img' />
                </div>
                <div className=' bg-white pt-3 px-3'>
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

              <div className=' pb-4 pt-3 bg-white cart-bt-card px-3'>
                <div className='gap-2 increment-card bg-white '>
                  <button className='incre-bt'> -</button>
                  <div className='qty-count-card'>5</div>
                  <button className='incre-bt'> +</button>
                </div>
                <div className='d-flex gap-2 bg-white'> 
                  <button className='buy-now-bt'>BUY NOW</button>
                  <button onClick={() => setModal(true)} className='remove-bt'>REMOVE</button>
                </div>
              </div>
              <hr className='mb-0 mt-0' />

              {modal ?
                (<div className='modal-card px-3'>
                  <div className="card" style={{ width: "21rem" }}>
                    <div className="card-header fw-bold">Remove Item</div>
                    <div className="card-body  bg-white pb-0">
                      <h6 className="text-secondary bg-white ">
                        Are You Sure Want To Remove This ?
                      </h6>
                    </div>
                    <div className='card-body  d-flex justify-content-between pb-3  bg-white'>
                      <button onClick={() => setModal(false)} style={{ width: "8.5rem" }} className="btn btn-outline-dark">
                        CANCEL
                      </button>
                      <button onClick={() => itemRemoveFunc(item.id, item.title)} style={{ width: "8.5rem" }} className="btn btn-danger">
                        REMOVE
                      </button></div>
                  </div>

                </div>) : ""}


            </>

          )
        })}


      </div> :


        <div className=' d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh", width: "100vw" }} >
          <img src='\images\men\cart.png' alt='cart' className='cart-img' />
          <h5 className='text-secondary' style={{ marginLeft: "1.5rem" }}>Oops, cart is Empty</h5>
        </div>}
    </>
  )
}

export default Cart