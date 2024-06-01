import React, { useContext, useEffect, useState } from 'react'
import '../css/credentials.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { tokenContext } from '../App';


const Login = () => {
    const [token, setToken] = useContext(tokenContext)
    const [eyeOpen, setEyeOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [red, setRed] = useState(false)
    const [spinner , setSpinner] = useState(false)
    const navigate = useNavigate()


    // login function
    const formFunc = async (e) => {
        e.preventDefault()
        setSpinner(true)
        try {
            if (!email || !password) {
                toast.error("Please fill The All Fields")
                setRed(true)
                setSpinner(false)
            }
            else {
                const userData = { email, password }
                const response = await axios.post("https://fashionkart-server.onrender.com/authentication/login", userData)
                setToken(response.data.token)
                localStorage.setItem("token", JSON.stringify(response.data.token))
                toast.success("Logged In Successfully")
                setEmail("")
                setPassword("")
                setRed(false)
                setSpinner(false)
            }


        } catch (err) {
            console.log(err)
            toast.error("You have Entered wrong Email or Password, If you are new user, Signup")
            setRed(true)
            setSpinner(false)
        }


    }

 
    useEffect(()=>{
       const timer =  setTimeout(() => {
            if(token){
                navigate("/")
            }
         },  1200);

         return ()=> clearTimeout(timer)
        
    },[token , navigate])


    return (
        <>
            <ToastContainer className="bg-transparent" />
            <div className='login-main-card container-fluid' style={{ width: "100vw", marginTop: "5rem" }}>
                <div className='row row-card shadow'>
                    <div className='col-12 col-md-6 logo-login-card bg-primary'>
                        <div className='bg-transparent'>
                            <img src='favicon.jpg' alt='login-logo' className='logo-at-login bg-transparent' />
                            <h5 className="navbar-brand logo-text bg-transparent">
                                Fashionkart
                            </h5>
                            <h5 className='bg-transparent your-text'>your every wish fulfill here</h5>
                        </div>


                    </div>

                    <div className='col-12 col-md-6 login-card bg-white'>
                        <div className='bg-transparent login-sub-card'>


                            <h4 className='bg-white'>Login</h4>
                            <h6 className='bg-white text-secondary'>Get access to your orders, Wishlist and Recommendations</h6>
                            <hr className='mb-0 mt-0 ' />

                            <form className='bg-white' onSubmit={formFunc} autoComplete='off'>

                                <label className='input-text'>Email</label><br />
                                <input onPaste={(e) => {
                                    e.preventDefault()
                                }} value={email.trim()} onChange={(e) => setEmail(e.target.value)} type='email' id={red ? "redLine1" : ""} className='input-box' name='email' /><br />
                                <label className='input-text'>Password</label><br />
                                <input onPaste={(e) => {
                                    e.preventDefault()
                                }} value={password.trim()} onChange={(e) => setPassword(e.target.value)} type={eyeOpen ? "text" : "password"} className='input-box' id={red ? "redLine2" : ""} name='password' />


                                <div className='bg-white d-flex align-items-center justify-content-between pass-toggle-card'>
                                    <Link class="bg-white" style={{textDecoration:"none"}} to="/password"> <h6 className='text-primary bg-white mt-2'>Forgot Password?</h6>
                                    </Link>
                                     {eyeOpen ? <h6 onClick={() => setEyeOpen(false)} class="bg-white" >Hide</h6> : <h6 onClick={() => setEyeOpen(true)} class="bg-white" >Show</h6>}
                                </div>

                                {spinner ? <button className="buy-bt mt-3 mb-2" type="button" disabled="">
                                    <span
                                        className="spinner-border text-white bg-transparent spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="visually-hidden">Loading...</span>
                                </button>
                                    : <button type='submit ' className='mt-3 mb-2 text-white buy-bt'>Login</button>
                                }
                            </form>
                            <h6 className='mt-3 bg-white'>Don't have an account? <Link to="/signup" style={{ textDecoration: "none" }} className=' bg-white'>Signup</Link></h6>


                        </div>


                    </div>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default Login