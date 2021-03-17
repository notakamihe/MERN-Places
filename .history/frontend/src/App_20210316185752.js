import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { RegisterComponent, LoginComponent, PlaceComponent, PlacesComponent, TagComponent, TagsComponent } from './components/index';
import axios from 'axios';

function App() {
  return (
    axios.defaults.baseURL = 'http://localhost:8000/'

    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path="/register" render={RegisterComponent} />
                <Route exact path="/login" render={LoginComponent} />
                <Route exact path="/places" render={PlacesComponent} />
                <Route exact path="/places/:id" render={({match}) => 
                    <PlaceComponent id={match.params.id} />} 
                />
                <Route exact path="/tags" render={TagsComponent} />
                <Route exact path="/tags/:id" render={({match}) => 
                    <TagComponent id={match.params.id} />} 
                />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
