import React, {useState, useEffect} from 'react'
import axios from 'axios'

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
                    <div className="col-12" style={{width: 300, backgroundColor: 'black'}}>
                        
                    </div>
                </div> 
                : 
                <p style={{textAlign: 'center', marginTop: 300}}>Tag not found.</p>
            }
        </div>
    )
}