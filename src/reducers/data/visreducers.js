import { handleActions } from 'redux-actions';
import { VisState } from '../../constants/model';

import {
  LOAD_FILE,
  CHANGE_FILENAME,
  DATA_HANDLE,
  LOAD_METROMAP
} from '../../constants/actionTypes';

//import * as fs from 'fs';
const fs = require('fs');

/*
const handlefileread = () => {
  context = filereader.result;
  console.log(context)

}*/

const visReducers = handleActions({
  LOAD_FILE: (state, { payload }) => {
    //const file_name = state.get('file_name')
    //console.log(file_name)

    return state.set('content', payload)
  },
  CHANGE_FILENAME: (state, { payload }) => {
    //console.log(payload)
    return state.set('file_name', payload)
  },
  DATA_HANDLE: (state, { payload }) => {
    //console.log(state)
    //state.set('data_set','station', payload.station_key)

    return state.set("data_set", payload);
  },
  LOAD_METROMAP: (state, {payload}) => {
    return state.set("map", payload);
  }
}, VisState);

export default visReducers;