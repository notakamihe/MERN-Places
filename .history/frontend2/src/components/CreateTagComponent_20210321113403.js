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
                <div className="my-4">
                    <TextField 
                        className="mx-3 mt-4"
                        variant="outlined"
                        color="secondary"
                        inputProps={{
                            style: {
                                fontSize: 78,
                                color: "#fff3"
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
