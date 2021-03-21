import React, {useState, useEffect} from 'react'
import axios from "axios";
import {getUser} from './../utils/utils'

export default function ProfileComponent() {
    const [user, setUser] = useState({})

    useEffect(async () => {
        const u = await getUser();
        setUser(u)
    }, [])

    console.log(user);

    return (
        <div>
            Profile
        </div>
    )
}
