import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../App.css'
import Carousel from './Carousel.jsx'
import Products from './Products.jsx'
import Footer from './Footer.jsx'
import axios from 'axios';
import { Link } from 'react-router-dom'



const Home = () => {

  const [data, setData] = useState([])


  const API = "https://fashionkart-server.onrender.com"

  // fetching the products 
  useEffect(() => {
    const fetchProducts = async () => {

      try {
        const response = await axios.get(`${API}/product/getproducts`);
        setData(response.data.reverse())

      } catch (err) {
        console.log(err)
      }

    }
    fetchProducts()

  }, [])


  // loader KO
  const Loading = () => {
    return (
      <>
        <div className="container bg-white d-flex align-items-center justify-content-center " style={{ height: "12.8rem", marginTop: "5.5rem" }}>
          <h5 className='bg-white text-secondary' style={{ marginRight: "0.7rem" }}>Hang on, Loading Products</h5>
          <div style={{ height: "25px", width: "25px", }} className=" bg-white spinner-border text-primary " role="status">
            <span className="visually-hidden ">Loading...</span>

          </div>

        </div>


      </>
    )
  }

  return (

    <>
      {data.length ? <div className='image-card container bg-white'>
        {data.map((item) => {
          return (

            <div key={item._id} className='d-flex flex-column justify-content-between align-items-center bg-white scrolling-card'>
              <Link className='bg-white' to={`/products/${item._id}`}>
                <img src={item.image} className='category-img bg-white' alt='category-products' />
              </Link>
              <Link style={{ textDecoration: "none" }} className='bg-white text-dark' to={`/products/${item._id}`}>
                <h5 className='title bg-white'>{item.title.substring(0, 12)}</h5>
              </Link>
            </div>

          )
        })}

      </div> : <Loading />}


      <Carousel />
      <Products />

      {data.length ? <div className='container mt-3 bg-white pt-4'>
        <h5 className='bg-white'>Latest Collection's</h5>
        <div className='image-card mt-2 bg-white px-3'>

          {data.map((item) => {
            return (
              <Link style={{ textDecoration: "none" }} to={`/products/${item._id}`}>
                <div key={item._id} className='img-sub-card bg-white'>
                  <img src={item.image} className='home-images bg-white' alt='products' />
                  <h5 className='title text-dark'>{item.title.substring(0, 12)}</h5>
                  <div className='text-dark d-flex justify-content-center align-items-center gap-1 bg-white'>
                    <i class="fa-solid fa-indian-rupee-sign bg-white" style={{ fontSize: "13px", marginBottom: "0.4rem" }}></i>
                    <h4 className='cost bg-white'>{item.price.toLocaleString('en-IN')}</h4>
                  </div>
                </div>
              </Link>
            )
          })}

        </div>
      </div> : <div className='container mt-3 bg-white pt-4'>
        <Skeleton width={150} height={30} />
        <div className='image-card mt-2 bg-white px-3'>
          <Skeleton height={290} width={245} />
          <Skeleton height={290} width={245} />
          <Skeleton height={290} width={245} />
          <Skeleton height={290} width={245} />
          <Skeleton height={290} width={245} />
          <Skeleton height={290} width={245} />
          <Skeleton height={290} width={245} />
          <Skeleton height={290} width={245} />
          <Skeleton height={290} width={245} />
          <Skeleton height={290} width={245} />
          <Skeleton height={290} width={245} />
          <Skeleton height={290} width={245} />
        </div>
      </div>}



      <Footer />
    </>
  )
}

export default Home