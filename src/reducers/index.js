import { combineReducers } from 'redux-immutable';
import vis from './data/visreducers';// import routes from './routes';

const rootReducer = combineReducers({
    vis,
});

export default rootReducer;