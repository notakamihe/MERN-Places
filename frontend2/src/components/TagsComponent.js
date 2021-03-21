import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { IconButton, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { FaMapMarker, FaPlusCircle } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { getUser } from '../utils/utils';


export default function TagsComponent() {
    const [tags, setTags] = useState([])
    const [search, setSearch] = useState("")
    const [sortValue, setSortValue] = useState("")
    const [user, setUser] = useState({})

    useEffect(() => {
        loadTags()
    }, [])

    console.log(tags);

    const loadTags = async () => {
        axios.get(axios.defaults.baseURL + 'api/tags').then(res => {
            setTags(res.data)
        })

        setUser(await getUser())
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
                className="mt-5 mb-3"
            >
                TAGS
            </h1>
            <div className="text-center mx-auto my-3 mb-4">
                {
                    localStorage.getItem('token') ?
                    <Link to="/tags/create" className="primary-color">
                        <FaPlusCircle size={30} color="#f50057" />
                    </Link> : null
                }
            </div>
            <div className={`mx-auto mb-5 ${user && user.isDarkModeOn ? "dark-border-color" : ""}`} style={{textAlign: 'center'}}>
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
            <div style={{justifyContent: 'center'}} className={`mx-auto d-flex my-5 ${user && user.isDarkModeOn ? "dark-border-color" : ""}`}>
                <div>
                    <InputLabel id="sort-label"></InputLabel>
                    <Select
                        value={sortValue}
                        labelId="sort-label"
                        variant="outlined"
                        color="secondary"
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={(e) => sortTags(e)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Sort</MenuItem>
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="popular">Popular</MenuItem>
                        <MenuItem value="alpha">Alphabetical</MenuItem>
                        <MenuItem value="reverse-alpha">Reverse-alphabetical</MenuItem>
                    </Select>
                </div>
            </div>
            <div className={`d-flex px-5 ${user && user.isDarkModeOn ? "primary-color" : ""}`} style={{justifyContent: 'center', flexWrap: 'wrap'}}>
                {
                    tags.filter(t => t.name.toLowerCase().includes(search.toLowerCase())).map(t => (
                        <Link 
                            style={{width: 250, textDecoration: 'none'}} 
                            className="mx-3 mb-5"
                            to={`/tags/${t._id}`}
                        >
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
                                    className="px-2"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 16,
                                        backgroundColor: "#000c",
                                        borderRadius: 15,
                                        color: "#f50057",
                                        fontFamily: "sans-serif",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {t.popularity}
                                </p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
