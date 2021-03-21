import { TextField } from '@material-ui/core'
import React from 'react'

export default function CreateTagComponent() {
    return (
        <div>
            <div 
                className="col-12"
                style={{
                    height: 200,
                    backgroundColor: "#000"
                }}
            >
                <TextField 
                    className="mx-3 mt-3"
                    variant="outlined"
                    color="secondary"
                    style={{border: "1px solid white"}}
                />
            </div>
        </div>
    )
}
