import { type } from "./types";
import axios from "axios";
// ver que hacer con el manejo de errores

export function createVg(data){
    return function(dispatch){
        axios.post('http://localhost:3001/videogames', data)
        .then((res) => {
            console.log(res);
            return {type: type.CREATE_VG, payload: res};
        })
        .then(p => {
            console.log(p);
            dispatch(p)
        })
        .catch(e => console.log(e));
    }
};

export function getDetails(id){
    return function(dispatch){
      axios.get(`http://localhost:3001/videogame/${id}`)
        .then((res) => {
            console.log('primer then', res)
            dispatch({ type: type.GET_DETAILS, payload: res });
        }).catch(e => 
            console.log(e)
        );
    };
};

export function getVgs(data){
    return function(dispatch){
        axios.get(`http://localhost:3001/videogames${data && data.query ? data.query : ('')}`)
        .then((res) => {
            dispatch({ type: type.GET_VGS, payload: res });
        });
    }   
};

export function getGenres(){
    return function(dispatch) {
        axios.get(`http://localhost:3001/genres`)
        .then((res) => {
            dispatch({ type: type.GET_GENRES, payload: res });
        });
    }
};

export function orderByR (n){
    return { type:type.ORDER_N, payload:n}
};