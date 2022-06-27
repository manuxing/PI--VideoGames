import { type } from "../actions/types";

const initialState = {
    videoGames: [],
    genres: [{name:'a',id:0},{name:'b',id:1},{name:'c',id:2},{name:'d',id:3},{name:'e',id:4},],
    detailVg: {},
    orderBy: 0,
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
        case type.ORDER_N: {
            return {
                ...state,
                orderBy: action.payload,
            }
        }
        default:
            return {...state};
    }
};