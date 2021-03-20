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
                    setTag("not found")
                    break
            }
        })
    }, [])

    return (
        <div>
            {
                tag != "not found" ?

                <div>

                </div> : <p className="m-auto">Tag not found.</p>
            }
        </div>
    )
}
