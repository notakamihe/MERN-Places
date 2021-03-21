import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function LoginComponent() {
    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (localStorage.getItem('token'))
            history.push("/profile")
    }, [])

    const logIn = (e) => {
        e.preventDefault()
        setError("")
        
        axios.post(axios.defaults.baseURL + "api/users/login", {
            email: email,
            password: password
        }).then(res => {
            localStorage.setItem('token', res.data.token)
            history.push("/profile")
        }).catch(err => {
            console.log(err);

            switch (err.response.status) {
                case 401:
                case 400:
                    setError(err.response.data.message);
                    break;
            }
        })
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: 48, marginTop: 32}} className="mb-5">Login</h1>
            <form style={{margin: "auto", textAlign: 'center'}} onSubmit={logIn}>
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
                {error ? <p className="alert alert-danger col-7 mt-4 mx-auto">{error}</p> : null}
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
