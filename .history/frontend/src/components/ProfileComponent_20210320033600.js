import React, {useState, useEffect} from 'react'
import axios from "axios";
import {getUser} from './../utils/utils'
import moment from 'moment';
import {Switch, InputLabel, TextField, FormControl} from '@material-ui/core'
import { Button } from '@material-ui/core';

export default function ProfileComponent() {
    const [user, setUser] = useState({})
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [dob, setDob] = useState("")
    const [isDarkModeOn, setIsDarkModeOn] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [editMode, setEditMode] = useState(false)
    const [passwordMode, setPasswordMode] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(async () => {
        const u = await getUser()
        setUser(u)

        setName(u.name)
        setEmail(u.email)
        setAddress(u.address)
        setDob(u.dob)
        setIsDarkModeOn(u.isDarkModeOn)
    }, [])

    const updatePassword = (e) => {
        e.preventDefault()
        setError("")

        if (password != confirmPassword) {
            setError("Passwords don't match.")
            return
        }

        axios.put(axios.defaults.baseURL + `api/users/${user._id}/change-password`, {
            password: password
        }).then(res => {
            console.log(res)
        })
    }

    const updateUser = (e) => {
        e.preventDefault()
        setError("")

        axios.put(axios.defaults.baseURL + `api/users/${user._id}`, {
            email: email,
            name: name,
            address: address,
            dob: dob,
            isDarkModeOn: isDarkModeOn
        }).then(res => {
            window.location.reload()
        }).catch(err => {
            console.log(err);

            switch (err.response.status) {
                case 400:
                    setError(err.response.data.message);
                    break
            }
        })
    }

    const UserDetails = () => {
        return (
            <div className={`mx-auto py-4 rounded ${editMode ? "d-none" : ""}`} style={{backgroundColor: "#0002", width: "25%"}}>
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
            </div>
        )
    }

    return (
        <div className="mt-5 pb-5">
            <div>
                <h1 className="mx-auto text-center">Your Profile</h1>
                <hr className="col-2 mx-auto mb-5" />
            </div>
            {error ? <p className="alert alert-danger col-7 mt-4 mx-auto">{error}</p> : null}
            <UserDetails />
            <form className={`${editMode ? "" : "d-none"}`} onSubmit={updateUser}>
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
                            onChange={(e) => setName(e.target.value)}
                            value={name}
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
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
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
                            onChange={(e) => setDob(e.target.value)}
                            value={dob}
                            inputProps={{style: {textAlign: 'center', padding: 4, color: "#6c757d"}}}
                            type="date"
                        /> 
                    </div>
                </div>
                <div className="col-3 mt-4 d-flex mx-auto" style={{justifyContent: 'center'}}>
                    <div>
                        <span className="font-weight-bold">Dark Mode</span>
                        <Switch
                            checked={isDarkModeOn}
                            onChange={() => setIsDarkModeOn(!isDarkModeOn)}
                            name="darkMode"
                        />
                    </div>
                    <div>
                        <Button type="submit">Save</Button>
                        <Button onClick={() => setEditMode(false)}>Cancel</Button>
                    </div>
                </div>
            </form>
            <div className="text-center mt-4">
                 <button 
                    className="btn btn-light font-weight-bold text-primary" 
                    style={{fontSize: 15}}
                    onClick={() => setPasswordMode(true)}
                >
                    Change password
                </button>
                 <button 
                    className="btn btn-light font-weight-bold" 
                    style={{fontSize: 15}}
                    onClick={() => setEditMode(true)}
                >
                    Edit
                </button>
                 <button 
                    className="btn btn-light font-weight-bold text-danger" 
                    style={{fontSize: 15}}
                >
                    Delete
                </button>
                <button
                    className="btn btn-light font-weight-bold text-muted" 
                    style={{fontSize: 15}}
                >
                    Log out
                </button>
            </div>
            <form className={`mt-5 text-center mx-auto ${passwordMode ? "" : "d-none"}`} onSubmit={updatePassword}>
                <div>
                    <TextField 
                        style={{flex: 0.6, fontSize: 16, textAlign: 'center'}} 
                        className="m-0 text-muted text-center my-2 col-3"
                        variant="outlined"
                        inputProps={{style: {textAlign: 'center'}}}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                    />  
                </div>
                <div>
                    <TextField 
                        style={{flex: 0.6, fontSize: 16, textAlign: 'center'}} 
                        className="m-0 text-muted text-center my-2 col-3"
                        variant="outlined"
                        inputProps={{style: {textAlign: 'center'}}}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        placeholder="Confirm password"
                    /> 
                </div>
                <div>
                    <Button type="submit">Save</Button>
                    <Button onClick={() => setPasswordMode(false)}>Cancel</Button>
                </div>
            </form>
            {success ? <p className="alert alert-success col-7 mt-4 mx-auto">{success}</p> : null}
        </div>
    )
}
