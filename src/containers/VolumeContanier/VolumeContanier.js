import { connect } from 'react-redux';
import Volume from '../../components/Volume';
import MetroStation from '../../MetroStation'
import {
  
} from '../../actions';

export default connect(
  (state) => ({
    data_set: state.getIn(['vis', 'data_set']),
    station_info: state.getIn(['vis', 'map'])
  }),
  (dispatch) => ({
   
  })
)(Volume);