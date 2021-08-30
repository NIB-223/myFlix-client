//1st Step--add actions and  export them
//2nd Step--add corresponding reducer
//3rd Step--register reducer

//Step One
//declare action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';

//action creator
export function setMovies(value) { //must be close to variable name as possible
    return { type: SET_MOVIES, value };
}

//action creator
export function setFilter(value) { //convenient functions can be called from anywhere(a view in this project's case) later
    return { type: SET_FILTER, value };
}

//action creator
export function setUser(value) {
    return { type: SET_USER, value };
}