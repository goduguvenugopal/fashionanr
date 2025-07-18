import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "../css/products.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { addressContext, cartContext, tokenContext } from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer'


const SingleProduct = () => {
    const [cart, setCart] = useContext(cartContext)
    const [token] = useContext(tokenContext)
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const { id } = useParams()
    const [products, setProducts] = useState([])
    const [exist, setExist] = useState(false)
    const [blinker, setBlinker] = useState(false)
    const [deliveryAddress] = useContext(addressContext)





    // adding items to the cart function 

    const addcartFunc = (product) => {

        try {
            if (!token) {

                toast.error("Please Login To Add Product To The Cart")

            } else if (token) {
                setBlinker(true)
                setTimeout(() => {
                    setBlinker(false)
                    toast.success("Item Added To Cart")
                }, 1000);
                const addedItem = products.find((item) => item._id === product)
                if (addedItem) {
                    setCart([...cart, { ...addedItem, quantity: 1 }]);
                    localStorage.setItem("cart", JSON.stringify([...cart, { ...addedItem, quantity: 1 }]))
                } else {
                    toast.error("Please Try Again Item Not Added Into The Cart")
                }

            }


        } catch (err) {
            console.log(err)

        }





    }




    // checking products already in cart 

    useEffect(() => {
        if (!token) {
            setExist(false)
        }
        else if (token) {
            const localStorageCart = localStorage.getItem("cart")
            const checkedCart = JSON.parse(localStorageCart)
            if (checkedCart) {
                const existed = checkedCart.some((item) => item._id === data._id)
                if (existed) {
                    setExist(true)
                }

            }
        }



    }, [cart, data, token])


    const API = "https://fashionanr-backend.onrender.com"

    // fetching single product by id 
    useEffect(() => {

        const getSingle = async () => {
            setLoader(true)
            try {
                const response = await axios.get(`${API}/product/findproduct/${id}`)
                setData(response.data.data)
                setLoader(false)

            } catch (err) {
                setLoader(false)
                console.log(err)
            }
        }
        getSingle()

        // fetching all products 
        const getAll = async () => {

            try {
                const response = await axios.get(`${API}/product/getproducts`)
                setProducts(response.data)

            } catch (err) {

                console.log(err)
            }
        }
        getAll()

    }, [id])

    // loader function

    const Loading = () => {
        return (
            <>
                <div className='container bg-white py-5 ' style={{ marginTop: "4.5rem" }}>
                    <div className='row'>
                        <div className='col-12 col-md-4 bg-white text-center pb-4 '>
                            <Skeleton height="330px" width="320px" />

                        </div><hr className='d-md-none mb-0 ' />

                        <div className='pb-3 col-12 col-md-8 bg-white pt-3 px-3'>
                            <Skeleton width="170px" height="40px" />
                            <Skeleton className='mt-3' height="40px" />
                            <Skeleton className='mt-3' height="40px" />
                            <div className='mr-2 mt-2 bg-white' style={{ width: "50px", height: "55px" }}>
                                <Skeleton className='  mt-2' height="40px" />

                            </div>
                            <Skeleton className=' mt-1' width="60px" height="25px" />
                            <Skeleton className='mt-2' width="65px" height="35px" />

                        </div>

                        <hr className=' mb-0 ' />
                        <div className='col-12 bg-white py-3  px-3'>
                            <Skeleton height="40px" />
                        </div> <hr className=' mb-0 ' />

                        <div className='col-12 bg-white py-3  px-3'>
                            <Skeleton height="40px" />
                        </div> <hr className=' mb-0 ' />
                        <div className='col-12 bg-white py-4  px-3'>
                            <div className='bg-white d-flex align-items-center'>
                                <Skeleton style={{ marginRight: "2rem" }} width="150px" height="40px" />
                                <Skeleton width="150px" height="40px" />

                            </div>
                        </div> <hr className=' mb-0 ' />
                        <div className='col-12 bg-white py-3  px-3'>
                            <div className='bg-white'>
                                <Skeleton width="170px" height="30px" />
                                <Skeleton style={{ marginTop: "1rem" }} />
                                <Skeleton />
                                <Skeleton />

                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    // delivery date logic code 

    let today = new Date()

    let dayafter = new Date(today)
    dayafter.setDate(today.getDate() + 3)

    let date = dayafter.toDateString()


    const url = "https://fashionanr.netlify.app/"
    // share Function 
    const shareFunc = async () => {
        try {
            await navigator.share({
                text: `Check out this amazing product! : ${data.image} Check out this Website : ${url} `

            })
        } catch (err) {
            console.log(err)
        }
    }

    let formattedPrice = parseFloat(data.price).toLocaleString('en-IN');

    // single product mapping function 

    const ShowProduct = () => {
        return (

            <>

                <div className='container bg-white py-5 ' id='single-product-main-card'>
                    <div className='row'>
                        <div className='col-12 col-md-4 bg-white  pb-4  text-center px-3' style={{ position: "relative" }}>

                            <img height="330px" width="320px" key={data._id} src={data.image} className='single-img bg-white' alt={data.category} />
                            <i onClick={shareFunc} className="fa-solid fa-share-nodes share-icon"></i>


                        </div><hr className='d-md-none mb-0 ' />

                        <div className='pb-3 col-12 col-md-8 bg-white pt-3 px-3 '>
                            <h5 key={data._id} className='text-uppercase text-black-50 bg-white' >{data.category}</h5>
                            <h4 key={data._id} className='display-5 bg-white' >{data.title}</h4>
                            <div className='bg-success mr-2 rating-card mt-3' >
                                <h6 key={data._id} className='bg-success text-white mt-2'>{data.rating}</h6>
                                <i className='fa fa-star bg-success text-white ' style={{ fontSize: "13px" }}></i>
                            </div>
                            <h6 className='bg-white mt-1'>Rating</h6>
                            <div className=' d-flex justify-content-flex-start align-items-center gap-1 bg-white '>
                                <i class="fa-solid fa-indian-rupee-sign bg-white " id='rupee-icon'></i>
                                <h4 key={data._id} className='fs-1 bg-white'>{formattedPrice}</h4>
                            </div>


                        </div>
                        <hr className=' mb-0 ' />
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




                        <div className='col-12 bg-white py-3  px-3'>
                            <div className='bg-white d-flex align-items-center'>
                                <i class="fa-solid fa-truck bg-white mb-1 text-secondary" style={{ marginRight: "1rem" }}></i>
                                <h5 className='bg-white'><span className='text-success bg-white'>Free Delivery</span> | Delivery by {date}</h5>
                            </div>
                        </div> <hr className=' mb-0 ' />

                        <div className='col-12 bg-white py-3  px-3'>
                            <div className='bg-white d-flex align-items-center'>

                                <i class="fa-solid fa-tag bg-white mb-1 text-secondary" style={{ marginRight: "1rem", fontSize: "20px", marginBottom: "0.3rem" }}></i>
                                <h5 className='bg-white'>All Offers & Coupons</h5>
                            </div>
                        </div> <hr className=' mb-0 ' />
                        <div className='col-12 bg-white py-4  px-3'>
                            <div className='bg-white d-flex align-items-center'>




                                {blinker ? <button className="cart-bt" type="button">
                                    <span
                                        className="spinner-grow spinner-grow-sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="visually-hidden">Loading...</span>
                                </button> :
                                    exist ?
                                        <Link className='bg-white' to="/cart" style={{ textDecoration: "none" }
                                        } >
                                            <button className='cart-bt bg-success'> <i style={{ marginRight: "8px" }} class="fa-solid fa-cart-shopping bg-transparent"></i>GO TO CART</button></Link> :
                                        <button onClick={() => addcartFunc(data._id)} className='cart-bt  '> <i style={{ marginRight: "8px" }} class="fa-solid fa-cart-shopping bg-transparent"></i>ADD TO CART</button>

                                }
                                {token ? <Link to={`/products/id/${data._id}`}><button className='buy-bt'><i style={{ marginRight: "8px" }} class="fa-solid fa-bolt bg-transparent"></i>BUY NOW</button> </Link> :
                                    <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" className='buy-bt'><i style={{ marginRight: "8px" }} class="fa-solid fa-bolt bg-transparent"></i>BUY NOW</button>}


                            </div>
                        </div> <hr className=' mb-0 ' />
                        <div className='col-12 bg-white py-3  px-3'>
                            <div className='bg-white'>
                                <h5 className='bg-white '>Product Description</h5>
                                <h6 key={data._id} className='bg-white text-secondary mt-3'>{data.description}</h6>
                            </div>
                        </div>




                    </div>
                </div >
            </>
        )
    }
    return (
        <>
            <div>
                <ToastContainer className="bg-transparent" />
                {loader ? <Loading /> : <ShowProduct />}

                {/* modal  */}
                <div
                    className="offcanvas offcanvas-bottom"
                    tabIndex={-1}
                    id="offcanvasBottom"
                    aria-labelledby="offcanvasBottomLabel"
                >
                    <div className="offcanvas-header bg-white   container">
                        <h5 className="offcanvas-title bg-white" id="offcanvasBottomLabel">

                        </h5>

                        <button
                            type="button"
                            className="btn-close text-reset bg-white"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        />
                    </div>

                    <div className="  offcanvas-body small bg-white d-flex flex-column justify-content-center align-items-center container">
                        <h5 className="mb-0 bg-white mb-1">
                            Log in to complete your shopping
                        </h5>
                        <h6 className=" bg-white text-secondary ">
                            Shop and track your orders easily
                        </h6>
                        <Link className='bg-white' to="/login">
                            <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" className=' btn bg-primary fw-bold text-white'>Login</button>

                        </Link>


                    </div>
                </div>


            </div>
            <Footer />
        </>

    )

}

export default SingleProduct