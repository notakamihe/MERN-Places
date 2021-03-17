import React from 'react'
import { Button, TextField } from '@material-ui/core';

export default function RegisterComponent() {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <TextField id="standard-basic" label="Email" variant="outlined" />
                <div>
                    <TextField id="standard-basic" label="Password" variant="outlined" />
                    <TextField id="standard-basic" label="Confirm password" variant="outlined" />
                </div>
                <TextField id="standard-basic" label="Address" variant="outlined" />
                <div>
                    <TextField id="standard-basic" label="Name" variant="outlined" />
                    <TextField id="standard-basic" label="Dob" variant="outlined" color="secondary" />
                </div>
                <Button variant="outlined" color="secondary">Sign up</Button>
            </form>
        </div>
    )
}
