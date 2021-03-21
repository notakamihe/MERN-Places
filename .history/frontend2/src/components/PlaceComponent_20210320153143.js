import React, {useState, useEffect} from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings';
import {getImageUrl, titleCase, getUser} from '../utils/utils'
import Carousel from 'react-bootstrap/Carousel';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { FaMapMarker, FaTimes, FaChevronRight, FaChevronLeft, FaPlus } from 'react-icons/fa';
import {LoadScript, GoogleMap, Marker} from '@react-google-maps/api'
import { Modal, TextField } from '@material-ui/core';
import styles from "./../styles/styles.css";
import { Button } from '@material-ui/core';

export default function PlaceComponent(props) {
    var google = window.google
    var geocoder = new google.maps.Geocoder()

    const [place, setPlace] = useState({})
    const [tags, setTags] = useState([])
    const [carouselIdx, setCarouselIdx] = useState(0)
    const [otherPlaces, setOtherPlaces] = useState([])

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [showMapModal, setShowMapModal] = useState(false)

    const [user, setUser] = useState({})
    const [rating, setRating] = useState(3)
    const [description, setDescription] = useState("")
    const [ratingMode, setRatingMode] = useState(false)

    useEffect(async () => {
        load(props.id) 
        setUser(await getUser())
    }, [])

    const addRating = (e) => {
        e.preventDefault()

        const newPlace = place

        newPlace.ratings.forEach(r => {
            if (r.user) {
                r.user = r.user._id
            }
        })

        newPlace.ratings.push({
            rating: rating,
            description: description,
            addedOn: new Date(),
            user: user._id
        })

        axios.put(axios.defaults.baseURL + `api/places/${place._id}`, newPlace).then(res => {
            console.log(res.data);
            load(props.id)
            setRating(3)
            setRatingMode(false)
        }).catch(err => {
            console.log(err);
        })
    }

    const load = (id) => {
        axios.get(axios.defaults.baseURL + `api/places/${id}`).then(res => {
            res.data.ratings.forEach(rating => {
                if (rating.user) {
                    axios.get(axios.defaults.baseURL + `api/users/${rating.user}`).then(r => {
                        rating.user = r.data
                    })
                }
            })

            res.data.ratings.reverse()

            setPlace(res.data)
            return res.data
        }).then(p => {
            axios.get(axios.defaults.baseURL + "api/tags").then(res => {
                setTags(res.data.filter(t => p.tags.includes(t._id)))
                return res.data.filter(t => p.tags.includes(t._id))
            }).then(t => {
                axios.get(axios.defaults.baseURL + "api/places").then(r => {
                    setOtherPlaces(r.data.filter(op => 
                        op._id != p._id && op.tags.some(pt => t.map(x => x._id).includes(pt))))
                })
            })

            geocoder.geocode( {'address': p.location}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    setLatitude(results[0].geometry.location.lat())
                    setLongitude(results[0].geometry.location.lng())
                } 
            });
        }).catch(err => {
            switch (err.response.status) {
                case 400:
                    setPlace(null)
                    break
            }
        })
    }

    return (
        <div style={{margin: "auto 160px"}}>
            {
                place != null ?

                <div className="d-flex" style={{margin: '64px auto'}}>
                    <div style={{flex: 4, flexWrap: 'wrap'}}>
                        <h1>{place.name}</h1>
                        <h4 id="place-address" onClick={() => setShowMapModal(true)}>{place.location}</h4>
                        {
                            place.averageRating != null ?

                            <div className="d-flex">
                                <div style={{marginTop: -4}}>
                                    <StarRatings
                                        rating={place.averageRating}
                                        starRatedColor="#f50057"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="3px"
                                        
                                    />
                                </div>
                                <span className="mx-3">&#183;</span>
                                <p>{place.averageRating} stars</p>
                            </div> : null
                        }
                        <p>{place.description}</p>
                        <img src={getImageUrl(place)} style={{width: "100%"}} />
                        <div className="my-5 d-flex" style={{alignItems: 'baseline'}}>
                            <div style={{backgroundColor: "#0002"}} className="p-4 rounded">
                                <div className="d-flex mb-2">
                                    <p 
                                        style={{
                                            flex: 0.3, 
                                            fontSize: 16, 
                                            fontWeight: 'bold'
                                        }} 
                                        className="m-0 text-muted"
                                    >
                                        Day
                                    </p> 
                                    <p 
                                        style={{flex: 0.35, fontSize: 16, textAlign: 'center'}} 
                                        className="m-0 text-muted">
                                        Start
                                    </p> 
                                    <p 
                                        style={{flex: 0.35, fontSize: 16, textAlign: 'center'}} 
                                        className="m-0 text-muted"
                                    >
                                        End
                                    </p> 
                                </div>
                                {
                                    Object.keys(place.hoursOpen || {}).map((d, index) => (
                                        <div key={index}>
                                            <div className="d-flex" style={{width: 200}}>
                                                <p 
                                                    style={{
                                                        flex: 0.3, 
                                                        fontSize: 16, 
                                                        fontWeight: 'bold'
                                                    }} 
                                                    className="m-0 text-muted"
                                                >
                                                    {titleCase(d)}
                                                </p> 
                                                <p 
                                                    style={{
                                                        flex: 0.35, 
                                                        fontSize: 16, 
                                                        textAlign: 'center',
                                                        color: "#f50057"
                                                    }} 
                                                    className="m-0"
                                                >
                                                    {d ? place.hoursOpen[d]["startTime"] : null}
                                                </p> 
                                                <p 
                                                    style={{
                                                        flex: 0.35, 
                                                        fontSize: 16, 
                                                        textAlign: 'center',
                                                        color: "#f50057"
                                                    }} 
                                                    className="m-0"
                                                >
                                                    {d ? place.hoursOpen[d]["endTime"] : null}
                                                </p> 
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div 
                                style={{backgroundColor: "#0002", marginLeft: 48, flexGrow: 1}} 
                                className="p-4 rounded"
                            >
                                <div>
                                    {
                                        Object.keys(place.additionalInfo || {}).map((field, index) => (
                                            <div key={index}>
                                                <span 
                                                    className="text-muted"
                                                    style={{fontWeight: 'bold'}}
                                                >
                                                    {titleCase(field)}: &#160;
                                                </span> 
                                                <span
                                                    style={{color: "#f50057"}}
                                                >{place.additionalInfo[field].toString()}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            {
                                place.ratings && place.ratings.length > 0 ? 

                                <div>
                                    <h5 style={{textAlign: 'center'}}>{place.ratings.length} Ratings</h5>
                                    <Carousel 
                                        className="col-9 mx-auto" 
                                        activeIndex={carouselIdx} 
                                        onSelect={(idx, e) => setCarouselIdx(idx)}
                                        indicators={false}
                                        fade
                                        prevIcon={(
                                            <FaChevronLeft 
                                                style={{
                                                    color: '#f50057',
                                                    marginLeft: -160
                                                }}
                                                size={30}
                                            />
                                        )}
                                        nextIcon={(
                                            <FaChevronRight 
                                                style={{
                                                    color: '#f50057',
                                                    marginRight: -160
                                                }}
                                                size={30}
                                            />
                                        )}
                                    >
                                        {
                                            place.ratings.map((r, index) => (
                                                <Carousel.Item
                                                    key={index}
                                                    className="rounded d-flex flex-column px-4"
                                                    style={{
                                                        border: "1px solid #f50057", 
                                                        minHeight: 300, 
                                                        textAlign: 'center',
                                                        padding: 8,
                                                        backgroundColor: "#fff"
                                                    }}
                                                >
                                                    <div className="mt-4">
                                                        <StarRatings
                                                            rating={r.rating}
                                                            starRatedColor="#f50057"
                                                            numberOfStars={5}
                                                            name='rating'
                                                            starDimension="20px"
                                                            starSpacing="3px"
                                                        />  
                                                    </div>
                                                    <p 
                                                        className="mt-4 text-muted" 
                                                        style={{
                                                            flexGrow: 1, 
                                                            textAlign: 'justify',
                                                            textAlignLast: 'center'
                                                        }}
                                                    >
                                                            {r.description}
                                                        </p>
                                                    <h6>{r.user.name} &#183; {moment(new Date(Date.parse(r.addedOn))).format('ll')}</h6>
                                                </Carousel.Item>
                                            ))
                                        }
                                    </Carousel> 
                                </div>: null
                            }
                        </div>
                        <div className="text-center">
                            {
                                user ? 
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    startIcon={<FaPlus />}
                                    style={{borderRadius: 25}}
                                    className={`${ratingMode ? "d-none" : ""}`}
                                    onClick={() => setRatingMode(true)}
                                >
                                    Add a rating
                                </Button> : null
                            }
                            <form className={`${ratingMode ? "" : "d-none"}`} onSubmit={addRating}>
                                <div>
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        style={{borderRadius: 25}}
                                        className="mx-3"
                                        type="submit"
                                    >
                                        Post
                                    </Button>
                                    <Button
                                        color="info"
                                        variant="outlined"
                                        style={{borderRadius: 25}}
                                        className="mx-3"
                                        onClick={() => setRatingMode(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                                <div 
                                    className="col-9 text-center mx-auto rounded mt-4 p-3" 
                                    style={{backgroundColor: "#0001"}}
                                >
                                    <div>
                                        <StarRatings
                                            rating={rating}
                                            starRatedColor="#f50057"
                                            starHoverColor="#000"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="30px"
                                            starSpacing="3px"
                                            changeRating={(newRating, name) => setRating(newRating)}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <TextField 
                                            multiline
                                            className="col-12"
                                            color="secondary"
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div 
                            className="d-flex" 
                            style={{
                                flex: 1, 
                                flexWrap: 'wrap', 
                                alignItems: 'baseline', 
                                height: 'fit-content', 
                                justifyContent: 'flex-end',
                                marginTop: 96
                            }}
                        >
                            {
                                tags.map((t, index) => (
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
                                        to={`/tags/${t._id}`}
                                    >
                                        {t.name}
                                    </Link>
                               ))
                            }
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    <div style={{flex: 1, marginLeft: 64}}>
                        <h3>Related</h3>
                        <div className="mt-5">
                            {
                                otherPlaces.map(op => (
                                    <div 
                                        key={op._id}
                                        className="rounded mx-5" 
                                        style={{width: 250, marginBottom: 64}}>
                                        <div 
                                            style={{
                                                backgroundColor: 'black',
                                                backgroundImage: `url("${getImageUrl(op)}")`,
                                                height: 200,
                                                width: "100%",
                                                position: "relative",
                                                backgroundSize: 'cover',
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: 'center'
                                            }}
                                        >
                                            <div style={{position: 'absolute', bottom: 16, right: 16}}>
                                                {
                                                    op.averageRating != null ?
                                                    <StarRatings
                                                        rating={op.averageRating}
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
                                            <div>
                                                <Link 
                                                    style={{textDecoration: 'none', color: "#f50057"}} 
                                                    to={`/places/${op._id}`}
                                                    onClick={() => load(op._id)}
                                                >
                                                    <h4>{op.name}</h4>
                                                    <div className="d-flex">
                                                        <FaMapMarker style={{marginRight: 12}} />
                                                        <p>{op.location}</p>
                                                    </div>
                                                </Link>
                                                <div 
                                                    className="d-flex" 
                                                    style={{
                                                        alignItems: 'baseline',
                                                        overflowX: "auto",
                                                        whiteSpace: "nowrap"
                                                    }}
                                                >
                                                    {tags.filter(t => op.tags.includes(t._id)).map((tag, index) => {
                                                        return (
                                                            <Link
                                                                key={index}
                                                                style={{
                                                                    marginLeft: index !== 0 ? 4 : 0, 
                                                                    color: "#f50057", 
                                                                    backgroundColor: "#f5005755", 
                                                                    padding: 4,
                                                                    textDecoration: 'none'
                                                                }}
                                                                to={`/tags/${tag._id}`}
                                                            >
                                                                {tag.name}
                                                            </Link>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <Modal
                        open={showMapModal}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <div
                            style={{
                                width: 500,
                                height: 500,
                                margin: "auto",
                                border: "2px solid #f50057",
                                borderRadius: 15,
                                display: 'flex',
                                alignItems: 'center',
                                outline: "none"
                            }}
                            
                        >
                            <div
                                style={{
                                    backgroundColor: '#fff',
                                    width: 485,
                                    height: 485,
                                    borderRadius: "inherit",
                                    outline: "none",
                                    margin: "auto",
                                    position: 'relative'
                                }}
                            >
                                <button
                                    style={{
                                        position: "absolute",
                                        top: 10,
                                        right: 60,
                                        zIndex: 1,
                                        backgroundColor: "#fff",
                                        padding: 5,
                                        boxShadow: "0 1px 8px #888888",
                                        border: "none"
                                    }}
                                    onClick={() => setShowMapModal(false)}
                                >
                                    <FaTimes   
                                        size={30}
                                        className="text-muted"
                                    />
                                </button>
                                <GoogleMap
                                    mapContainerStyle={{width: "inherit", height: "inherit", borderRadius: "inherit"}}
                                    center={{
                                        lat: latitude || 0,
                                        lng: longitude || 0
                                    }}
                                    zoom={15}
                                    mapTypeId={google.maps.MapTypeId.HYBRID}
                                >
                                    <Marker 
                                        icon={"http://maps.google.com/mapfiles/ms/icons/pink.png"}
                                        position={{lat: (latitude || 0), lng: (longitude || 0)}}></Marker>
                                </GoogleMap>
                            </div>
                        </div>
                    </Modal>
                </div> 
                : 
                <p style={{textAlign: 'center', marginTop: 300}}>Tag not found.</p>
            }
        </div>
    )
}
