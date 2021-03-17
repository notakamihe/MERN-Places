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
                <div className="col-3 rounded mx-auto" style={{marginTop: 128, textAlign: 'center'}}>
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
                        <p style={{color: "#ffffff", position: 'absolute', bottom: 0, right: 16}}>5 Stars</p>
                    </div>
                    <div 
                        style={{
                            border: "1px solid #f50057", 
                            borderTop: "none", 
                            textAlign: "center",
                            borderRadius: "inherit"
                        }} 
                        className="p-3"
                    >
                        <h4>Empire State Building</h4>
                        <div className="d-flex">
                            <FaMapMarker style={{marginRight: 12}} />
                            <p>285 Fulton St, New York, NY 10007</p>
                        </div>
                        <div className="d-flex">
                            <p style={{color: "#f50057", backgroundColor: "#f5005755", padding: 4}}>NYC</p>
                            <p style={{marginLeft: 16, color: "#f50057", backgroundColor: "#f5005755", padding: 4}}>Skyscraper</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
