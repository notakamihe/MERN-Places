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
                            style: 
                                textAlign: "center"
                            }
                        }}
                        multiline
                        placeholder="Name"
                    />
                </div>
            </form>
        </div>
    )
}
