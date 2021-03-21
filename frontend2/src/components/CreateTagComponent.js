import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import React, {useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function CreateTagComponent() {
    const history = useHistory()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState("")

    const createTag = (e) => {
        e.preventDefault()
        setError("")

        if (!image) {
            setError("Must provide an image.")
            return
        }

        var formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("image", image[0])

        axios({
            method: 'post', 
            url: axios.defaults.baseURL + "api/tags",
            data: formData
        }).then(res => {
            console.log(res.data);
            history.push(`/tags/${res.data._id}`)
        }).catch(err => {
            console.log(err);

            switch (err.response.status) {
                case 400:
                    setError(err.response.data.message)
                    break
            } 
        })
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
                        backgroundImage: `url(${image ? window.URL.createObjectURL(image[0]) : ""})`
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
