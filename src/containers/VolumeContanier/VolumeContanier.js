import { connect } from 'react-redux';
import Volume from '../../components/Volume';
import MetroStation from '../../MetroStation'
import {
  loadMetroMap
} from '../../actions';

export default connect(
  (state) => ({
    data_set: state.getIn(['vis', 'data_set']),
    map: state.getIn(['vis', 'map'])
  }),
  (dispatch) => ({
    onLoadMetroMap: () => {
      //console.log(MetroStation)
      dispatch(loadMetroMap(MetroStation));
    }
  })
)(Volume);