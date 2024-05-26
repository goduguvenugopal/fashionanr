import React from 'react'
import '../App.css'
const Navbar = () => {
    return (
        <div className=''>
            <nav className="fixed-top navbar shadow navbar-expand-lg navbar-light bg-primary">
                <div className="container  bg-primary">
                    <a className="navbar-brand logo-text bg-primary " href="">
                        Fashionkart
                    </a>
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
                    <div className="collapse navbar-collapse bg-primary" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto bg-primary mb-2 mb-lg-0">
                            <li className="nav-item  bg-primary">
                                <a className="nav-link active bg-primary text-white" aria-current="page" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link bg-primary text-white" href="#">
                                    Products
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link bg-primary text-white" href="#">
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link bg-primary text-white" href="#">
                                    Contact
                                </a>
                            </li>

                        </ul>
                        <div className="bg-primary  d-flex justify-content-between gap-4">

                            <button className="bt-nav " type="submit">
                                <i className="nav-icon fa-solid fa-right-to-bracket"></i>
                                Login
                            </button>
                            <button className="bt-nav  " type="submit">
                                <i className="nav-icon fa-solid fa-user-plus"></i> Signup
                            </button>
                            <button className="bt-nav  " type="submit">
                                <i className="nav-icon fa-solid fa-cart-shopping"></i> Cart
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar