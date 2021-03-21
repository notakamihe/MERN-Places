import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { RegisterComponent, LoginComponent, PlaceComponent, PlacesComponent, TagComponent, TagsComponent, CreatePlaceComponent, ProfileComponent } from './components/index';
import axios from 'axios';

function App() {
    axios.defaults.baseURL = 'http://localhost:8000/'

    console.log(localStorage.getItem('token'));

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    {/* <Route exact path="/register" render={() => <RegisterComponent />} />
                    <Route exact path="/login" render={() => <LoginComponent />} />
                    <Route exact path="/create/place" render={() => <CreatePlaceComponent />}/>
                    <Route exact path="/places" render={() => <PlacesComponent />} />
                    <Route exact path="/places/:id" render={({match}) => 
                        <PlaceComponent id={match.params.id} />} 
                    />
                    <Route exact path="/tags" render={() => <TagsComponent />} />
                    <Route exact path="/tags/:id" render={({match}) => 
                        <TagComponent id={match.params.id} />} 
                    /> */}
                    <Route exact path="/profile" render={() => <ProfileComponent />} />
                </Switch>
            </BrowserRouter>
        </div>  
    );
}

export default App;
