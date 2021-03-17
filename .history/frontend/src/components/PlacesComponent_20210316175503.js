import React from 'react'
import { IconButton, TextField } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

export default function PlacesComponent() {
    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: 48}} className="my-5">Places</h1>
            <form className="mx-auto mb-4" style={{textAlign: 'center'}}>
                <TextField variant="outlined" type="search" className="col-5" color="secondary"></TextField>
                <IconButton className="mx-3" color="secondary">
                    <SearchOutlined />
                </IconButton>
            </form>
            <div>
                <div>
                    <h3>Empire State Building</h3>
                    <div>
                        <i class="fas fa-camera"></i>
                        <p>285 Fulton St, New York, NY 10007</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
