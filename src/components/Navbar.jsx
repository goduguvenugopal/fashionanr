import React, { useContext } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { cartContext, tokenContext } from '../App'

const Navbar = () => {
    const [token] = useContext(tokenContext)
    const [cart] = useContext(cartContext)

    return (
        <div className=''>
            <nav className="fixed-top navbar shadow navbar-expand-lg navbar-light bg-primary ">
                <div className="container  bg-primary ">
                    <Link style={{ textDecoration: "none" }} className="bg-primary" to="/">
                        <h5 className="navbar-brand logo-text bg-primary pb-2">
                            Fashionkart
                        </h5>
                    </Link>

                    <button
                        className="navbar-toggler  bg-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon  bg-white" />
                    </button>
                    <div className="collapse navbar-collapse bg-primary " id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto bg-primary mb-2 mb-lg-0">
                            <Link style={{ textDecoration: "none" }} to="/" className="nav-item  bg-primary">
                                <h6 style={{ fontSize: "17px" }} className="nav-link active bg-primary text-white " aria-current="page"  >
                                    Home
                                </h6>
                            </Link>
                            <Link style={{ textDecoration: "none" }} to="/products" className="nav-item bg-primary">
                                <h6 style={{ fontSize: "17px" }} className="nav-link bg-primary text-white">
                                    Products
                                </h6>
                            </Link>
                            <Link style={{ fontSize: "17px",textDecoration: "none" }}   to="/orders" className="nav-item bg-primary">
                                <h6 className="nav-link bg-primary text-white">
                                   My orders
                                </h6>
                            </Link>

                        </ul>
                        <div className="bg-primary  d-flex justify-content-between  gap-5 pb-2 ">

                            {token ?
                            <Link to="/account" style={{ textDecoration: "none" }} className="bg-primary"> 
                            <button className="bt-nav ">
                                <i class="fa-solid fa-circle-user bg-transparent" style={{marginRight:"0.4rem"}}></i>
                                    Account
                                </button></Link>
                                
                                : <Link style={{ textDecoration: "none" }} className="bg-primary" to="/login">
                                <button className="bt-nav ">
                                    <i className="nav-icon fa-solid fa-right-to-bracket" style={{marginRight:"0.4rem"}}></i>
                                 Login
                                </button>
                            </Link>}



                            {token ? "" : <Link style={{ textDecoration: "none" }} className="bg-primary" to="/signup">
                                <button className="bt-nav  ">
                                    <i className="nav-icon fa-solid fa-user-plus" style={{marginRight:"0.1rem"}}></i> Signup
                                </button>
                            </Link>}


                            <Link style={{ textDecoration: "none" }} className="bg-primary" to="/cart">
                                <button className="bt-nav  ">
                                    {token ? <div className='cart-items-card'>
                                        <h6 style={{ fontSize: "13px", marginTop: "2px" }} className='bg-transparent'>{cart.length}</h6>
                                    </div> : ""}

                                    <i className="nav-icon fa-solid fa-cart-shopping" style={{marginRight:"0.1rem"}}></i> Cart
                                </button>

                            </Link>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar