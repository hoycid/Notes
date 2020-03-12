import { GET_NOTES, ADD_NOTE, DELETE_NOTE, NOTES_LOADING, SET_COMPLETE } from '../actions/types';

const  initialState = {
    notes: [],
    hascomplete: false,
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_NOTES:
            return {
                ...state,
                notes: action.payload,
                loading: false
            };
        case ADD_NOTE:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            };
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== action.payload)
            };
        case NOTES_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_COMPLETE:
            return {
                ...state,
                hasComplete: true,
                loading: false
            };
        default:
            return state;
    }
}