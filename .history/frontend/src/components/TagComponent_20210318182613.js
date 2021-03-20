import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {getImageUrl} from '../utils'

export default function TagComponent(props) {
    const [tag, setTag] = useState({})

    useEffect(() => {
        axios.get(axios.defaults.baseURL + `api/tags/${props.id}`).then(res => {
            return res.data
        }).catch(err => {
            switch (err.response.status) {
                case 400:
                    setTag(null)
                    break
            }
        }).then(t => {
            console.log(t)
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
                            <h1 className="mt-5">Places</h1>
                            <div>
                                
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
