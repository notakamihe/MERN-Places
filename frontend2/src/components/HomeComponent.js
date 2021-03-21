import { Button } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeComponent() {
    return (
        <div 
            className="d-flex align-items-center justify-content-center" 
            style={{height: "100vh", flexDirection: 'column'}}
        >
            <p className="text-muted font-weight-bold">Welcome to...</p>
            <h1 className="mb-5 text-danger font-weight-bold">Places</h1>
            <Link className="text-decoration-none" to={localStorage.getItem('token') ? "/places" : "/login"}>
                <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<ArrowForward />}
                >
                    Go
                </Button>
            </Link>
        </div>
    )
}
