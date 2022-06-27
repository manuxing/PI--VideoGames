import { type } from "../actions/types";

const initialState = {
    videoGames: [],
    genres: [],
    detailVg: {},
    orderBy: 0,
};

export default function rootReducer(state=initialState, action){
    switch (action.type) {
        case type.CREATE_VG: {
            return {
                ...state,
                videoGames: [...state.videoGames, action.payload.data]
            };
        }
        case type.GET_DETAILS: {
            return {
                ...state,
                detailVg: action.payload.data
            };
        }
        case type.GET_VGS: {
            return {
                ...state,
                videoGames: action.payload.data.content
            };
        }
        case type.GET_GENRES: {
            return {
                ...state,
                genres: action.payload.data
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