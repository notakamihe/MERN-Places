import React from 'react'
import { TextField } from '@material-ui/core';

export default function CreatePlaceComponent() {
    return (
        <div className="py-5 mx-auto">
            <h4 className="mx-auto text-center font-weight-bold text-muted">Create a place</h4>
            <form className="mx-auto col-10 mt-5">
                <div className="col-12">
                    <TextField
                        className="col-10"
                    />
                </div>
            </form>
        </div>
    )
}
