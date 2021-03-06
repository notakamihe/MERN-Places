import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RegisterComponent, LoginComponent, PlaceComponent, PlacesComponent, TagComponent, TagsComponent, 
    CreatePlaceComponent, ProfileComponent, CreateTagComponent, HomeComponent, 
    FooterComponent, HeaderComponent, NotFound} from './components/index';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { getUser } from './utils/utils';
import styles from './styles/styles.css';

function App() {
    axios.defaults.baseURL = 'http://localhost:8000/'

    const [user, setUser] = useState({})

    useEffect(async () => {
        setUser(await getUser())
    }, [])
    return (
        <div className={`bg-color-${user && user.isDarkModeOn ? "dark" : "light"}`}>
            <div style={{minHeight: "95vh"}}>
                <BrowserRouter>
                    <HeaderComponent />
                    <Switch>
                        <Route exact path="/" render={() => <HomeComponent />} />
                        <Route exact path="/register" render={() => <RegisterComponent />} />
                        <Route exact path="/login" render={() => <LoginComponent />} />
                        <Route exact path="/places/create" render={() => <CreatePlaceComponent />}/>
                        <Route exact path="/tags/create" render={() => <CreateTagComponent />}/>
                        <Route exact path="/places" render={() => <PlacesComponent />} />
                        <Route exact path="/places/:id" render={({match}) => 
                            <PlaceComponent id={match.params.id} />} 
                        />
                        <Route exact path="/tags" render={() => <TagsComponent />} />
                        <Route exact path="/tags/:id" render={({match}) => 
                            <TagComponent id={match.params.id} />} 
                        />
                        <Route exact path="/profile" render={() => <ProfileComponent />} />
                        <Route exact render={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>
            <FooterComponent />
        </div>  
    );
}

export default App;
