import React, { useContext, useEffect, useState } from 'react'
import "../css/cart.css"
import { cartContext, tokenContext } from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';



const Cart = () => {
  const [token] = useContext(tokenContext)
  const [cart, setCart] = useContext(cartContext)
  const [totalAmount, setTotalAmount] = useState("")



  //cart items removing logic 
  const itemRemoveFunc = (removeId, title) => {

    const localstorageCart = localStorage.getItem("cart")
    if (localstorageCart) {

      const parsedcart = JSON.parse(localstorageCart)
      const remainedItems = parsedcart.filter((item) => item._id !== removeId);

      localStorage.setItem("cart", JSON.stringify(remainedItems))

      setCart(remainedItems);

      toast.success(`${title} has been removed successfully`);
    }



  }

  // product price increment function 

  const priceIncrement = (itemId) => {
    const updated = cart.map((product) => {
      if (product._id === itemId) {
        product.quantity = product.quantity + 1;
        toast.success(`You have Changed ${product.title} QUANTITY '${product.quantity}'`);
      }

      return product
    })
    setCart([...updated]);
  }

  // price decremnt function 

  const priceDecrement = (decrID) => {
    const DecrUpdate = cart.map((check) => {
      if (check._id === decrID) {
        check.quantity = check.quantity - 1
        toast.success(`You have Changed ${check.title} QUANTITY '${check.quantity}'`);
      }
      return check
    })
    setCart([...DecrUpdate])
  }

  // totalAmount of cart items 


  useEffect(() => {

    const totalAmoFunc = () => {

      const totalAmount = cart.reduce((acc, item) => {
        return acc + item.quantity * item.price;

      }, 0);

      setTotalAmount(totalAmount)

    };

    totalAmoFunc()
  }, [cart])

  return (
    <>

      <ToastContainer className="bg-transparent" />

      {token ? <> {cart.length ? <> <div className='container pt-2 bg-white' id='cart-main-cont' >

        {cart.map((item) => {
          return (
            <>
              <div key={item._id} className='cart-item-card bg-white px-3 pt-2'>
                <div>
                  <img src={item.image} alt={item.category} className='cart-item-img bg-white' />

                </div>
                <div className=' bg-white pt-3 px-3'>
                  <h5 className='text-uppercase bg-white cat-txt' >{item.category}</h5>
                  <h4 className=' bg-white cat-title-text' >{item.title}</h4>
                  <div className='bg-success mr-2 rating-card mt-3' >
                    <h6 className='bg-success text-white mt-2 '>{item.rating}</h6>
                    <i className='fa fa-star bg-success text-white ' style={{ fontSize: "13px" }}></i>
                  </div>
                  <h6 className='bg-white mt-1'>Rating</h6>
                  <div className=' d-flex justify-content-flex-start align-items-center gap-1 bg-white '>
                    <i class="fa-solid fa-indian-rupee-sign bg-white  " id='indian-rupee'></i>
                    <h4 className='fs-5 bg-white'>{(item.price * item.quantity).toLocaleString('en-IN')}</h4>
                  </div>


                </div>


              </div>

              <div className=' pb-4 pt-3 bg-white cart-bt-card px-3'>
                <div className='gap-2 increment-card bg-white '>
                  <button onClick={() => priceDecrement(item._id)} id={item.quantity === 1 ? "disable-bt" : ""} className='incre-bt'>- </button>
                  <div className='qty-count-card'> {item.quantity}</div>
                  <button onClick={() => priceIncrement(item._id)} className='incre-bt '> +</button>
                </div>
                <div className='d-flex gap-2 bg-white'>
                  <Link to={`/cart/${item._id}`}>   <button className='buy-now-bt'>BUY NOW</button></Link>
                

                  <button onClick={() => itemRemoveFunc(item._id, item.title)} className='remove-bt'>REMOVE</button>
                </div>
              </div>
              <hr className='mb-0 mt-0 ' />



            </>

          )
        })}



      </div>

        <div className='bg-white shadow pt-4 pb-2 container'>
          <div className='d-flex justify-content-between bg-white px-3'>
            <h5 className='bg-white '>Price ({cart.length} items)</h5>
            <div className='d-flex bg-white'>
              <i class="fa-solid fa-indian-rupee-sign bg-white" id='totalAmount-rupee'></i>
              <h6 className='bg-white'>{totalAmount.toLocaleString('en-IN')}</h6></div>

          </div>
          <div className='d-flex justify-content-between bg-white px-3 pt-2'>
            <h4 className='bg-white'>Toatal Amount</h4>
            <div className='bg-white d-flex'>
              <i class="fa-solid fa-indian-rupee-sign bg-white" id='totalAmount-rupee1'></i>
              <h5 className='bg-white'>{totalAmount.toLocaleString('en-IN')}</h5>
            </div>
          </div><hr className='mb-0 mt-0' />
          <div className='bg-white pt-3 pb-2 text-end px-3'>
            <button className='buy-bt '>PLACE ORDER</button>

          </div>

        </div>
      </>
        :


        <div className='bg-white d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh", width: "100vw" }} >
          <img src='\images\carousel\cart.png' alt='cart' className='bg-white cart-img' />
          <h5 className='text-secondary bg-white' style={{ marginLeft: "1.5rem" }}>Oops, cart is Empty</h5>
        </div>}

      </> : <>


        <div className=' bg-white d-flex justify-content-center align-items-center' style={{ height: "100vh", width: "100vw" }}>
          <div className='text-center bg-white' >
            <img src='\images\carousel\cart2.webp' alt='cart' className='cart-missing-img mb-2' />
            <h4 className='bg-white mt-3'>Missing Cart Items ?</h4>
            <h6 className='bg-white text-secondary'>Login to see the items you added previously</h6>
            <Link to="/login"><button className='buy-bt mt-2'>Login</button></Link>

          </div>

        </div>

      </>}


      <Footer />
    </>
  )
}

export default Cart