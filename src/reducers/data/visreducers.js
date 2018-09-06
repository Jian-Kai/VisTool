import { handleActions } from 'redux-actions';
import { VisState } from '../../constants/model';

import {
  LOAD_FILE,
  CHANGE_FILENAME,
  DATA_HANDLE
} from '../../constants/actionTypes';

//import * as fs from 'fs';

/*
const handlefileread = () => {
  context = filereader.result;
  console.log(context)

}*/

const visReducers = handleActions({
  LOAD_FILE: (state, { payload }) => {
    const file_name = state.get('file_name')
    console.log(file_name)

    return state.set('content', payload)
  },
  CHANGE_FILENAME: (state, { payload }) => {
    console.log(payload)
    return state.set('file_name', payload)
  },
  DATA_HANDLE: (state) => {
    console.log(state)
    return state;
  }
}, VisState);

export default visReducers;