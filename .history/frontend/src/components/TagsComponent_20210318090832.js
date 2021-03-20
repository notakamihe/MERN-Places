import React from 'react'

export default function TagsComponent() {
    useEffect(() => {
        loadPlaces()
    }, [])

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
                    placeholder="Search name or address"
                />
            </div>
            <div style={{justifyContent: 'center'}} className="mx-auto d-flex my-5">
                <div>
                    <InputLabel id="sort-label"></InputLabel>
                    <Select
                        value={sortValue}
                        onChange={(e) => sortPlaces(e)}
                        displayEmpty
                        labelId="sort-label"
                        variant="outlined"
                        color="secondary"
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="" disabled>Sort</MenuItem>
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="highest-rated">Highest rated</MenuItem>
                        <MenuItem value="lowest-rated">Lowest rated</MenuItem>
                        <MenuItem value="alpha">Alphabetical</MenuItem>
                        <MenuItem value="reverse-alpha">Reverse-alphabetical</MenuItem>
                    </Select>
                </div>
                <div className="mx-5" style={{textAlign: 'center'}}>
                    <TextField 
                        variant="outlined" 
                        type="search" 
                        className="" 
                        color="secondary"
                        onChange={e => setSearchedTags(e.target.value)}
                        value={searchedTags}
                        placeholder='Search "tags"'
                    />
                </div>
            </div>
            <div className="px-5 d-flex" style={{justifyContent: 'center', flexWrap: "wrap"}}>
                {places.filter(p => 
                (includes(p.name, search) || includes(p.location, search)) && areSearchedTagsInTags(p)
                ).map(p => (
                    <div 
                        key={p._id}
                        className="rounded mx-5" 
                        style={{width: 315, marginBottom: 64}}>
                        <div 
                            style={{
                                backgroundColor: 'black',
                                backgroundImage: `url("${axios.defaults.baseURL}uploads/${p.imageUrl ? p.imageUrl.split('\\')[1] : null}")`,
                                height: 200,
                                width: "100%",
                                position: "relative",
                                backgroundSize: 'cover',
                                backgroundRepeat: "no-repeat"
                            }}
                        >
                            <div style={{position: 'absolute', bottom: 16, right: 16}}>
                                {
                                    p.averageRating != null ?
                                    <StarRatings
                                        rating={p.averageRating}
                                        starRatedColor="yellow"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="3px"
                                    /> : 
                                    <p
                                        style={{
                                            color: 'white', 
                                            margin: 0, 
                                            backgroundColor: "#000b", 
                                            padding: 4
                                        }}
                                    >
                                        Unrated
                                    </p>
                                }
                            </div>
                        </div>
                        <div 
                            style={{
                                border: "1px solid #f50057", 
                                borderTop: "none", 
                                textAlign: "center",
                                borderRadius: "inherit"
                            }} 
                            className="p-3"
                        >
                            <h4>{p.name}</h4>
                            <div className="d-flex">
                                <FaMapMarker style={{marginRight: 12}} />
                                <p>{p.location}</p>
                            </div>
                            <div 
                                className="d-flex" 
                                style={{
                                    alignItems: 'baseline',
                                    overflowX: "auto",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {tags.filter(t => t.place == p._id).map((tag, index) => {
                                    return (
                                        <p 
                                            key={index}
                                            style={{
                                                marginLeft: index !== 0 ? 4 : 0, 
                                                color: "#f50057", 
                                                backgroundColor: "#f5005755", 
                                                padding: 4,
                                            }}
                                        >
                                            {tag.name}
                                        </p>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
