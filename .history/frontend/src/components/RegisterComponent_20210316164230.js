import React from 'react'
import { Button, TextField } from '@material-ui/core';

export default function RegisterComponent() {
    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: 48}}>Register</h1>
            <form style={{margin: "auto", textAlign: 'center'}}>
                <TextField 
                    id="standard-basic" 
                    label="Email" 
                    variant="outlined" 
                    color="secondary"
                    className="m-5"
                />
                <div>
                    <TextField id="standard-basic" label="Password" variant="outlined" color="secondary"/>
                    <TextField 
                        id="standard-basic" 
                        label="Confirm password" 
                        variant="outlined" 
                        color="secondary"
                    />
                </div>
                <TextField id="standard-basic" label="Address" variant="outlined" color="secondary"/>
                <div>
                    <TextField id="standard-basic" label="Name" variant="outlined" color="secondary"/>
                    <TextField id="standard-basic" label="Dob" variant="outlined" color="secondary" />
                </div>
                <Button variant="outlined" color="secondary">Sign up</Button>
            </form>
        </div>
    )
}
