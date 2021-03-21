import React, {useState, useEffect} from 'react'
import axios from "axios";
import {getUser} from './../utils/utils'
import moment from 'moment';

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
                <hr className="col-2 mx-auto mb-5" />
            </div>
            <div className="mx-auto py-4 rounded" style={{backgroundColor: "#0002", width: "25%"}}>
                <div className="d-flex mb-2 col-12">
                    <p 
                        style={{
                            flex: 0.4, 
                            fontSize: 16, 
                            fontWeight: 'bold'
                        }} 
                        className="mx-2 text-muted text-center"
                    >
                        Name
                    </p> 
                    <p 
                        style={{flex: 0.6, fontSize: 16, textAlign: 'center'}} 
                        className="m-0 text-muted">
                        {user.name}
                    </p> 
                </div>
                <div className="d-flex mb-2 col-12">
                    <p 
                        style={{
                            flex: 0.4, 
                            fontSize: 16, 
                            fontWeight: 'bold'
                        }} 
                        className="mx-2 text-muted text-center"
                    >
                        Email
                    </p> 
                    <p 
                        style={{flex: 0.6, fontSize: 16, textAlign: 'center', wordBreak: 'break-word'}} 
                        className="m-0 text-muted">
                        {user.email}
                    </p> 
                </div>
                <div className="d-flex mb-2 col-12">
                    <p 
                        style={{
                            flex: 0.4, 
                            fontSize: 16, 
                            fontWeight: 'bold'
                        }} 
                        className="mx-2 text-muted text-center"
                    >
                        Address
                    </p> 
                    <p 
                        style={{flex: 0.6, fontSize: 16, textAlign: 'center', wordWrap: wordBreak: 'break-all'}} 
                        className="m-0 text-muted">
                        {user.address}
                    </p> 
                </div>
                <div className="d-flex mb-2 col-12">
                    <p 
                        style={{
                            flex: 0.4, 
                            fontSize: 16, 
                            fontWeight: 'bold'
                        }} 
                        className="mx-2 text-muted text-center"
                    >
                        Date of birth
                    </p> 
                    <p 
                        style={{flex: 0.6, fontSize: 16, textAlign: 'center'}} 
                        className="m-0 text-muted">
                        {moment(user.dob).format("D MMM YYYY")}
                    </p> 
                </div>
            </div>
        </div>
    )
}
