import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../css/products.css"
import '../App.css'
import { Link } from 'react-router-dom'


const Products = () => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState(data)
    const [loader, setLoader] = useState(false)


    const API = "https://fashionkart-server.onrender.com"

    // fetching the products 
    useEffect(() => {
        const fetchProducts = async () => {
            setLoader(true);
            try {
                const response = await axios.get(`${API}/product/getproducts`);
                setData(response.data.reverse())
                setFilter(response.data)
                setLoader(false);
            } catch (err) {
                setLoader(false);
                console.log(err)
            }

        }
        fetchProducts()

    }, [])


    // loader 
    const Loading = () => {
        return (
            <>
                <div className="bg-white d-flex justify-content-center align-items-center " style={{ height: "80vh" }}>
                    <h5 className='bg-white text-secondary' style={{ marginRight: "0.7rem" }}>Hang on, Loading Products</h5>
                    <div style={{ height: "25px", width: "25px", }} className=" bg-white spinner-border text-primary " role="status">
                        <span className="visually-hidden ">Loading...</span>

                    </div>

                </div>


            </>
        )
    }

    const date = new Date().toLocaleDateString("en-Gb")


    // mapping the products 
    const ShowProducts = () => {
        return (
            <>

                <div className='bg-white filter-card pb-1'>

                    <button className='btn btn-outline-dark me-2 filter-bt  ' onClick={() => setFilter(data)}>All</button>
                    <button className='btn btn-outline-dark me-2 filter-bt fw-bold ' onClick={() => filterDate(date)}>LatestCollection</button>
                    <button className='btn btn-outline-dark me-2 filter-bt' onClick={() => filterFunc("saree")}>Saree</button>
                    <button className='btn btn-outline-dark me-2 filter-bt' onClick={() => filterFunc("dress")}>Dress</button>
                    <button className='btn btn-outline-dark me-2 filter-bt' onClick={() => filterFunc("mobile")}>Mobile</button>
                    <button className='btn btn-outline-dark me-2 filter-bt' onClick={() => filterFunc("men")}>Menwear</button>
                    <button className='btn btn-outline-dark me-2 filter-bt' onClick={() => filterFunc("children")}>Childrenwear</button>

                    <button className='btn btn-outline-dark me-2 filter-bt' onClick={() => filterFunc("bag")}>PlasticWireBag's</button>
                </div>
                <div className='products-cont pt-5 pb-3 px-3'>
                    {filter.map((item) => {
                        return (
                            <>
                                <Link className='text-dark' style={{ textDecoration: "none" }} to={`/products/${item._id}`}>
                                    <div className='cat-sub-card bg-white'>
                                        <img key={item._id} src={item.image} className='cat-images bg-white' alt='products' />

                                        <h5 className='title'>{item.title.substring(0, 12)}</h5>
                                        <div className='d-flex justify-content-center align-items-center gap-1 bg-white '>
                                            <i class="fa-solid fa-indian-rupee-sign bg-white " style={{ fontSize: "13px", marginBottom: "0.4rem" }}></i>
                                            <h4 className='cost bg-white'>{item.price.toLocaleString('en-IN')}</h4>
                                        </div>

                                        <div className='bg-success rating-card' >
                                            <h6 className='bg-success text-white mt-2'>{item.rating}</h6>
                                            <i className='fa fa-star bg-success text-white ' style={{ fontSize: "13px" }}></i>
                                        </div>


                                    </div>
                                </Link>
                            </>
                        )
                    })}
                </div>
            </>



        )
    }


    // products filter function

    const filterFunc = (filterPro) => {
        const filtered = data.filter((item) => item.category === filterPro)
        setFilter(filtered)

    }

    const filterDate = (filterPro) => {
        const filteredDate = data.filter((item) => item.date === filterPro)

        setFilter(filteredDate)
    }

    return (
        <div className='container bg-white text-center py-3 latest-product-card'>
           <div className="latest-pro-cont bg-white">   
            <h4 className='bg-white latest-text'>Latest Products</h4>
            </div>
          
            <hr className='mb-4' />
            {loader ? <Loading /> : <ShowProducts />}
        </div>
    )
}

export default Products