import React, { useEffect, useState } from 'react'
import { carousel } from '../images'
import '../App.css'
const Carousel = () => {

    const [increment, setIncrement] = useState(0)

    const incrFunc = () => {
        setIncrement((incre) => (incre + 1) % carousel.length)

    }
    const decrFunc = () => {
        setIncrement((decre) => (decre - 1 + carousel.length) % carousel.length)

    }

    useEffect(() => {
        const inter = setInterval(() => {
            incrFunc()
        }, 2500);
        return () => clearInterval(inter);
    }, [])

    return (
        <div className='container mb-4 mt-4 carousel-card'>
            <button className='inc-bt' onClick={decrFunc}><i className="fa-solid fa-less-than bg-white"></i></button>
            <img src={carousel[increment]} className='carousel-img' alt='carousel' />
            <button className='dec-bt' onClick={incrFunc}><i className="fa-solid fa-greater-than bg-white"></i></button>
        </div>
    )
}

export default Carousel