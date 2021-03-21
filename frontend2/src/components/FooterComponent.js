import React from 'react'

export default function FooterComponent() {
    return (
        <div className="mt-5 p-3 text-center" style={{backgroundColor: "#f50057"}}>
            <p className="my-0 text-light font-weight-bold">Places &#183; Akamihe Corporation</p>
            <p 
                className="my-0 text-light font-weight-bold" 
                style={{fontFamily: "sans-serif"}}
            >
                &#169; {new Date().getFullYear()}
            </p>
        </div>
    )
}
