import React, {useState, useEffect} from 'react'
import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { FaMapMarker } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import axios from 'axios'
import {getImageUrl} from '../utils'

export default function TagComponent(props) {
    const [tag, setTag] = useState({})
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
        })
    }, [])

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
                        <div style={{flex: 3}}>
                            <p>{tag.description}</p>
                            <h1 className="my-5">Places</h1>
                            <div className="d-flex" style={{flexWrap: 'wrap'}}>
                                
                            </div>
                        </div>
                        <hr className="mx-5" style={{width: 1, height: 350, flex: 0.001}} />
                        <div style={{flex: 1}}>
                        </div>
                    </div>
                </div> 
                : 
                <p style={{textAlign: 'center', marginTop: 300}}>Tag not found.</p>
            }
        </div>
    )
}