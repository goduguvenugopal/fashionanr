import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './products.css'
import '../App.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'


const Products = () => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState(data)
    const [loader, setLoader] = useState(false)


    // fetching the products 
    useEffect(() => {
        const fetchProducts = async () => {
            setLoader(true);
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setData(response.data)
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
                <div className='products-cont'>
                    <div className='cat-sub-card shadow-none pt-0'>
                        <Skeleton className='skeleton' />
                    </div>
                    <div className='cat-sub-card pt-0 shadow-none'>
                        <Skeleton className='skeleton' />
                    </div>
                    <div className='cat-sub-card pt-0 shadow-none'>
                        <Skeleton className='skeleton' />
                    </div>
                    <div className='cat-sub-card pt-0 shadow-none'>
                        <Skeleton className='skeleton' />
                    </div>
                    <div className='cat-sub-card pt-0 shadow-none'>
                        <Skeleton className='skeleton' />
                    </div>
                    <div className='cat-sub-card pt-0 shadow-none'>
                        <Skeleton className='skeleton' />
                    </div>
                    <div className='cat-sub-card pt-0 shadow-none'>
                        <Skeleton className='skeleton' />
                    </div>
                    <div className='cat-sub-card pt-0 shadow-none' >
                        <Skeleton className='skeleton' />
                    </div>
                    <div className='cat-sub-card pt-0 shadow-none'>
                        <Skeleton className='skeleton' />
                    </div>
                    <div className='cat-sub-card pt-0 shadow-none'>
                        <Skeleton className='skeleton' />
                    </div>
                    <div className='cat-sub-card pt-0 shadow-none'>
                        <Skeleton className='skeleton' />
                    </div>
                    <div className='cat-sub-card pt-0 shadow-none'>
                        <Skeleton className='skeleton' />
                    </div>

                </div>

            </>
        )
    }

    // mapping the products 
    const ShowProducts = () => {
        return (
            <>

                <div className='bg-white filter-card'>

                    <button className='btn btn-outline-dark me-2 filter-bt' onClick={() => setFilter(data)}>All</button>
                    <button className='btn btn-outline-dark me-2 filter-bt' onClick={() => filterFunc("men's clothing")}>Men'sClothing</button>
                    <button className='btn btn-outline-dark me-2 filter-bt' onClick={() => filterFunc("women's clothing")}>Women'sClothing</button>
                    <button className='btn btn-outline-dark me-2 filter-bt' onClick={() => filterFunc("jewelery")}>JeweleryClothing</button>
                    <button className='btn btn-outline-dark me-2 filter-bt' onClick={() => filterFunc("electronics")}>Electronics</button>

                </div>
                <div className='products-cont pt-5 pb-3 px-3'>
                    {filter.map((item) => {
                        return (
                            <>
                                <Link className='text-dark' style={{ textDecoration: "none" }} to={`/products/${item.id}`}>
                                    <div className='cat-sub-card bg-white'>
                                        <img key={item.id} src={item.image} className='cat-images bg-white' alt='products' />
                                        <h5 className='title'>{item.title.substring(0, 12)}</h5>
                                        <div className='d-flex justify-content-center align-items-center gap-1 bg-white '>
                                            <i class="fa-solid fa-indian-rupee-sign bg-white " style={{ fontSize: "13px", marginBottom: "0.4rem" }}></i>
                                            <h4 className='cost bg-white'>{item.price}</h4>
                                        </div>

                                        <div className='bg-success rating-card' >
                                            <h6 className='bg-success text-white mt-2'>{item.rating && item.rating.rate}</h6>
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

    return (
        <div className='container bg-white text-center py-3'>
            <h4 className='bg-white'>Latest Products</h4>
            <hr className='mb-4' />
            {loader ? <Loading /> : <ShowProducts />}
        </div>
    )
}

export default Products