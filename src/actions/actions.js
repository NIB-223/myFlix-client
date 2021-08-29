//1st Step--add actions and  export them
//2nd Step--add corresponding reducer
//3rd Step--register reducer

//Step One
//declare action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

//action creator
export function setMovies(value) { //must be close to variable name as possible
    return { type: SET_MOVIES, value };
}

//action creator
export function setFilter(value) {
    return { type: SET_FILTER, value };
}