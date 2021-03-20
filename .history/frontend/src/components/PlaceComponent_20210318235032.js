import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function PlaceComponent(props) {
    const [place, setPlace] = useState({})

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

    console.log(place);

    return (
        <div style={{margin: "128px auto"}}>
            {
                place != null ?

                <div className="d-flex">
                    <div style={{flex: 3, flexWrap: 'wrap'}}>
                        <h1>{place.name}</h1>
                    </div>
                    <div style={{flex: 1}}>
                        
                    </div>
                </div> 
                : 
                <p style={{textAlign: 'center', marginTop: 300}}>Tag not found.</p>
            }
        </div>
    )
}
