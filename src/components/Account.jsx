import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Account = () => {
    const [data, setData] = useState([])
    const [token] = useContext(tokenContext)
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

    return (
        <div className='container text-center fs-4 fw-bold' style={{ marginTop: "5rem" }}>
            Account owner {data.name}
        </div>
    )
}

export default Account