import React, {useState} from 'react'
import { TextField, Button, formatMs } from '@material-ui/core';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import Places from './../utils/algolia/Places';
import { FaMinus, FaPlus } from 'react-icons/fa';
import axios from 'axios'
import {useHistory} from 'react-router-dom';

export default function CreatePlaceComponent() {
    const history = useHistory()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [imageFile, setImageFile] = useState([])
    const [additionalFields, setAddtionalFields] = useState([])
    const [tags, setTags] = useState("")
    const [error, setError] = useState("")

    const [sunStartTime, setSunStartTime] = useState("")
    const [sunEndTime, setSunEndTime] = useState("")
    const [monStartTime, setMonStartTime] = useState("")
    const [monEndTime, setMonEndTime] = useState("")
    const [tueStartTime, setTueStartTime] = useState("")
    const [tueEndTime, setTueEndTime] = useState("")
    const [wedStartTime, setWedStartTime] = useState("")
    const [wedEndTime, setWedEndTime] = useState("")
    const [thuStartTime, setThuStartTime] = useState("")
    const [thuEndTime, setThuEndTime] = useState("")
    const [friStartTime, setFriStartTime] = useState("")
    const [friEndTime, setFriEndTime] = useState("")
    const [satStartTime, setSatStartTime] = useState("")
    const [satEndTime, setSatEndTime] = useState("")

    const searchClient = algoliasearch(
        '9PRLIVT5PX',
        '6410375b80077c4b32fea46b1196322a'
    );

    const createPlace = (e) => {
        e.preventDefault()
        setError("")

        if ((!sunStartTime || !sunEndTime) || (!monStartTime || !monEndTime) || 
            (!tueStartTime || !tueEndTime) || (!wedStartTime || !wedEndTime) || 
            (!thuStartTime || !thuEndTime) || (!friStartTime || !friEndTime) || (!satStartTime || !satEndTime)) {
            setError("Fill out all times.")
            return
        }

        if (!Object.keys(imageFile).length) {
            setError("Provide an image.")
        }

        if (!additionalFields.every(f => f.field && f.value)) {
            setError("Make sure all additional fields are filled out.")
        }

        axios.get(axios.defaults.baseURL + "api/tags").then(res => {
            const tagsMatch = tags.toLowerCase().match(/"(.*?)"/g)
            const tagsList = tagsMatch ? tagsMatch.map(m => m.slice(1, -1)) : []

            if (!tagsList.every(t => res.data.map(x => x.name.toLowerCase()).includes(t))) {
                setError("Tags are invalid.")
                return
            }

            const newTags = res.data.filter(t => tagsList.some(tag => t.name.toLowerCase() == tag.toLowerCase()))

            var formData = new FormData()
            formData.append('image', imageFile[0])

            formData.forEach(fd => console.log(fd))

            // axios.post(axios.defaults.baseURL + "api/places", {
            //     name: name,
            //     description: description,
            //     location: document.querySelector("#address-input").value,
            //     hoursOpen: {
            //         sun: {
            //             startTime: sunStartTime,
            //             endTime: sunEndTime
            //         },
            //         mon: {
            //             startTime: monStartTime,
            //             endTime: monEndTime
            //         },
            //         tue: {
            //             startTime: tueStartTime,
            //             endTime: tueEndTime
            //         },
            //         wed: {
            //             startTime: wedStartTime,
            //             endTime: wedEndTime
            //         },
            //         thu: {
            //             startTime: thuStartTime,
            //             endTime: thuEndTime
            //         },
            //         fri: {
            //             startTime: friStartTime,
            //             endTime: friEndTime
            //         },
            //         sat: {
            //             startTime: satStartTime,
            //             endTime: satEndTime
            //         }
            //     },
            //     tags: newTags.map(t => t._id),
            //     additionalInfo: Object.fromEntries(additionalFields.map(item => [item.field, item.value]))
            // }).then(res => {
            //     console.log(res.data);

            //     axios.put({
            //         method: 'put', 
            //         url: axios.defaults.baseURL + `api/places/${res.data._id}/image`,
            //         data: formData
            //     }).then(res => {
            //         console.log(res.data);
            //         history.push(`/places/${res.data._id}`)
            //     }).catch(err => {
            //         console.log(err);
            //     })
            // }).catch(err => {
            //     switch (err.response.status) {
            //         case 400:
            //             setError(err.response.data.message)
            //             break
            //     }
            // })
        }).catch(err => {
            console.log(err);
        })
    }

    const DayRow = (props) => (
        <div className="d-flex align-items-center text-center mx-auto my-2" style={{justifyContent: "center"}}>
            <h5 
                className="m-0 p-3 mx-5 rounded" 
                style={{backgroundColor: "#0003"}}
            >
                {props.day}
            </h5>
            <div>
                <TextField 
                    type="time"
                    label="Opens"
                    style={{
                        width: 200
                    }}
                    InputLabelProps={{
                        shrink: false,
                        style: {
                            marginLeft: 84
                        }
                    }}
                    variant="outlined"
                    className="mx-3"
                    color="secondary"
                    onChange={e => props.startCallback(e.target.value)}
                    value={props.start}
                />
            </div>
            <div>
                <TextField 
                    type="time"
                    label="Closes"
                    style={{
                        width: 200
                    }}
                    InputLabelProps={{
                        shrink: false,
                        style: {
                            marginLeft: 84,
                            display: "relative"
                        }
                    }}
                    variant="outlined"
                    className="mx-3"
                    color="secondary"
                    onChange={e => props.endCallback(e.target.value)}
                    value={props.end}
                />
            </div>
        </div>
    )

    const handleChangeInput = (index, event) => {
        const newAdditionalFields = additionalFields.map((i, idx) => {
            if(idx === index) {
                if (event.target.name == "field")
                    i[event.target.name] = parseField(event.target.value)
                else
                    i[event.target.name] = event.target.value
            }

            return i;
        })
        
        setAddtionalFields(newAdditionalFields);
    }

    const parseField = (field) => {
        return field.replace(/ /g,"_").replace(/[^a-z0-9 _]/gi,'')
    }

    return (
        <div className="pt-5 px-5 mx-auto" style={{paddingBottom: 128}}>
            <h4 className="mx-auto text-center font-weight-bold text-muted">Create a place</h4>
            <form className="mx-auto col-10 mt-5" onSubmit={createPlace}>
                <div className="col-12">
                    <TextField
                        className="col-12"
                        inputProps={{
                            style: {
                                fontSize: 48,
                                textAlign: "center",
                                fontWeight: 'bold'
                            }
                        }}
                        placeholder="Name"
                        color="secondary"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="mt-5">
                    <InstantSearch indexName="places" searchClient={searchClient}>
                        <Places
                            defaultRefinement={{
                                lat: 37.7793,
                                lng: -122.419
                            }}
                            
                        />
                    </InstantSearch>
                </div>
                <div className="col-12">
                    <TextField
                        className="col-12"
                        inputProps={{
                            style: {
                                textAlign: "center"
                            }
                        }}
                        variant="outlined"
                        multiline
                        placeholder="Your description goes here"
                        color="secondary"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div className="col-10 mx-auto mt-5" style={{position: "relative"}}>
                    <img 
                        src={Object.keys(imageFile).length ? 
                            window.URL.createObjectURL(imageFile[0]) : 
                            "/static/images/placeholder.png"}
                        className="col-12"
                        style={{
                            filter: "brightness(90%)"
                        }}
                    />
                    <input 
                        type="file" 
                        style={{
                            position: 'absolute',
                            top: "60%",
                            left: "40%"
                        }}
                        accept="image/*"
                        onChange={e => {
                            setImageFile(e.target.files)
                        }}
                    />
                </div>
                <div className="col-10 mx-auto text-center mt-5">
                    <DayRow day="Sunday" start={sunStartTime} end={sunEndTime} startCallback={setSunStartTime} endCallback={setSunEndTime} />
                    <DayRow day="Monday" start={monStartTime} end={monEndTime} startCallback={setMonStartTime} endCallback={setMonEndTime}/>
                    <DayRow day="Tuesday" start={tueStartTime} end={tueEndTime} startCallback={setTueStartTime} endCallback={setTueEndTime}/>
                    <DayRow day="Wednesday" start={wedStartTime} end={wedEndTime} startCallback={setWedStartTime} endCallback={setWedEndTime}/>
                    <DayRow day="Thursday" start={thuStartTime} end={thuEndTime} startCallback={setThuStartTime} endCallback={setThuEndTime}/>
                    <DayRow day="Friday" start={friStartTime} end={friEndTime} startCallback={setFriStartTime} endCallback={setFriEndTime}/>
                    <DayRow day="Saturday" start={satStartTime} end={satEndTime} startCallback={setSatStartTime} endCallback={setSatEndTime}/>
                </div>
                <div className="mt-5 col-9 text-center mx-auto">
                    <h4 className="text-left font-weight-bold mb-5">Additional Info</h4>
                    <div>
                        {
                            additionalFields.map((af, idx) => (
                                <div className="d-flex align-items-center my-3">
                                    <div className="mx-2" style={{flex: 0.4}}>
                                        <TextField 
                                            variant="outlined"
                                            color="secondary"
                                            className="col-12"
                                            name="field"
                                            value={af.field}
                                            onChange={e => handleChangeInput(idx, e)}
                                        />
                                    </div>
                                    :
                                    <div style={{flex: 0.6, marginLeft: 32, marginRight: 16}}>
                                        <TextField 
                                            variant="outlined"
                                            color="secondary"
                                            className="col-12"
                                            name="value"
                                            value={af.value}
                                            onChange={e => handleChangeInput(idx, e)}
                                        />
                                    </div>
                                    <button 
                                        type="button"
                                        className="p-1 d-flex align-items-center justify-content-center bg-transparent" 
                                        style={{border: "1px solid black", borderRadius: 30, width: 20, height: 20}}
                                        onClick={() => setAddtionalFields(additionalFields.slice(0, idx).concat(additionalFields.slice(idx+1, additionalFields.length)))}
                                    >
                                        <FaMinus size={10} />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    <button 
                        type="button"
                        className="d-flex align-items-center justify-content-center bg-transparent" 
                        style={{
                            border: "1px solid #f50057", 
                            borderRadius: 30, 
                            width: 30, 
                            height: 30, 
                            marginLeft: "auto",
                            marginRight: -8
                        }}
                        onClick={() => setAddtionalFields([...additionalFields, { field: '', value: '' }])}
                    >
                        <FaPlus 
                            size={15} 
                            color="#f50057" 
                            className="mx-auto"  
                        />
                    </button>
                </div>
                <div className="col-8 mx-auto m-5">
                    <h4 className="text-left font-weight-bold mb-3">Add tags</h4>
                    <TextField
                        variant="outlined"
                        className="col-12"
                        color="secondary"
                        onChange={e => setTags(e.target.value)}
                        value={tags}
                    />
                </div>
                <div className="mx-auto text-center">
                    <Button type="submit" variant="outlined" color="secondary">Create</Button>
                </div>
                {error ? <p className="alert alert-danger col-10 text-center mt-4 mx-auto">{error}</p> : null}
            </form>
        </div>
    )
}
