import React from 'react'
import { Button, TextField } from '@material-ui/core';

export default function LoginComponent() {
    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: 48, marginTop: 32}}>Login</h1>
            <form style={{margin: "auto", textAlign: 'center'}} onSubmit={() => console.log("submit")}>
                <TextField 
                    id="standard-basic" 
                    label="Email" 
                    variant="outlined" 
                    color="secondary"
                    className="mt-5 col-5"
                />
                <TextField 
                    id="standard-basic" 
                    label="Address" 
                    variant="outlined" 
                    color="secondary"
                    className="col-6 mb-3"
                    type="password"
                />
                <Button 
                    variant="outlined" 
                    color="secondary"
                    className="mt-5"
                    type="submit"
                >
                    Sign in
                </Button>
            </form>
        </div>
    )
}
