import { type } from "./types";
import axios from "axios";

export function createVg(data){
    return function(dispatch){
        axios.post(`http://localhost:3001/videogames`, data)
        .then((res) => {
            return {type: type.CREATE_VG, payload: res};
        });
        console.log('todo bien  ');
    }
};

// export async function getDetails(id){
//     return axios.get(`http://localhost:3001/videogame/${id}`)
//       .then((res) => {
//         dispatch({ type: type.GET_DETAILS, payload: res });
//     });
// };

// export async function getVgs(data){
//     return axios.get(`http://localhost:3001/videogames${data.query}`)
//       .then((res) => {
//         dispatch({ type: type.GET_VGS, payload: res });
//     });
// };

// export async function getGenres(data){
//     return axios.get(`http://localhost:3001/genres${data.query}`)
//       .then((res) => {
//         dispatch({ type: type.GET_GENRES, payload: res });
//     });
// };