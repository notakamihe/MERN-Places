import React, {useState, useEffect} from 'react'
import { IconButton, TextField } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { FaMapMarker } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

export default function PlacesComponent() {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get(axios.defaults.baseURL + 'api/places').then(res => {
            setPlaces(res.data)
        })
    }, [])

    return (
        <div className="my-5">
            <h1 style={{textAlign: 'center', fontSize: 48}} className="my-5">Places</h1>
            <form className="mx-auto mb-5" style={{textAlign: 'center'}}>
                <TextField variant="outlined" type="search" className="col-5" color="secondary"></TextField>
                <IconButton className="mx-3" color="secondary">
                    <SearchOutlined />
                </IconButton>
            </form>
            <div className="px-5 mt-5" style={{textAlign: 'center'}}>
                {places.map(p => (
                    <div 
                        key={p._id}
                        className="col-3 rounded mx-5" 
                        style={{marginTop: 128, display: 'inline-block'}}>
                        <div 
                            style={{
                                backgroundColor: "black", 
                                width: "100%", 
                                height: 200, 
                                borderTopLeftRadius: 'inherit',
                                borderTopRightRadius: 'inherit',
                                position: 'relative'
                            }}
                        >
                            <div style={{position: 'absolute', bottom: 16, right: 16}}>
                                <StarRatings
                                    rating={4.5}
                                    starRatedColor="yellow"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="20px"
                                    starSpacing="3px"
                                    
                                />
                            </div>
                        </div>
                        <div 
                            style={{
                                border: "1px solid #f50057", 
                                borderTop: "none", 
                                textAlign: "center",
                                borderRadius: "inherit"
                            }} 
                            className="p-3"
                        >
                            <h4>{p.name}</h4>
                            <div className="d-flex">
                                <FaMapMarker style={{marginRight: 12}} />
                                <p>{p.location}</p>
                            </div>
                            <div className="d-flex">
                                {p.tags.map(tag => (
                                    <p style={{marginLeft: 16, color: "#f50057", backgroundColor: "#f5005755", padding: 4}}>Skyscraper</p>
                                ))}
                                <p style={{color: "#f50057", backgroundColor: "#f5005755", padding: 4}}>NYC</p>
                                <p style={{marginLeft: 16, color: "#f50057", backgroundColor: "#f5005755", padding: 4}}>Skyscraper</p>
                            </div>
                        </div>

                    </div>
                ))}
                
                <div className="col-3 rounded mx-auto" style={{marginTop: 128, display: 'inline-block'}}>
                    <div 
                        style={{
                            backgroundColor: "black", 
                            width: "100%", 
                            height: 200, 
                            borderTopLeftRadius: 'inherit',
                            borderTopRightRadius: 'inherit',
                            position: 'relative'
                        }}
                    >
                        <div style={{position: 'absolute', bottom: 16, right: 16}}>
                            <StarRatings
                                rating={4.5}
                                starRatedColor="yellow"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing="3px"
                                
                            />
                        </div>
                    </div>
                    <div 
                        style={{
                            border: "1px solid #f50057", 
                            borderTop: "none", 
                            textAlign: "center",
                            borderRadius: "inherit"
                        }} 
                        className="p-3"
                    >
                        <h4>Empire State Building</h4>
                        <div className="d-flex">
                            <FaMapMarker style={{marginRight: 12}} />
                            <p>285 Fulton St, New York, NY 10007</p>
                        </div>
                        <div className="d-flex">
                            <p style={{color: "#f50057", backgroundColor: "#f5005755", padding: 4}}>NYC</p>
                            <p style={{marginLeft: 16, color: "#f50057", backgroundColor: "#f5005755", padding: 4}}>Skyscraper</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
