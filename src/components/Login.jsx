import React, { useState } from 'react'
import './credentials.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [eyeOpen, setEyeOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [red, setRed] = useState(false)


    // login function
    const formFunc = (e) => {
        e.preventDefault()
        try {
            if (!email || !password) {
                toast.error("Please fill The All Fields")
                setRed(true)
            }  
            else {
                const userData = {  email, password }
                console.log(userData)
                toast.success("Logged In Successfully")
                
                setEmail("")
                setPassword("")
                setRed(false)
            }


        } catch (err) {
            console.log(err)
        }


    }
  return (
    <> 
    <ToastContainer className="bg-transparent"/>
    <div className='login-main-card container-fluid' style={{height:"100vh",width:"100vw",marginTop:"5rem"}}>
        <div className='row row-card shadow'>
            <div className='col-12 col-md-6 logo-login-card bg-primary'>
                <div className='bg-transparent'>
                     <img src='favicon.jpg' alt='logo-image' className='logo-at-login bg-transparent'/>
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

                    <form className='bg-white' onSubmit={formFunc}>
                        
                        <label className='input-text'>Email</label><br />
                        <input value={email.trim()} onChange={(e) => setEmail(e.target.value)} type='email' id={red ? "redLine1" : ""} className='input-box' name='email' /><br />
                        <label className='input-text'>Password</label><br />
                        <input value={password.trim()} onChange={(e) => setPassword(e.target.value)} type={eyeOpen ? "text" : "password"} className='input-box' id={red ? "redLine2" : ""} name='password' />
                        
                       
                       <div className='bg-white d-flex align-items-center justify-content-between pass-toggle-card'><h6 className='text-primary bg-white mt-2'>Forgot Password?</h6>
                       {eyeOpen ? <h6 onClick={() => setEyeOpen(false)} class="bg-white" >Hide</h6> : <h6 onClick={() => setEyeOpen(true)} class="bg-white" >Show</h6>}
                        </div> 
                        <button type='submit ' className='mt-3 mb-2 text-white buy-bt'>Login</button>
                    </form>
                    <h6 className='mt-3 bg-white'>Don't have an account? <span className='text-primary bg-white'>Signup</span></h6>
                
                    
                       </div>
                

            </div>

        </div>
        
        </div>

        </>
  )
}

export default Login