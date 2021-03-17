import React from 'react'
import { Button, TextField } from '@material-ui/core';

export default function LoginComponent() {
    return (
        <div>
            <h1 style={{textAlign: 'center', fontSize: 48, marginTop: 32}}>Login</h1>
            <form style={{margin: "auto", textAlign: 'center'}} onSubmit={() => console.log("submit")}>
                <TextField 
                    id="standard-basic" 
                    label="Email" 
                    variant="outlined" 
                    color="secondary"
                    className="mt-5 col-5"
                />
                <div>
                    <TextField 
                        id="standard-basic" 
                        label="Password" 
                        variant="outlined" 
                        color="secondary"
                        className="mx-2 my-3"
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Confirm password" 
                        variant="outlined" 
                        color="secondary"
                        className="mx-2 my-3"
                    />
                </div>
                <TextField 
                    id="standard-basic" 
                    label="Address" 
                    variant="outlined" 
                    color="secondary"
                    className="col-6 mb-3"
                />
                <div>
                    <TextField 
                        id="standard-basic" 
                        label="Name" 
                        variant="outlined" 
                        color="secondary"
                        className="mx-2"
                        style={{width: "20%"}}
                    />
                    <TextField 
                        id="standard-basic" 
                        variant="outlined" 
                        color="secondary" 
                        className="mx-2"
                        type="date"
                        style={{width: "20%"}}
                    />
                </div>
                <Button 
                    variant="outlined" 
                    color="secondary"
                    className="mt-5"
                    type="submit"
                >
                    Sign up
                </Button>
            </form>
        </div>
    )
}
