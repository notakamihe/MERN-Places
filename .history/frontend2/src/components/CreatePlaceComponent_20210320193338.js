import React from 'react'
import { TextField } from '@material-ui/core';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import Places from './../utils/algolia/Places';
import { FaMinus, FaPlus } from 'react-icons/fa';

export default function CreatePlaceComponent() {
    const searchClient = algoliasearch(
        '9PRLIVT5PX',
        '27fb4e964a579abf630333532b300cbf'
    );

    const DayRow = (props) => (
        <div className="d-flex align-items-center text-center mx-auto my-2" style={{justifyContent: "center"}}>
            <h5 className="m-0 p-3 mx-5 rounded" style={{backgroundColor: "#0003"}}>{props.day}</h5>
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
                    color="secondary"
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
                    color="secondary"
                />
            </div>
        </div>
    )

    return (
        <div className="pt-5 px-5 mx-auto" style={{paddingBottom: 128}}>
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
                            top: "60%",
                            left: "40%"
                        }}
                        accept="image/*"
                    />
                </div>
                <div className="col-10 mx-auto text-center mt-5">
                    <DayRow day="Sunday" />
                    <DayRow day="Monday" />
                    <DayRow day="Tuesday" />
                    <DayRow day="Wednesday" />
                    <DayRow day="Thursday" />
                    <DayRow day="Friday" />
                    <DayRow day="Saturday" />
                </div>
                <div className="mt-5 col-9 text-center mx-auto">
                    <h4 className="text-left font-weight-bold mb-5">Additional Info</h4>
                    <div>
                        <div className="d-flex align-items-center my-3">
                            <div className="mx-2" style={{flex: 0.4}}>
                                <TextField 
                                    variant="outlined"
                                    color="secondary"
                                    className="col-12"
                                />
                            </div>
                            :
                            <div className="mx-5" style={{flex: 0.6}}>
                                <TextField 
                                    variant="outlined"
                                    color="secondary"
                                    className="col-12"
                                />
                            </div>
                            <div 
                                className="p-1 d-flex align-items-center" 
                                style={{border: "1px solid #f50057", borderRadius: 30, width: 32, height: 32}}
                            >
                            <FaMinus size={15} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center my-3">
                            <div className="mx-2" style={{flex: 0.4}}>
                                <TextField 
                                    variant="outlined"
                                    color="secondary"
                                    className="col-12"
                                />
                            </div>
                            :
                            <div className="mx-5" style={{flex: 0.6}}>
                                <TextField 
                                    variant="outlined"
                                    color="secondary"
                                    className="col-12"
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center my-3">
                            <div className="mx-2" style={{flex: 0.4}}>
                                <TextField 
                                    variant="outlined"
                                    color="secondary"
                                    className="col-12"
                                />
                            </div>
                            :
                            <div className="mx-5" style={{flex: 0.6}}>
                                <TextField 
                                    variant="outlined"
                                    color="secondary"
                                    className="col-12"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
