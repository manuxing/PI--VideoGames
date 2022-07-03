import { type } from "./types";
import axios from "axios";

export function createVg(data){
    return function(dispatch){
        axios.post('http://localhost:3001/videogames', data)
        .then((res) => {
            return {type: type.CREATE_VG, payload: res};
        })
        .then(p => {
            dispatch(p);
        })
        .catch(e => {
            console.log(e);
            dispatch({ type: 'ERROR', payload: e });
        });
    };
};

export function getDetails(id){
    if(id){
        return function(dispatch){
            axios.get(`http://localhost:3001/videogame/${id}`)
            .then((res) => {
                    dispatch({ type: type.GET_DETAILS, payload: res });
                }).catch(e => {
                    console.log(e);
                    dispatch({ type: 'ERROR', payload: e });
            });
        };
    } else {
        let res = {data:0};
        return {type: type.GET_DETAILS, payload: res};
    };
};

export function getVgs(data){
    return function(dispatch){
        axios.get(`http://localhost:3001/videogames${data && data ? data : ('')}`)
        .then((res) => {
            dispatch({ type: type.GET_VGS, payload: res });
        }).catch(e => {
            console.log(e);
            dispatch({ type: 'ERROR', payload: e });
        });
    };  
};

export function getGenres(){
    return function(dispatch) {
        axios.get(`http://localhost:3001/genres`)
        .then((res) => {
            dispatch({ type: type.GET_GENRES, payload: res });
        }).catch(e => {
            console.log(e);
            dispatch({ type: 'ERROR', payload: e });
        });
    };
};

export function orderByR (n){
    return { type:type.ORDER_N, payload:n };
};

export function filterGenre(payload) {
    return { type: 'FILTER_GENRE', payload };
};

export function filterCreated(payload) {
    return { type: 'FILTER_CREATED', payload };
};

export function search(payload) {
    return { type: 'SEARCH', payload };
};

export function all() {
    return { type: 'ALL' };
};