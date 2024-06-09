import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
const Footer = () => {


    // share Function 
    const shareFunc = async () => {
        try {
            await navigator.share({
                text: 'Check out this amazing Website!',
                url: "https://fashionanr.netlify.app/"
            })
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className='bg-dark pt-2 mt-1'>
            <div className='container py-2 bg-dark text-white  pt-3'>

                <div className='row  bg-dark p-2 '>

                    <div className='col-3 bg-dark '>
                        <h5 className='bg-dark footer-head-text ' style={{ marginBottom: "1.5rem" }}>ABOUT</h5>

                        <Link to="/buynow" style={{ textDecoration: "none" }} ><h6 className='bg-dark  text-white footer-text'>Contact Us</h6></Link>
                        <Link to="/address" style={{ textDecoration: "none" }} ><h6 className='bg-dark  text-white footer-text'>Address</h6></Link>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Careers</h6></a>
                        <h6 style={{cursor:"pointer"}} onClick={shareFunc} className='bg-dark  text-white footer-text'>Share Fashionanr</h6>
                        <a style={{ textDecoration: "none" }} target='_self' href='https://maps.app.goo.gl/GL8UJFUHJZ3pzGT99'><h6 className='bg-dark  text-white footer-text'>Location</h6></a>


                    </div>
                    <div className='col-3 bg-dark '>
                        <h5 className='bg-dark footer-head-text ' style={{ marginBottom: "1.5rem" }}>GROUP COMPANIES</h5>

                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Myntra</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Flipkart</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Cleartrip</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Shopsy</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Amazon</h6></a>

                    </div>
                    <div className='col-3 bg-dark '>
                        <h5 className='bg-dark footer-head-text ' style={{ marginBottom: "1.5rem" }}>HELP</h5>

                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Payments</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Shipping</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Cancellation & Returns</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>FAQ</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Report</h6></a>


                    </div>
                    <div className='col-3 bg-dark '>
                        <h5 className='bg-dark footer-head-text ' style={{ marginBottom: "1.5rem" }}>CONSUMER POLICY</h5>

                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Cancellation & Returns</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Terms of Use</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Security</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Privacy</h6></a>
                        <a style={{ textDecoration: "none" }} href='mailto:venuiti97@gmail.com'><h6 className='bg-dark  text-white footer-text'>Sitemap</h6></a>

                    </div>
                    <hr className=' mb-3 mt-3' />
                    <div className='col-12 bg-dark text-center'>
                        <h6 className='bg-dark text-white'>Follow Us</h6>
                        <i class="fa-brands fa-facebook bg-dark "></i>
                        <i class="fa-brands fa-twitter bg-dark" style={{ marginLeft: "1rem", marginRight: "1rem" }}></i>
                        <i class="fa-brands fa-instagram bg-dark"></i>

                    </div>        <hr className=' mb-3 mt-3' />
                    <div className='col-12 bg-dark text-center'>
                        <h6 className='bg-dark footer-text'>@ 2024 Created by VenuGopal</h6>

                    </div>
                </div>

            </div></div>

    )
}

export default Footer