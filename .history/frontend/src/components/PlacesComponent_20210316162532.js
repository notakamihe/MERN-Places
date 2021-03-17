import React from 'react'
import { TextField } from '@material-ui/core';

export default function PlacesComponent() {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <TextField id="standard-basic" label="Email" variant="outlined" />
            </form>
        </div>
    )
}
