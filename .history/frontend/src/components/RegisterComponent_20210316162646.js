import React from 'react'
import { TextField } from '@material-ui/core';

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
            </form>
        </div>
    )
}