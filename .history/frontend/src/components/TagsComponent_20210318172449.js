import React, {useState, useEffect} from 'react'
import { IconButton, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { FaMapMarker } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import axios from 'axios';


export default function TagsComponent() {
    const [tags, setTags] = useState([])
    const [search, setSearch] = useState("")
    const [sortValue, setSortValue] = useState("")

    useEffect(() => {
        loadTags()
    }, [])

    console.log(tags);

    const loadTags = () => {
        axios.get(axios.defaults.baseURL + 'api/tags').then(res => {
            setTags(res.data)
        })
    }

    const sortTags = (e) => {
        const value = e.target.value
        setSortValue(value)

        switch (value) {
            case "none":
                loadTags()
                break
            case "popular":
                setTags(tags.sort((a, b) => a.popularity - b.popularity).map((item, idx) => 
                    tags[tags.length-1-idx]))
                break
            case "alpha":
                setTags(tags.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
                break
            case "reverse-alpha":
                setTags(tags.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((item, idx) => tags[tags.length-1-idx]))
                break
        }
    }

    return (
        <div className="my-5">
            <h1 
                style={{
                    textAlign: 'center', 
                    fontSize: 48, 
                    letterSpacing: 8, 
                    fontFamily: 'sans-serif', 
                    fontWeight: 'bold'
                }} 
                className="my-5"
            >
                TAGS
            </h1>
            <div className="mx-auto mb-5" style={{textAlign: 'center'}}>
                <TextField 
                    variant="outlined" 
                    type="search" 
                    className="col-5" 
                    color="secondary"
                    placeholder="Search tags"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </div>
            <div style={{justifyContent: 'center'}} className="mx-auto d-flex my-5">
                <div>
                    <InputLabel id="sort-label"></InputLabel>
                    <Select
                        value={sortValue}
                        labelId="sort-label"
                        variant="outlined"
                        color="secondary"
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={(e) => sortTags(e)}
                    >
                        <MenuItem value="" disabled>Sort</MenuItem>
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="popular">Popular</MenuItem>
                        <MenuItem value="alpha">Alphabetical</MenuItem>
                        <MenuItem value="reverse-alpha">Reverse-alphabetical</MenuItem>
                    </Select>
                </div>
            </div>
            <div className="d-flex px-5" style={{justifyContent: 'center', flexWrap: 'wrap'}}>
                {
                    tags.filter(t => t.name.toLowerCase().includes(search.toLowerCase())).map(t => (
                        <div style={{width: 250}} className="mx-3 mb-5">
                            <p 
                                style={{
                                    border: "1px solid #f50057", 
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    width: "100%"
                                }} 
                                className="p-3 m-0"
                            >
                                {t.name}
                            </p>
                            <div 
                                style={{
                                    backgroundColor: "transparent", 
                                    width: "100%", 
                                    height: 150,
                                    borderBottomLeftRadius: 5,
                                    borderBottomRightRadius: 5,
                                    backgroundImage: `url("${axios.defaults.baseURL}uploads/${t.imageUrl ? t.imageUrl.split('\\')[1] : null}")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    position: 'relative'
                                }}
                            >
                                <p
                                    style={{
                                        position: 'absolute',
                                        bottom: 16,
                                        right: 16
                                    }}
                                >
                                    {t.popularity}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
