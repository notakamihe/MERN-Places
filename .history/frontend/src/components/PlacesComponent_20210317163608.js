import React, {useState, useEffect} from 'react'
import { IconButton, TextField } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { FaMapMarker } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import css from './styles.css';
import styled from 'styled-components';
import img from './iphone27.jpg'

export default function PlacesComponent() {
    const [places, setPlaces] = useState([])
    const [tags, setTags] = useState([])
    const [search, setSearch] = useState("")

    const Header = styled.div`
        width: 100%;
        height: 200px;
        position: relative;
        background-image: url("iphone27.jpg");
    `;

    useEffect(() => {
        axios.get(axios.defaults.baseURL + 'api/places').then(res => {
            setPlaces(res.data)

            res.data.forEach(place => {
                place.tags.forEach(tag => {
                    axios.get(axios.defaults.baseURL + `api/tags/${tag}`).then(r => {
                        var data = r.data
                        data["place"] = place._id
                        setTags(tags => [...tags, data])
                    })
                })
            })
        })
    }, [])

    return (
        <div className="my-5">
            <h1 style={{textAlign: 'center', fontSize: 48}} className="my-5">Places</h1>
            <form className="mx-auto mb-5" style={{textAlign: 'center'}}>
                <TextField 
                    variant="outlined" 
                    type="search" 
                    className="col-5" 
                    color="secondary"
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                />
                <IconButton className="mx-3" color="secondary">
                    <SearchOutlined />
                </IconButton>
            </form>
            <div className="px-5 mt-5 d-flex" style={{justifyContent: 'center', flexWrap: "wrap"}}>
                {places.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
                    <div 
                        key={p._id}
                        className="rounded mx-5" 
                        style={{marginTop: 128, width: 315}}>
                        <div className="hi">
                            {
                                () => {
                                    const newImg = React.lazy(() => import('./iphone27.jpg'))
                                    return <img src={newImg} width="400" height="500" />
                                }
                            }
                            
                            <div style={{position: 'absolute', bottom: 16, right: 16}}>
                                {
                                    p.averageRating != null ?
                                    <StarRatings
                                        rating={p.averageRating}
                                        starRatedColor="yellow"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="3px"
                                    /> : 
                                    <p style={{color: 'white', margin: 0}}>Unrated</p>
                                }
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
                                {tags.filter(t => t.place == p._id).map((tag, index) => {
                                    return (
                                        <p 
                                            key={index}
                                            style={{
                                                marginLeft: 16, 
                                                color: "#f50057", 
                                                backgroundColor: "#f5005755", 
                                                padding: 4
                                            }}
                                        >
                                            {tag.name}
                                        </p>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
