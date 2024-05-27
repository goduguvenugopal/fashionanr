import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./products.css"





const SingleProduct = () => {

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const { id } = useParams()


    // fetching single product by id 
    useEffect(() => {
        const getSingle = async () => {
            setLoader(true)
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
                setData(response.data)
                setLoader(false)

            } catch (err) {
                setLoader(false)
                console.log(err)
            }
        }
        getSingle()
    }, [id])

    // loader function

    const Loading = () => {
        return (
            <>
                Loading...
            </>
        )
    }


    // single product mapping function 

    const ShowProduct = () => {
        return (
            <>
                <div className='container bg-white py-5 ' style={{ marginTop: "5rem" }}>
                    <div className='row'>


                        <>
                            <div className='col-12 col-md-6 bg-white text-center pb-4'>
                                <img height="350px" width="350px" src={data.image} className='single-img' alt={data.category} />

                            </div><hr className='d-md-none mb-0 ' />
                            <div className='col-12 col-md-6 bg-white pt-3 px-4'>
                                <h5 className='text-uppercase text-black-50 bg-white' >{data.category}</h5>
                                <h4 className='display-5 bg-white' >{data.title}</h4>
                                <div className='bg-success mr-2 rating-card mt-3' > 
                                <h6 className='bg-success text-white mt-2'>{data.rating && data.rating.rate}</h6> 
                                <i className='fa fa-star bg-success text-white ' style={{ fontSize: "13px" }}></i> 
                                </div>
                                <h6 className='bg-white mt-1'>Ratings</h6>
                                <div className='pt-2 d-flex justify-content-flex-start align-items-center gap-1 bg-white '>
                                    <i class="fa-solid fa-indian-rupee-sign bg-white " id='rupee-icon'></i>
                                    <h4 className='fs-1 bg-white'>{data.price}</h4>
                                </div>


                            </div>
                        </>



                    </div>
                </div>
            </>
        )
    }


    return (
        <div>
            {loader ? <Loading /> : <ShowProduct />}

        </div>
    )

}

export default SingleProduct