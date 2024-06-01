import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Account = () => {
    const [data, setData] = useState([])
    const [token ,setToken] = useContext(tokenContext)
    const navigate = useNavigate()
console.log(data)

    useEffect(() => {
        const getUserFunc = async () => {

            try {
                const response = await axios.get("https://fashionkart-server.onrender.com/authentication/getuser", {
                    headers: {
                          token : token
                    }
                })

                setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }



        getUserFunc()

        if (!token) {
            navigate("/login")
        }

    }, [token , navigate])


    const logout = () =>{
        localStorage.removeItem("token")
        setToken("")
    }

    return (
        <div className='container text-center fs-4 fw-bold' style={{ marginTop: "5rem" }}>
            Account owner<br/>
           <h5 className='text-danger'> {data.name}</h5>
            <button onClick={logout} className='btn bg-primary text-white'>Logout</button>
        </div>
    )
}

export default Account