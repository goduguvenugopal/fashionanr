import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../App'
import axios from 'axios'


const Account = () => {
    const [data, setData] = useState([])
    const [token] = useContext(tokenContext)
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
    }, [token])

    return (
        <div className='container text-center fs-4 fw-bold' style={{ marginTop: "5rem" }}>
            Account owner <h4 className='text-danger'>{data.singleUser.name}</h4> 
        </div>
    )
}

export default Account