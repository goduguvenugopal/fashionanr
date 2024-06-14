import React, { useState } from 'react'
import "../index.css"
import Footer from '../components/Footer'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const [subject, setSubject] = useState("")
    const [to] = useState("venuiti97@gmail.com")
    const [text, setText] = useState("")
    const [spinner, setSpinner] = useState(false)

    const formData = { to: to, subject: subject, html: text }

    const formFunc = async (e) => {
        e.preventDefault();
        setSpinner(true)
        try {
            await axios.post("https://fashionkart-server.onrender.com/mail/sendmail", formData)
            toast.success("Thank You for Contacting Us")
            setText("")
            setSubject("")
            setSpinner(false)
        }
        catch (error) {
            setSpinner(false)
            console.log(error)
            toast.error("Please try again message not send")
        }

    }
    return (
        <>
            <ToastContainer className="bg-transparent" />
            <div className='container contactus-main-card p-3'>
                <form onSubmit={formFunc} className='bg-white contact-sub-card pt-3'>
                    <h5 className='bg-white text-center'>Contact Us</h5><hr className='mt-0' />
                    <div className="mb-3 bg-white">
                        <label htmlFor="exampleFormControlInput1" className="bg-white form-label">
                            Name
                        </label>
                        <input
                            required
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter Your Name"
                        />
                    </div>
                    <div className="mb-3 bg-white">
                        <label htmlFor="exampleFormControlTextarea1" className="bg-white form-label">
                            Send Message
                        </label>
                        <textarea
                            required
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            placeholder="Enter Your Message "
                            value={text}
                            onChange={(e) => setText(e.target.value)}

                        />
                    </div>
                    {spinner ? <button style={{width:"100px"}} className="btn btn-primary " type="button" disabled>
                        <span className="spinner-border bg-primary spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="visually-hidden">Loading...</span>
                    </button> : <button style={{width:"100px"}} type='submit' className='btn bg-primary text-white '>Send</button>}


                </form>





            </div>
            <Footer />
        </>
    )
}

export default ContactUs