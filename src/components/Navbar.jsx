import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { cartContext, tokenContext } from '../App'
import axios from 'axios'

const Navbar = () => {
    const [token] = useContext(tokenContext)
    const [cart] = useContext(cartContext)
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [result, setResult] = useState(false)
    const [orginalData , setOriginalData] = useState([])
   


    const API = "https://fashionkart-server.onrender.com"


      // Fetch data 
      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API}/product/getproducts`);
                setData(response.data);
                setOriginalData(response.data); 
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

 

       // clicks to close the result dropdown
       useEffect(() => {
        const handleClickOutside = () => {
            setResult(false);
            setSearch('');
        };
        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);


    // onchange function
    const onChangeFunc = (event) => {
        const inputData = event.target.value
        setSearch(inputData)
        setResult(true)
        searchFunc(inputData)

    }

    // search filter 
    const searchFunc = (input) => {
        const filteredData = orginalData.filter((item) => item.category.toLowerCase().includes(input.toLowerCase()));
        setData(filteredData)
    }

    return (
        <>
            <nav className="fixed-top navbar shadow navbar-expand-lg navbar-light bg-primary "  >
                <div className="container  bg-primary ">
                    <Link style={{ textDecoration: "none" }} className="bg-primary" to="/">
                        <h5 className="navbar-brand logo-text bg-primary pb-2">
                            Fashionanr
                        </h5>
                    </Link>
                    <div className='search-card'>
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        <input value={search.trim()} onChange={onChangeFunc} type='text' placeholder='Search for Products' alt='' className='search-box' />

                        {result ? <div className='search-results-card'>
                            {data.map((item) => {
                                return (
                                    <Link className='text-dark' style={{ textDecoration: "none" }} to={`/products/${item._id}`}>
                                        <div onClick={() => setResult(false)} key={item._id} className='search-res'>
                                            <img src={item.image} alt={item.category} className='results-img' />
                                            <h5 className='results-title'>{item.title}</h5>
                                        </div></Link>


                                )
                            })}

                        </div> : ""}

                    </div>






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

                            {token ? <Link style={{ fontSize: "17px", textDecoration: "none" }} to="/orders" className="nav-item bg-primary">
                                <h6 className="nav-link bg-primary text-white">
                                    My orders
                                </h6>
                            </Link> : ""}


                        </ul>
                        <div className="bg-primary  d-flex justify-content-between  gap-5 pb-2 ">

                            {token ?
                                <Link to="/account" style={{ textDecoration: "none" }} className="bg-primary">
                                    <button className="bt-nav ">
                                        <i class="fa-regular fa-circle-user bg-transparent" style={{ marginRight: "0.4rem" }}></i>
                                        Account
                                    </button></Link>

                                : <Link style={{ textDecoration: "none" }} className="bg-primary" to="/login">
                                    <button className="bt-nav ">
                                        <i className="nav-icon fa-solid fa-right-to-bracket" style={{ marginRight: "0.4rem" }}></i>
                                        Login
                                    </button>
                                </Link>}



                            {token ? "" : <Link style={{ textDecoration: "none" }} className="bg-primary" to="/signup">
                                <button className="bt-nav  ">
                                    <i className="nav-icon fa-solid fa-user-plus" style={{ marginRight: "0.1rem" }}></i> Signup
                                </button>
                            </Link>}


                            <Link style={{ textDecoration: "none" }} className="bg-primary" to="/cart">
                                <button className="bt-nav  ">
                                    {token ? <div className='cart-items-card'>
                                        <h6 style={{ fontSize: "13px", marginTop: "2px" }} className='bg-transparent'>{cart.length}</h6>
                                    </div> : ""}

                                    <i className="nav-icon fa-solid fa-cart-shopping" style={{ marginRight: "0.1rem" }}></i> Cart
                                </button>

                            </Link>

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar