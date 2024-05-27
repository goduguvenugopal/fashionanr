import React from 'react'
import { men, categories } from "../images.js"
import '../App.css'
import Carousel from './Carousel.jsx'
import Products from './Products.jsx'


const Home = () => {

  return (

    <>
      <div className='image-card container bg-white'>
        {categories.map((item) => {
          return (
            <div className='d-flex flex-column justify-content-between align-items-center bg-white'>
              <img key={item.id} src={item.image} className='category-img bg-white' alt='category-products' />
              <h5 className='title bg-white'>{item.title}</h5>
            </div>

          )
        })}

      </div>

      <Carousel />
      <Products />

      <div className='container mt-3 bg-white pt-4'>
        <h5 className='bg-white'>Men's Collection</h5>
        <div className='image-card mt-2 bg-white px-3'>

          {men.map((item) => {
            return (
              <div className='img-sub-card bg-white'>
                <img key={item.id} src={item.Image} className='home-images bg-white' alt='products' />
                <h5 className='title'>{item.title}</h5>
                <div className='d-flex justify-content-center align-items-center gap-1 bg-white'>
                  <i class="fa-solid fa-indian-rupee-sign bg-white" style={{ fontSize: "13px", marginBottom: "0.4rem" }}></i>
                  <h4 className='cost bg-white'>{item.cost}</h4>
                </div>


              </div>
            )
          })}

        </div>
      </div>

    </>
  )
}

export default Home