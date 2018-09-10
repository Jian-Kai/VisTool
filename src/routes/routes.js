// src/routes.js
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from '../components/App';
import NotFound from '../components/NotFound';
import StartPageContainer from '../containers/StartPageContainer';
import VolumeContanier from '../containers/VolumeContanier';



const Routes = (props) => (
    <BrowserRouter>
        <div>
            <Route exact  path="/" component={App} />
            <Route path="/startpage" component={StartPageContainer} />
            <Route path="/volume" component={VolumeContanier} />
            <Route path="/notfound" component={NotFound} />
        </div>
    </BrowserRouter>

);

export default Routes;