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
            </BrowserRouter>
        </div>  
    );
}

export default App;
