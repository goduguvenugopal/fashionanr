import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { tokenContext } from '../App';



const ForgotPassword = () => {

 const [setToken] = useContext(tokenContext)
    const [eyeOpen, setEyeOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [red, setRed] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate()


    // password reset function
    const formFunc = async (e) => {
        e.preventDefault()
        setSpinner(true)

         // form validation 
         const passwordPattern = /[@$%&#]/;
         const firstLetterCapitalPattern = /^[A-Z]/;
         const numberPattern = /[0-9]/;

        try {
            if (!email || !password || !confirmPassword) {
                toast.error("Please fill The All Fields")
                setRed(true)
                setSpinner(false)
            }else if (password !== confirmPassword) {
                toast.error("New Passwords do not match. Please Enter the correct Confirm Password");
                setRed(true)
                setSpinner(false)
            }
            else if (!firstLetterCapitalPattern.test(password)) {
                toast.error("New Password should start with a capital letter");
                setRed(true)
                setSpinner(false)
            } else if (!numberPattern.test(password)) {
                toast.error("New Password should contain at least One Number");
                setRed(true)
                setSpinner(false)
            }
            else if (!passwordPattern.test(password)) {
                toast.error("New Password Should Contain at least One Special Character (@, %, $, &, #)")
                setRed(true)
                setSpinner(false)
            }
            else {
                const userData = { email, password }
                await axios.put("https://fashionkart-server.onrender.com/authentication/updatepassword", userData)
                toast.success("Password has been Changed Successfully")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setRed(false)
                setSpinner(false)
                const timer = setTimeout(() => {
                    navigate("/login")
                    setToken("")
                    localStorage.removeItem("token")

                }, 1200);

                return () => clearTimeout(timer)
            }


        } catch (err) {
            console.log(err)
            toast.error("Password has not changed, you have Entered wrong Email, If you are new user, Signup")
            setRed(true)
            setSpinner(false)
        }


    }


    return (
        <>
            <ToastContainer className="bg-transparent" />
            <div className='login-main-card container-fluid' style={{ width: "100vw"}}>
                <div className='row row-card shadow'>
                    <div className='col-12 col-md-6 logo-login-card bg-primary'>
                        <div className='bg-transparent'>
                            <img src='\images\carousel\password-logo.jpg' alt='login-logo' className='forgot-pass-logo bg-transparent ' />
                            <h5  className="navbar-brand logo-text bg-transparent">
                                Forgot Password ?
                            </h5>

                        </div>


                    </div>

                    <div className='col-12 col-md-6 login-card bg-white'>
                        <div className='bg-transparent login-sub-card'>


                            <h4 className='bg-white'>Reset Password</h4>
                            <hr className='mb-0 mt-0 ' />

                            <form className='bg-white' onSubmit={formFunc} autoComplete='off'>

                                <label className='input-text'>Old Email</label><br />
                                <input onPaste={(e) => {
                                    e.preventDefault()
                                }} value={email.trim()} onChange={(e) => setEmail(e.target.value)} type='email' id={red ? "redLine1" : ""} className='input-box' name='email' /><br />
                                <label className='input-text'>New Password</label><br />
                                <input onPaste={(e) => {
                                    e.preventDefault()
                                }} value={password.trim()} onChange={(e) => setPassword(e.target.value)} type={eyeOpen ? "text" : "password"} className='input-box' id={red ? "redLine2" : ""} name='password' /><br />
                                <label className='input-text'>Confirm New Password</label><br />
                                <input onPaste={(e) => {
                                    e.preventDefault()
                                }} value={confirmPassword.trim()} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className='input-box' id={red ? "redLine3" : ""} name='password' />


                                <div className='mt-2  bg-white d-flex align-items-center justify-content-between pass-toggle-card'>


                                    {eyeOpen ? <h6 onClick={() => setEyeOpen(false)} class="bg-white text-success" >Hide Password</h6> : <h6 onClick={() => setEyeOpen(true)} class="bg-white text-primary" >Show Password</h6>}
                                </div>

                                {spinner ? <button className="buy-bt bg-success mt-1 mb-2" type="button" disabled="">
                                    <span
                                        className="spinner-border text-white bg-transparent spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="visually-hidden">Loading...</span>
                                </button>
                                    : <button type='submit ' className='mt-1 mb-2 text-white bg-success buy-bt'>Save</button>
                                }

                                <h6 className='mt-1 bg-white'>Don't have an account? <Link to="/signup" style={{ textDecoration: "none" }} className=' bg-white'>Signup</Link></h6>
                            </form>



                        </div>


                    </div>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default ForgotPassword