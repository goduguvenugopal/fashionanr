import React, { useState } from 'react'
import "./credentials.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {

    const [eyeOpen, setEyeOpen] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    // submittimg user details function 
 const formFunc = (e) => {
        e.preventDefault()
        try {

            if(!name || !email || !password || !ConfirmPassword) {
                toast("Please fill The All Fields")
            }else if(password !== ConfirmPassword){
                toast("Please Enter Correct, Confirm password Not Matched")
            }
            else{
                const userData = { name, email, password, ConfirmPassword }
                console.log(userData)
                toast("User Signed Up Successfully")
                setName("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
            } 
            

        } catch (err) {
            console.log(err)
        }


    }

    return (
        <>
            <ToastContainer className="bg-transparent" />
            <div className='containe signup-main-card ' style={{ marginTop: "3rem" }}>

                <div className=' bg-white signup-card pb-3'>
                    <h4 className='bg-white'>Sign up</h4>
                    <hr className='mb-0 mt-0 ' />

                    <form className='bg-white' onSubmit={formFunc}>
                        <label className='input-text'>Name</label><br />
                        <input type='text' value={name.trim()} onChange={(e) => setName(e.target.value)} className='input-box' name='name' /><br />
                        <label className='input-text'>Email</label><br />
                        <input value={email.trim()} onChange={(e) => setEmail(e.target.value)} type='email' className='input-box' name='email' /><br />
                        <label className='input-text'>Password</label><br />
                        <input value={password.trim()} onChange={(e) => setPassword(e.target.value)} type={eyeOpen ? "text" : "password"} className='input-box' name='password' />
                        {eyeOpen ? <i onClick={() => setEyeOpen(false)} class="fa-solid fa-eye-slash" id='eye-open'></i> : <i onClick={() => setEyeOpen(true)} class="fa-solid fa-eye" id='eye-open'></i>}
                        <br />
                        <label className='input-text'>Confirm Password</label><br />
                        <input value={ConfirmPassword.trim()} onChange={(e) => setConfirmPassword(e.target.value)} type='password' className='input-box mb-3' name='confirmPassword' /><br />
                        <button type='submit ' className='mt-2 mb-2 btn btn-primary' >Sign up</button>
                    </form>
                    <h6 className='mt-3 bg-white'>Already Existed user ? <span className='text-danger bg-white'>login</span></h6>
                </div>


            </div>
        </>
    )
}

export default Signup