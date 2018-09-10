import { connect } from 'react-redux';
import Volume from '../../components/Volume';

import {
  
} from '../../actions';

export default connect(
  (state) => ({
    data_set:state.getIn(['vis', 'data_set'])
  }),
  (dispatch) => ({
      
  })
)(Volume);