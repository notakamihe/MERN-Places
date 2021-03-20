import React from 'react'

export default function PlaceComponent() {
    const [place, setPlace] = useState({})

    return (
        <div>
            {
                place != null ?

                <div>
                    
                </div> 
                : 
                <p style={{textAlign: 'center', marginTop: 300}}>Tag not found.</p>
            }
        </div>
    )
}
