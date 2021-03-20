import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {getImageUrl} from '../utils'

export default function TagComponent(props) {
    const [tag, setTag] = useState({})

    useEffect(() => {
        axios.get(axios.defaults.baseURL + `api/tags/${props.id}`).then(res => {
            setTag(res.data)
        }).catch(err => {
            switch (err.response.status) {
                case 400:
                    setTag(null)
                    break
            }
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
                                color: '#fff8',
                                fontSize: 96
                            }}
                        >
                            {tag.name}
                        </h1>
                    </div>
                </div> 
                : 
                <p style={{textAlign: 'center', marginTop: 300}}>Tag not found.</p>
            }
        </div>
    )
}
