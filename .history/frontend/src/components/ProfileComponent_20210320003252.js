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
            <div>
                <h1 className="mx-auto text-center">Your Profile</h1>
                <hr className="col-2 mx-auto mb-4" />
            </div>
            <div className="d-flex mb-2">
                <p 
                    style={{
                        flex: 0.3, 
                        fontSize: 16, 
                        fontWeight: 'bold'
                    }} 
                    className="m-0 text-muted"
                >
                    Day
                </p> 
                <p 
                    style={{flex: 0.35, fontSize: 16, textAlign: 'center'}} 
                    className="m-0 text-muted">
                    Start
                </p> 
                <p 
                    style={{flex: 0.35, fontSize: 16, textAlign: 'center'}} 
                    className="m-0 text-muted"
                >
                    End
                </p> 
            </div>
        </div>
    )
}
