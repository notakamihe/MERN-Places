import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { FaMapMarker } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import axios from 'axios'
import {getImageUrl} from '../utils'

export default function TagComponent(props) {
    const [tag, setTag] = useState({})
    const [otherTags, setOtherTags] = useState([])
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get(axios.defaults.baseURL + `api/tags/${props.id}`).then(res => {
            setTag(res.data)
            return res.data
        }).catch(err => {
            switch (err.response.status) {
                case 400:
                    setTag(null)
                    break
            }
        }).then(t => {
            axios.get(axios.defaults.baseURL + 'api/places').then(res => {
                setPlaces(res.data.filter(p => p.tags.includes(t._id)))
            })
            
            axios.get(axios.defaults.baseURL + 'api/tags').then(res => {
                setOtherTags(res.data.filter(tag => tag._id != t._id))
            })
        })
    }, [])

    console.log(otherTags);

    return (
        <div>
            {
                tag != null ?

                <div>
                    <div 
                        className="col-12" 
                        style={{
                            height: 200, 
                            backgroundColor: 'black', 
                            position: 'relative',
                            backgroundImage: `url(${getImageUrl(tag)})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <h1 
                            style={{
                                position: 'absolute', 
                                bottom: 32, 
                                left: 32, 
                                color: '#fff9',
                                fontSize: 96,
                            }}
                        >
                            {tag.name}
                        </h1>
                    </div>
                    <div className="d-flex px-5 mt-5" style={{flexWrap: "wrap"}}>
                        <div style={{flex: 3, flexWrap: 'wrap'}}>
                            <p>{tag.description}</p>
                            <h1 className="my-5">Places</h1>
                            <div className="d-flex" style={{flexWrap: 'wrap', justifyContent: 'space-between'}}>
                                {
                                    places.map(p => (
                                        <div 
                                            key={p._id}
                                            className="rounded" 
                                            style={{width: 250, marginBottom: 64}}
                                        >
                                            <div 
                                                style={{
                                                    backgroundColor: 'black',
                                                    backgroundImage: `url("${axios.defaults.baseURL}uploads/${p.imageUrl ? p.imageUrl.split('\\')[1] : null}")`,
                                                    height: 150,
                                                    width: "100%",
                                                    position: "relative",
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: "no-repeat"
                                                }}
                                            >
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
                                                        <p
                                                            style={{
                                                                color: 'white', 
                                                                margin: 0, 
                                                                backgroundColor: "#000b", 
                                                                padding: 4
                                                            }}
                                                        >
                                                            Unrated
                                                        </p>
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
                                            </div>

                                        </div>
                                    ))
                                }
                                
                            </div>
                        </div>
                        <hr className="mx-5" style={{width: 1, height: 350, flex: 0.01}} />
                        <div className="d-flex" style={{flex: 1, flexWrap: 'wrap', alignItems: 'baseline', height: 'fit-content'}}>
                            {
                               otherTags.map((ot, index) => (
                                <Link
                                    key={index}
                                    style={{
                                        marginRight: 16, 
                                        color: "#f50057", 
                                        backgroundColor: "#f5005755", 
                                        padding: 4,
                                        textDecoration: 'none',
                                        marginBottom: 32
                                    }}
                                    to={`tags/${ot._id}`}
                                >
                                    {ot.name}
                                </Link>
                               ))
                            }
                        </div>
                    </div>
                </div> 
                : 
                <p style={{textAlign: 'center', marginTop: 300}}>Tag not found.</p>
            }
        </div>
    )
}
