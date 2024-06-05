import React from 'react'
import Footer from './Footer'

const BuyNow = () => {
    return (
        <>
            <div className=' bg-secondary d-flex justify-content-center align-items-center' style={{ height: "100vh", width: "100vw" }}>
                <div className='bg-white p-3 m-3' style={{ border: "1px solid black", borderRadius: "10px" }}>
                    <h5 className='bg-white fw-bold'>To Buy This Product Visit Shop </h5>
                    <h5 className='bg-white fw-bold ' style={{ lineHeight: "1.5" }}>Shop Address : <span className='bg-white fw-normal fs-5'>
                        Anjaneyanagar, pagidyala, Kurnool, Andhra Pradesh 518412.
                    </span> </h5>

                    <h5 className='bg-white fw-bold'>Call Us For More Details About Product.</h5>
                    <h5 className='bg-white fw-bod'>Mobile : <mark>7382594603</mark> </h5>

                </div>

            </div>

            <Footer />
        </>
    )
}

export default BuyNow