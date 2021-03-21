import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Button, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'


export default function RegisterComponent() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [dob, setDob] = useState("")

    const register = (e) => {
        e.preventDefault()

        console.log(email, password, confirmPassword, address, name, dob);
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: 48, marginTop: 32}}>Register</h1>
            <form style={{margin: "auto", textAlign: 'center'}} onSubmit={register}>
                <TextField 
                    id="standard-basic" 
                    label="Email" 
                    variant="outlined" 
                    color="secondary"
                    className="mt-5 col-5"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <div>
                    <TextField 
                        id="standard-basic" 
                        label="Password" 
                        variant="outlined" 
                        color="secondary"
                        className="mx-2 my-3"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Confirm password" 
                        variant="outlined" 
                        color="secondary"
                        className="mx-2 my-3"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                </div>
                <TextField 
                    id="standard-basic" 
                    label="Address" 
                    variant="outlined" 
                    color="secondary"
                    className="col-6 mb-3"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                />
                <div>
                    <TextField 
                        id="standard-basic" 
                        label="Name" 
                        variant="outlined" 
                        color="secondary"
                        className="mx-2"
                        style={{width: "20%"}}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <TextField 
                        id="standard-basic" 
                        variant="outlined" 
                        color="secondary" 
                        className="mx-2"
                        type="date"
                        style={{width: "20%"}}
                        onChange={(e) => setDob(e.target.value)}
                        value={dob}
                    />
                </div>
                <MuiAlert elevation={6} variant="filled" severity="error">This is an error message /</MuiAlert>>
                <Button 
                    variant="outlined" 
                    color="secondary"
                    className="mt-5"
                    type="submit"
                >
                    Sign up
                </Button>
            </form>
            <Link
                style={{textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center'}} 
                className='d-block mt-2 mx-auto'
                color="secondary"
                to="/login"
            >
                Login
            </Link>
        </div>
    )
}
