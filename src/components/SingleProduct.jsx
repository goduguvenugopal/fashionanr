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
    },[data])

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
                <div className='container bg-white py-5' style={{marginTop:"7rem"}}>
                    <div className='row'>

                       
                        <>
                            <div className='col-12 col-md-6 bg-white text-center'>
                                <img height="400" width="400" src={data.image} className='single-img' alt={data.category} />

                            </div>
                            <div className='col-12 col-md-6 bg-white pt-3'>
                                <h5 className='text-uppercase text-black-50 bg-white' >{data.category}</h5>
                                <h4 className='display-5 bg-white' >{data.title}</h4>
                                <h6 className='bg-white'>Rating {data.rating && data.rating.rate}<i className='fa fa-star'></i>
                                <div className='pt-2 d-flex justify-content-flex-start align-items-center gap-1 bg-white '>
                                        <i class="fa-solid fa-indian-rupee-sign bg-white " style={{marginRight:"0.4rem", fontSize: "1.6rem", marginBottom: "0.2rem" }}></i>
                                        <h4 className='fs-1 bg-white'>{data.price}</h4>
                                    </div>
                                </h6>

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