import React, {useState, useEffect} from 'react'
import axios from "axios";

export default function ProfileComponent() {
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get(axios.defaults.baseURL + "api/users/user", {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then(res => {
            setUser(res.data);
        })
    }, [])

    return (
        <div>
            Profile
        </div>
    )
}
