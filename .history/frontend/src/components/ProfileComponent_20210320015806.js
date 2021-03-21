import React, {useState, useEffect} from 'react'
import axios from "axios";
import {getUser} from './../utils/utils'
import moment from 'moment';
import {Switch, InputLabel, TextField, FormControl} from '@material-ui/core'
import { Button } from '@material-ui/core';

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
            {/* <div className="mx-auto py-4 rounded" style={{backgroundColor: "#0002", width: "25%"}}>
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
                        style={{flex: 0.6, fontSize: 16, textAlign: 'center', wordBreak: 'break-word'}} 
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
            </div> */}
            <form>
                <div className="mx-auto py-4 rounded" style={{backgroundColor: "#0002", width: "25%"}}>
                    <div className="d-flex mb-2 col-12" style={{display: "flex"}}>
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
                        <TextField 
                            style={{flex: 0.6, fontSize: 16, textAlign: 'center', padding: -16}} 
                            className="m-0 text-muted text-center"
                            variant="outlined"
                            value={user.name}
                            inputProps={{style: {textAlign: 'center', padding: 4, color: "#6c757d"}}}
                            autoFocus
                        /> 
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
                        <TextField 
                            style={{flex: 0.6, fontSize: 16, textAlign: 'center', padding: -16}} 
                            className="m-0 text-muted text-center"
                            variant="outlined"
                            value={user.email}
                            inputProps={{style: {textAlign: 'center', padding: 4, color: "#6c757d"}}}
                        /> 
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
                        <TextField 
                            style={{flex: 0.6, fontSize: 16, textAlign: 'center', padding: -16}} 
                            className="m-0 text-muted text-center"
                            variant="outlined"
                            value={user.address}
                            inputProps={{style: {textAlign: 'center', padding: 4, color: "#6c757d"}}}
                        /> 
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
                        <TextField 
                            style={{flex: 0.6, fontSize: 16, textAlign: 'center', padding: -16}} 
                            className="m-0 text-muted text-center"
                            variant="outlined"
                            value={user.dob}
                            inputProps={{style: {textAlign: 'center', padding: 4, color: "#6c757d"}}}
                            type="date"
                        /> 
                    </div>
                </div>
                <div className="col-3 mt-4 d-flex mx-auto" style={{justifyContent: 'center'}}>
                    <div>
                        <span className="font-weight-bold">Dark Mode</span>
                        <Switch
                            checked={user.isDarkModeOn}
                            onChange={() => console.log("hello")}
                            name="darkMode"
                        />
                    </div>
                    <div>
                        <Button>Save</Button>
                        <Button>Cancel</Button>
                    </div>
                </div>
            </form>
            <div className="text-center mt-4">
                 <button className="btn btn-light font-weight-bold text-primary" style={{fontSize: 15}}>Change password</button>
                 <button className="btn btn-light font-weight-bold" style={{fontSize: 15}}>Edit</button>
                 <button className="btn btn-light font-weight-bold text-danger" style={{fontSize: 15}}>Delete</button>
            </div>
            <form className="mt-5 text-center mx-auto">
                <div>
                    <TextField 
                        style={{flex: 0.6, fontSize: 16, textAlign: 'center'}} 
                        className="m-0 text-muted text-center my-2 col-3"
                        variant="outlined"
                        inputProps={{style: {textAlign: 'center'}}}
                    />  
                </div>
                <div>
                    <TextField 
                        style={{flex: 0.6, fontSize: 16, textAlign: 'center'}} 
                        className="m-0 text-muted text-center my-2 col-3"
                        variant="outlined"
                        inputProps={{style: {textAlign: 'center'}}}
                    /> 
                </div>
                <div>
                        <Button>Save</Button>
                        <Button>Cancel</Button>
                    </div>
            </form>
        </div>
    )
}
