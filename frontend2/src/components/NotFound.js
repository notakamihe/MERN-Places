import { Button } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div 
            className="d-flex align-items-center justify-content-center" 
            style={{height: "100vh", flexDirection: 'column'}}
        >
            <h2 className="mb-5 text-danger font-weight-bold">PAGE NOT FOUND</h2>
            <Link className="text-decoration-none" to={"/"}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ArrowBack />}
                >
                    Back to safety
                </Button>
            </Link>
        </div>
    )
}
