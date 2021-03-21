import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';

export default function LoginComponent() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: 48, marginTop: 32}} className="mb-5">Login</h1>
            <form style={{margin: "auto", textAlign: 'center'}} onSubmit={() => console.log("submit")}>
                <div className="mt-3">
                    <TextField 
                        id="standard-basic" 
                        label="Email" 
                        variant="outlined" 
                        color="secondary"
                        className="col-5"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="mt-3">
                    <TextField 
                        id="standard-basic" 
                        label="Password" 
                        variant="outlined" 
                        color="secondary"
                        className="col-5"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <Button 
                    variant="outlined" 
                    color="secondary"
                    className="mt-5"
                    type="submit"
                >
                    Sign in
                </Button>
                <Link
                    style={{textTransform: 'uppercase', textDecoration: 'none'}} 
                    className='d-block mt-2'
                    color="secondary"
                    to="/register"
                >
                    Register
                </Link>
            </form>
        </div>
    )
}
