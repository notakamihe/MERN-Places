import React, {useState, useEffect} from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings';
import {getImageUrl, titleCase} from '../utils'
import Carousel from 'react-bootstrap/Carousel';
import moment from 'moment'

export default function PlaceComponent(props) {
    const [place, setPlace] = useState({})
    const [tags, setTags] = useState([])
    const [carouselIdx, setCarouselIdx] = useState(0)

    useEffect(() => {
        axios.get(axios.defaults.baseURL + `api/places/${props.id}`).then(res => {
            setPlace(res.data)
            return res.data
        }).then(p => {
            axios.get(axios.defaults.baseURL + "api/tags").then(res => {
                setTags(res.data.filter(t => place.tags.includes(t._id)))
            })
        }).catch(err => {
            switch (err.response.status) {
                case 400:
                    setPlace(null)
                    break
            }
        })
    }, [])

    return (
        <div style={{margin: "auto 160px"}}>
            {
                place != null ?

                <div className="d-flex" style={{margin: '64px auto'}}>
                    <div style={{flex: 5, flexWrap: 'wrap'}}>
                        <h1>{place.name}</h1>
                        <h4 className="text-muted">{place.location}</h4>
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
                        </div>
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
                                    Object.keys(place.hoursOpen || {}).map(d => (
                                        <div>
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
                                        Object.keys(place.additionalInfo || {}).map(field => (
                                            <div>
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
                            <Carousel 
                                className="col-9 mx-auto" 
                                activeIndex={carouselIdx} 
                                onSelect={(idx, e) => setCarouselIdx(idx)}
                                indicators={false}
                                fade
                                prevIcon={(
                                    <p style={{
                                        color: 'black',
                                        marginLeft: -160
                                    }}>&#60;</p>
                                )}
                                nextIcon={(
                                    <p style={{
                                        color: 'black',
                                        marginRight: -160
                                    }}>&#62;</p>
                                )}
                            >
                                {
                                    place.ratings ? place.ratings.map(r => (
                                        <Carousel.Item
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
                                            <h6>thisistheuser &#183; {moment(new Date(Date.parse(r.addedOn))).format('ll')}</h6>
                                        </Carousel.Item>
                                    )) : null
                                }
                            </Carousel>
                        </div>
                        <div>
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
                    </div>
                    <div style={{flex: 2}}>
                    </div>
                </div> 
                : 
                <p style={{textAlign: 'center', marginTop: 300}}>Tag not found.</p>
            }
        </div>
    )
}
