import React from 'react'
import { IconButton, TextField } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { FaMapMarker } from 'react-icons/fa';

export default function PlacesComponent() {
    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: 48}} className="my-5">Places</h1>
            <form className="mx-auto mb-5" style={{textAlign: 'center'}}>
                <TextField variant="outlined" type="search" className="col-5" color="secondary"></TextField>
                <IconButton className="mx-3" color="secondary">
                    <SearchOutlined />
                </IconButton>
            </form>
            <div className="px-5 mt-5">
                <div className="col-3 rounded">
                    <div 
                        style={{
                            backgroundColor: "black", 
                            width: "100%", 
                            height: 200, 
                            borderTopLeftRadius: 'inherit',
                            borderTopRightRadius: 'inherit',
                            position: 'relative'
                        }}
                    >
                        <p style={{color: "#ffffff", position: 'absolute', bottom: 16, right: 16}}>5 Stars</p>
                    </div>
                    <h3>Empire State Building</h3>
                    <div className="d-flex">
                        <FaMapMarker style={{marginRight: 12}} />
                        <p>285 Fulton St, New York, NY 10007</p>
                    </div>
                </div>
            </div>
        </div>
    )
}