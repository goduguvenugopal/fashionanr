import React from 'react'
import Footer from './Footer'
import "../index.css"

const Address = () => {
    return (
        <>
            <div className='container bg-white address-main-card' >
                <iframe title='google-map' className='iframe-card ' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3836.2956670428493!2d78.3383933!3d15.9459288!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5934e9c3b394b%3A0x29ffe6db5d2210f7!2sBharathi%20Tailoring%20and%20ladies%20clothe%20shop!5e0!3m2!1sen!2sin!4v1717921208204!5m2!1sen!2sin" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>


                <div className='bg-white  p-3 mt-4' style={{ borderRadius: "10px", boxShadow: "0 0 7px black" }}>
                    <h5 className='bg-white fw-bold ' style={{ lineHeight: "1.5" }}>Address : <span className='bg-white fw-normal fs-5'>
                        Anjaneyanagar, pagidyala, Kurnool, Andhra Pradesh 518412.
                    </span> </h5>

                    <h5 className='bg-white fw-bold'>Call Us For More Details</h5>
                    <h5 className='bg-white fw-bod'>Mobile : <span className='bg-white fs-6 text-secondary'>1234567890</span> </h5>

                </div>

            </div>

            <Footer />
        </>
    )
}

export default Address