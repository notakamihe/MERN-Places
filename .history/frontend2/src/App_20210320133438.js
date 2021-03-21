import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {ProfileComponent } from './components/index';

function App() {
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