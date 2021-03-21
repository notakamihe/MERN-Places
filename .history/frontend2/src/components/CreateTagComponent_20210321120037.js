import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import React from 'react'

export default function CreateTagComponent() {
    return (
        <div>
            <form>
                <div 
                    className="col-12 d-flex align-items-center"
                    style={{
                        height: 200,
                        backgroundColor: "#000"
                    }}
                >
                    <div className="col-12">
                        <TextField 
                            className="col-12"
                            variant="outlined"
                            color="secondary"
                            inputProps={{
                                style: {
                                    fontSize: 78,
                                    color: "#fff5"
                                }
                            }}
                            placeholder="Name here"
                        />
                    </div>
                </div>
                <div className="px-4 mt-4">
                    <div>
                        <label htmlFor="tagImg" className="d-block">Image</label>
                        <TextField id="tagImg" type="file" />
                    </div>
                    <div className="mt-5" >
                        <label htmlFor="description" className="d-block">Description</label>
                        <TextField 
                            multiline 
                            variant="outlined" 
                            id="description"
                            className="col-11"
                            color="secondary"
                        />
                    </div>
                    <Button variant="outlined" color="secondary" className="mt-5">Create</Button>
                </div>
            </form>
        </div>
    )
}
