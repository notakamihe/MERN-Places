import React from 'react'
import { IconButton, TextField } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

export default function PlacesComponent() {
    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: 48, marginTop: 32}}>Places</h1>
            <form className="mx-auto" style={{textAlign: 'center'}}>
                <TextField variant="outlined" type="search" className="col-5"></TextField>
            </form>
        </div>
    )
}
