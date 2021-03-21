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
                    <div>
                        <TextField multiline variant="outlined" className="mt-5" />
                    </div>
                </div>
            </form>
        </div>
    )
}