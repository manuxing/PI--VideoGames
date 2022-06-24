import { type } from "../actions/types";

const initialState = {
    videoGames: [],
    genres: [],
    detailVg: {},
};

export default function rootReducer(state=initialState, action){
    switch (action.type) {
        case type.CREATE_VG: {
            return {
                ...state,
                videoGames: [...state.videoGames, action.payload]
            };
        }
        case type.GET_DETAILS: {
            return {
                ...state,
                detailVg: action.payload
            };
        }
        case type.GET_VGS: {
            return {
                ...state,
                videoGames: [...state.videoGames, action.payload]
            };
        }
        case type.GET_GENRES: {
            return {
                ...state,
                genres: [...state.genres, action.payload]
            }
        }
        default:
            return state;
    }
};