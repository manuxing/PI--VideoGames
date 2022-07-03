import { type } from "../actions/types";

const initialState = {
    initialGames: [],
    sGames: [],
    filterGames: [],
    filteredGames: [],
    videoGames: [],
    genres: [],
    detailVg: 0,
    error: {},
    orderBy: 0
};

export default function rootReducer(state=initialState, action){
    switch (action.type) {
        case type.CREATE_VG: {
            return {
                ...state,
                initialGames: [action.payload.data, ...state.initialGames],
                sGames: [action.payload.data, ...state.sGames],
                filterGames: [action.payload.data, ...state.filterGames],
                filteredGames: [action.payload.data, ...state.filteredGames],                
                videoGames: [action.payload.data, ...state.videoGames],
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
                initialGames: action.payload.data,
                sGames: action.payload.data,
                filterGames: action.payload.data,
                filteredGames: action.payload.data,
                videoGames: action.payload.data,
            };
        }
        case type.GET_GENRES: {
            return {
                ...state,
                genres: action.payload.data
            };
        }
        case type.ORDER_N: {
            const all = state.videoGames;
            let filtrado;
            if (action.payload === 1){
                filtrado = all.sort((a, b) => a.name.localeCompare(b.name));
            } else if (action.payload === 1.5){
                filtrado = all.sort((a, b) => b.name.localeCompare(a.name));
            } else if (action.payload === 2){
                filtrado = all.sort((a,b)=> a.rating-b.rating);
            } else if (action.payload === 2.5){
                console.log(action.payload)
                filtrado = all.sort((a,b) => b.rating - a.rating);
            } else if (action.payload === 0){
                filtrado = all;
            };
            return {
                ...state,
                videoGames: filtrado,
            };
        }
        case 'SEARCH': {
            const all = state.initialGames;
            let filtrado = all.filter(p => {
                let name = p.name.toLowerCase();
                if(name.includes(`${action.payload}`)) return p});
            return {
                ...state,
                filterGames: filtrado,
                sGames: filtrado,
                filteredGames: filtrado,
                videoGames: filtrado,
            };
        }
        case 'ALL': {
            return {
                ...state,
                videoGames: state.initialGames
            };
        }
        case 'FILTER_GENRE': {
            const all = state.filterGames;
            let filtrado;
            if(action.payload === 'todos'){
              filtrado = state.filterGames;
            } else {
              filtrado = all.filter(p => p.genres_id.includes(parseInt(action.payload)));
            };
            return {
                ...state,
                filteredGames: filtrado,
                videoGames: filtrado,
            };
        }
        case 'FILTER_CREATED': {
            const all = state.sGames;
            let filtrado;
            if(action.payload === 'CREATED'){
                filtrado = all.filter(p => Number(p.id) !== p.id);
            } else if (action.payload === 'API'){
                filtrado = all.filter(p => Number(p.id) === p.id);
            } else if (action.payload === 'ALL'){
                filtrado = all;
            };
            return {
                ...state,
                filterGames: filtrado,
                videoGames: filtrado
            };
        }
        case 'ERROR': {
            return {
                ...state,
                error: action.payload
            };
        }
        default:
            return {...state};
    };
};