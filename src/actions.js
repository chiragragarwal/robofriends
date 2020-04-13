import { 
    CHANGE_SEARCH_FIELD, 
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
        } from './constants';

export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})

// This is an async action that does an API call to fetch the robot data
// It returns a function that returns the data. Redux-thunk will detect this and take care of it
// Thunk will provide this function with the "dispatch" as a param.
export const requestRobotsAction = () => (dispatch) => {
    dispatch({ type: REQUEST_ROBOTS_PENDING })

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
        .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED , payload: error }))
}