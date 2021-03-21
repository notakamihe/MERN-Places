import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Button, TextField } from '@material-ui/core';


export default function RegisterComponent() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [dob, setDob] = useState("")

    const register = (e) => {
        e.preventDefault()

        console.log("Registering");
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
                />
                <div>
                    <TextField 
                        id="standard-basic" 
                        label="Password" 
                        variant="outlined" 
                        color="secondary"
                        className="mx-2 my-3"
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Confirm password" 
                        variant="outlined" 
                        color="secondary"
                        className="mx-2 my-3"
                    />
                </div>
                <TextField 
                    id="standard-basic" 
                    label="Address" 
                    variant="outlined" 
                    color="secondary"
                    className="col-6 mb-3"
                />
                <div>
                    <TextField 
                        id="standard-basic" 
                        label="Name" 
                        variant="outlined" 
                        color="secondary"
                        className="mx-2"
                        style={{width: "20%"}}
                    />
                    <TextField 
                        id="standard-basic" 
                        variant="outlined" 
                        color="secondary" 
                        className="mx-2"
                        type="date"
                        style={{width: "20%"}}
                    />
                </div>
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
