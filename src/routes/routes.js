// src/routes.js
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from '../components/App';
import About from '../components/About';
import NotFound from '../components/NotFound';
import StartPageContainer from '../containers/StartPageContainer';


const Routes = (props) => (
    <BrowserRouter>
        <div>
            <Route exact  path="/" component={App} />
            <Route path="/startpage" component={StartPageContainer} />
            <Route path="/about" component={About} />
            <Route path="/notfound" component={NotFound} />
        </div>
    </BrowserRouter>

);

export default Routes;