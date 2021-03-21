import React, {useState, useEffect} from 'react'
import axios from "axios";
import {getUser} from './../utils/utils'

export default function ProfileComponent() {
    const [user, setUser] = useState({})

    useEffect(async () => {
        setUser(await getUser())
    }, [])

    console.log(user);

    return (
        <div className="mt-5">
            <h1 className="mx-auto text-center">Your Profile</h1>
        </div>
    )
}
