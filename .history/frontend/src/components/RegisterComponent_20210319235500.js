import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Button, TextField } from '@material-ui/core';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import Places from './../utils/algolia/Places';
import axios from 'axios'

export default function RegisterComponent() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [dob, setDob] = useState("")
    const [error, setError] = useState("")

    const register = (e) => {
        e.preventDefault()
        setError("")

        if (password != confirmPassword) {
            setError("Passwords don't match.")
            return
        }

        axios.post(axios.defaults.baseURL + "api/users/register", {
            email: email,
            password: password,
            address: document.querySelector("#address-input").value,
            name: name,
            dob: dob
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            switch (err.response.status) {
                case 400:
                    setError(err.response.data.message);
                    break;
            }
        })

        console.log(email, password, confirmPassword, address, name, dob);
    }

    const searchClient = algoliasearch(
        '9PRLIVT5PX',
        '6410375b80077c4b32fea46b1196322a'
    );

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
                <InstantSearch indexName="places" searchClient={searchClient}>
                    <Places
                        defaultRefinement={{
                            lat: 37.7793,
                            lng: -122.419
                        }}
                        
                    />
                </InstantSearch>
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
                {error ? <p className="alert alert-danger col-7 mt-4 mx-auto">{error}</p> : null}
                <Button 
                    variant="outlined" 
                    color="secondary"
                    type="submit"
                    className="mt-4"
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
