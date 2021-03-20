import React, {useState, useEffect} from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings';
import {getImageUrl, titleCase} from '../utils'
import Carousel from 'react-bootstrap/Carousel';


export default function PlaceComponent(props) {
    const [place, setPlace] = useState({})
    const [carouselIdx, setCarouselIdx] = useState(0)

    useEffect(() => {
        axios.get(axios.defaults.baseURL + `api/places/${props.id}`).then(res => {
            setPlace(res.data)
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
                        <div>
                            <Carousel 
                                interval={null}
                                className="col-9 mx-auto" 
                                activeIndex={carouselIdx} 
                                onSelect={(idx, e) => setCarouselIdx(idx)}
                                fade
                                indicator={false}
                            >
                                <Carousel.Item
                                    className="rounded d-flex flex-column"
                                    style={{
                                        border: "1px solid #f50057", 
                                        minHeight: 300, 
                                        textAlign: 'center',
                                        padding: 8
                                    }}
                                >
                                    <div className="mt-4">
                                        <StarRatings
                                            rating={place.averageRating}
                                            starRatedColor="#f50057"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="20px"
                                            starSpacing="3px"
                                        />  
                                    </div>
                                    <p className="mt-4 text-muted">adsfsadklfj jfkjdsafkjk jdsafk jasdklfj klasdjfkj askdfj kaljfkasj dkfadsj kfjasdkfj kalsdjf klajds kljadfskl jfadsklfj klasjdfk jasdkfja skldfjaklsdjf klasdjfklj asdklfj kasljfkl jadklsj fjfklasdfj</p>
                                    <h6 style={{justifyContent: 'flex-end'}}>thisistheuser &#183; Mar 17</h6>
                                </Carousel.Item>
                                <Carousel.Item
                                    className="rounded"
                                    style={{border: "1px solid #f50057", height: 300, textAlign: 'center'}}
                                >
                                    <div>
                                        <p>adfsfas</p>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item
                                    className="rounded"
                                    style={{border: "1px solid #f50057", height: 300, textAlign: 'center'}}
                                >
                                    <div>
                                        <p>adsfdsa</p>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
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
