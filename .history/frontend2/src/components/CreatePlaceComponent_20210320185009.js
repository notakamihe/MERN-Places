import React from 'react'
import { TextField } from '@material-ui/core';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import Places from './../utils/algolia/Places';

export default function CreatePlaceComponent() {
    const searchClient = algoliasearch(
        '9PRLIVT5PX',
        '27fb4e964a579abf630333532b300cbf'
    );

    return (
        <div className="py-5 mx-auto">
            <h4 className="mx-auto text-center font-weight-bold text-muted">Create a place</h4>
            <form className="mx-auto col-10 mt-5">
                <div className="col-12">
                    <TextField
                        className="col-12"
                        inputProps={{
                            style: {
                                fontSize: 48,
                                textAlign: "center",
                                fontWeight: 'bold'
                            }
                        }}
                        placeholder="Name"
                        color="secondary"
                    />
                </div>
                <div className="mt-5">
                    <InstantSearch indexName="places" searchClient={searchClient}>
                        <Places
                            defaultRefinement={{
                                lat: 37.7793,
                                lng: -122.419
                            }}
                            
                        />
                    </InstantSearch>
                </div>
                <div className="col-12">
                    <TextField
                        className="col-12"
                        inputProps={{
                            style: {
                                textAlign: "center"
                            }
                        }}
                        variant="outlined"
                        multiline
                        placeholder="Your description goes here"
                        color="secondary"
                    />
                </div>
                <div className="col-10 mx-auto mt-5" style={{position: "relative"}}>
                    <img 
                        src={"/static/images/placeholder.png"}
                        className="col-12"
                        style={{
                            filter: "brightness(90%)"
                        }}
                    />
                    <input 
                        type="file" 
                        style={{
                            position: 'absolute',
                            top: "50%",
                            left: "40%"
                        }}
                        accept="image/*"
                    />
                </div>
                <div className="col-8 mx-auto">
                    <div className="d-flex align-items-center">
                        <p className="m-0">Sunday</p>
                        <div>
                            <TextField 
                                type="time"
                                label="Opens"
                                style={{
                                    width: 200
                                }}
                                InputLabelProps={{
                                    shrink: false,
                                    style: {
                                        marginLeft: 84
                                    }
                                }}
                                variant="outlined"
                                className="mx-3"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="time"
                                label="Closes"
                                style={{
                                    width: 200
                                }}
                                InputLabelProps={{
                                    shrink: false,
                                    style: {
                                        marginLeft: 84,
                                        display: "relative"
                                    }
                                }}
                                variant="outlined"
                                className="mx-3"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
