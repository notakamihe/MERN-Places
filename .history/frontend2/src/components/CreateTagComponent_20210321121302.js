import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import React, {useState} from 'react'

export default function CreateTagComponent() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState("")

    const createTag = (e) => {
        e.preventDefault()
        setError("")

        console.log(name, description, image);

        if (!image) {
            setError("Must provide an image.")
            return
        }

    }

    return (
        <div>
            <form onSubmit={createTag}>
                <div 
                    className="col-12 d-flex align-items-center"
                    style={{
                        height: 200,
                        backgroundColor: "#000",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url(${image ? window.URL.createObjectURL(image[0]) : 
                        "/static/images/placeholder.png"})`
                    }}
                >
                    <div className="col-12">
                        <TextField 
                            className="col-12"
                            variant="outlined"
                            color="secondary"
                            inputProps={{
                                style: {
                                    fontSize: 78,
                                    color: "#fff5"
                                }
                            }}
                            placeholder="Name here"
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                </div>
                <div className="px-4 mt-4">
                    {error ? <p className="alert alert-danger col-10 text-center mt-4 mx-auto">{error}</p> : null}
                    <div>
                        <label htmlFor="tagImg" className="d-block">Image</label>
                        <TextField id="tagImg" type="file" onChange={e => setImage(e.target.files)} />
                    </div>
                    <div className="mt-5" >
                        <label htmlFor="description" className="d-block">Description</label>
                        <TextField 
                            multiline 
                            variant="outlined" 
                            id="description"
                            className="col-11"
                            color="secondary"
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        className="mt-5"
                        type="submit"
                    >
                        Create
                    </Button>
                </div>
            </form>
        </div>
    )
}
