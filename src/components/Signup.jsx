import React, { useState } from 'react'
import "../css/credentials.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';


const Signup = () => {

    const [eyeOpen, setEyeOpen] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [red, setRed] = useState(false)
    const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)

    // submittimg user details function 
    const formFunc = async (e) => {
        setSpinner(true)
        e.preventDefault()
        try {

            // form validation 
            const passwordPattern = /[@$%&#]/;
            const firstLetterCapitalPattern = /^[A-Z]/;
            const numberPattern = /[0-9]/;

            if (!name || !email || !password || !ConfirmPassword) {
                toast.error("Please fill The All Fields")
                setRed(true)
                setSpinner(false)

            } else if (password !== ConfirmPassword) {
                toast.error("Passwords do not match. Please Enter the correct Confirm Password");
                setRed(true)
                setSpinner(false)
            }
            else if (!firstLetterCapitalPattern.test(password)) {
                toast.error("Password should start with a capital letter");
                setRed(true)
                setSpinner(false)
            } else if (!numberPattern.test(password)) {
                toast.error("Password should contain at least One Number");
                setRed(true)
                setSpinner(false)
            }
            else if (!passwordPattern.test(password)) {
                toast.error("Password Should Contain at least One Special Character (@, %, $, &, #)")
                setRed(true)
                setSpinner(false)
            }
            else {

                const userData = { name, email, password }

                await axios.post("https://fashionanr-backend.onrender.com/authentication/signup", userData)

                toast.success("Signed Up Successfully")
                setSpinner(false)
                setName("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setRed(false)
                setTimeout(() => {
                    navigate("/login")
                }, 1200);


            }


        } catch (err) {
            console.log(err)
            toast.error("User already Existed With This Email, Try Another Email")
            setSpinner(false)
        }


    }

    return (
        <>
            <ToastContainer className="bg-transparent" />
            <div className='signup-main-card '>

                <div className=' bg-white signup-card pb-3'>
                    <h4 className='bg-white'>Sign up</h4>
                    <hr className='mb-0 mt-0 ' />

                    <form className='bg-white' onSubmit={formFunc} autoComplete='off'>
                        <label className='input-text'>Name</label><br />
                        <input type='text' value={name.trim()} onChange={(e) => setName(e.target.value)} id={red ? "redLine1" : ""} className='input-box' name='name' /><br />
                        <label className='input-text'>Email</label><br />
                        <input onPaste={(e) => {
                            e.preventDefault()
                        }} value={email.trim()} onChange={(e) => setEmail(e.target.value)} type='email' id={red ? "redLine2" : ""} className='input-box' name='email' /><br />
                        <label className='input-text'>Password</label><br />
                        <input onPaste={(e) => {
                            e.preventDefault()
                        }} value={password.trim()} onChange={(e) => setPassword(e.target.value)} type={eyeOpen ? "text" : "password"} className='input-box' id={red ? "redLine3" : ""} name='password' />
                        {eyeOpen ? <i onClick={() => setEyeOpen(false)} class="fa-solid fa-eye-slash eye-open"></i> : <i onClick={() => setEyeOpen(true)} class="fa-solid fa-eye eye-open"></i>}
                        <br />
                        <label className='input-text'>Confirm Password</label><br />
                        <input onPaste={(e) => {
                            e.preventDefault()
                        }} value={ConfirmPassword.trim()} onChange={(e) => setConfirmPassword(e.target.value)} type='password' id={red ? "redLine4" : ""} className='input-box mb-3' name='confirmPassword' /><br />
                       
                       {spinner ? <button className="cart-bt mt-2 mb-2 bg-success" type="button" disabled="">
                                    <span
                                        className="spinner-border text-white bg-transparent spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="visually-hidden">Loading...</span>
                                </button> :  <button type='submit ' className='mt-2 mb-2 cart-bt bg-success' >Sign up</button>
                    }
                        </form>
                    <h6 className='mt-3 bg-white'>Already Existed user ? <Link to="/login" style={{ textDecoration: "none" }} className=' bg-white'>login</Link></h6>
                </div>


            </div>
            <Footer />
        </>
    )
}

export default Signup