import axios from 'axios';
import { GET_NOTES, ADD_NOTE, DELETE_NOTE, NOTES_LOADING, SET_COMPLETE } from '../actions/types';

export const getNotes = () => dispatch => {
    dispatch(setNotesLoading());
    axios.get('/api/notes').then(res =>
            dispatch({
                type: GET_NOTES,
                payload: res.data
            })
        )
}

export const addNote = note => dispatch => {
    axios.post('/api/notes', note).then(res => 
        dispatch({
            type: ADD_NOTE,
            payload: res.data
        })
    )
}

export const setComplete = id => dispatch => {
    axios.put(`/api/notes/setcomplete/${id}`).then(res =>
        dispatch({
            type: SET_COMPLETE,
            payload: id
        })
    )
}

export const deleteNote = id => dispatch => {
    axios.delete(`/api/notes/${id}`).then(res =>
        dispatch({
            type: DELETE_NOTE,
            payload: id
        })
    )
}
export const setNotesLoading = () => {
    return {
        type: NOTES_LOADING,
    }
}