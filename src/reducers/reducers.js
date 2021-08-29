//1st Step--add actions and  export them
//2nd Step--add corresponding reducer
//3rd Step--register reducer

//Step 2
import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

//add reducer
function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}
//add reducer
function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}
//Step 3
//combined reducer (register reducer)
const moveisApp = combineReducers({  //registered reducers 
    visibilityFilter,
    movies
});

export default moveisApp; 
