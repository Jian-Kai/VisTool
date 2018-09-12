
import { createAction } from 'redux-actions';
import { 
    LOAD_FILE ,
    CHANGE_FILENAME,
    DATA_HANDLE,
    LOAD_METROMAP
} from '../constants/actionTypes';

export const loadFile = createAction('LOAD_FILE');
export const changeFileName = createAction('CHANGE_FILENAME');
export const dataHandle = createAction('DATA_HANDLE');
export const loadMetroMap = createAction('LOAD_METROMAP');
