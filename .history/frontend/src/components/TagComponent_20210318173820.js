import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function TagComponent(props) {
    const [tag, setTag] = useState({})

    useEffect(() => {
        axios.get(axios.defaults.baseURL + `api/tags/${props.id}`).then(res => {
            setTag(res.data)
        })
    }, [])

    return (
        <div>
            <div>

            </div>
        </div>
    )
}