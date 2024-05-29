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

  // product price increment function 

  const priceIncrement = (itemId) => {
    const updated = cart.map((product) => {
      if (product.id === itemId) {
        product.quantity = product.quantity + 1;
        toast(`You have Changed ${product.title} QUANTITY '${product.quantity}'`);
      }

      return product
    })
    setCart([...updated]);
  }

  // price decremnt function 

  const priceDecrement = (decrID) => {
    const DecrUpdate = cart.map((check) => {
      if (check.id === decrID) {
        check.quantity = check.quantity - 1
        toast(`You have Changed ${check.title} QUANTITY '${check.quantity}'`);
      }
      return check
    })
    setCart([...DecrUpdate])
  }

  // totalAmount of cart items 

  const TotalAmoFunc = () => {
    let totalAmount = 0

    cart.map((item => {
      totalAmount += item.quantity * (item.price)
    }))

    return totalAmount.toFixed(2)
  }


  return (
    <>

      <ToastContainer className="bg-transparent" />
      {cart.length ? <> <div className='container pt-2 bg-white' style={{ marginTop: "5rem", marginBottom: "0.5rem" }}>

        {cart.map((item) => {
          return (
            <>
              <div key={item.id} className='cart-item-card bg-white px-3 pt-2'>
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
                    <i class="fa-solid fa-indian-rupee-sign bg-white  " id='indian-rupee'></i>
                    <h4 className='fs-5 bg-white'>{item.price * item.quantity}</h4>
                  </div>


                </div>


              </div>

              <div className=' pb-4 pt-3 bg-white cart-bt-card px-3'>
                <div className='gap-2 increment-card bg-white '>
                  <button onClick={() => priceDecrement(item.id)} id={item.quantity === 1 ? "disable-bt" : ""} className='incre-bt'>- </button>
                  <div className='qty-count-card'> {item.quantity}</div>
                  <button onClick={() => priceIncrement(item.id)} className='incre-bt'> +</button>
                </div>
                <div className='d-flex gap-2 bg-white'>
                  <button className='buy-now-bt'>BUY NOW</button>
                  <button onClick={() => setModal(true)} className='remove-bt'>REMOVE</button>
                </div>
              </div>
              <hr className='mb-0 mt-0 ' />

              {modal ?
                (<div className='modal-card px-3'>
                  <div className="card" style={{ width: "21rem" }}>
                    <div className="bg-white card-header fw-bold d-flex justify-content-between align-items-center">Remove Item
                      <i style={{ cursor: "pointer" }} onClick={() => setModal(false)} class="fa-solid fa-xmark bg-white"></i></div>

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

        

      </div>
      
      <div className='bg-white shadow pt-4 pb-2 container'>
          <div className='d-flex justify-content-between bg-white px-3'>
            <h5 className='bg-white '>Price ({cart.length} items)</h5>
            <div className='d-flex bg-white'>
              <i class="fa-solid fa-indian-rupee-sign bg-white" id='totalAmount-rupee'></i>
              <h6 className='bg-white'>{<TotalAmoFunc />}</h6></div>

          </div>
          <div className='d-flex justify-content-between bg-white px-3 pt-2'>
            <h4 className='bg-white'>Toatal Amount</h4>
            <div className='bg-white d-flex'>
              <i class="fa-solid fa-indian-rupee-sign bg-white" id='totalAmount-rupee1'></i>
              <h5 className='bg-white'>{<TotalAmoFunc />}</h5>
            </div>
          </div><hr className='mb-0 mt-0 ' />
          <div className='bg-white pt-3 pb-2 text-end px-3'>
            <button className='buy-bt '>PLACE ORDER</button>
          </div>

        </div>
      </>
      :


        <div className='bg-white d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh", width: "100vw" }} >
          <img src='\images\men\cart.png' alt='cart' className='bg-white cart-img' />
          <h5 className='text-secondary bg-white' style={{ marginLeft: "1.5rem" }}>Oops, cart is Empty</h5>
        </div>}
    </>
  )
}

export default Cart