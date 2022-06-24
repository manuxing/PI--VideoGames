require('dotenv').config();
const { KEY } = process.env;
const { Genre } = require('./db.js');
const axios = require('axios').default;

let pre = {};

let queryCleaner = (query) => {
     let res = query.split(/([0-9]+)/);
     return res.map(p => {if(Number(p) || p === '0') return p}).join('').split(Boolean)[0];
};

pre.queryCleaner = queryCleaner;

pre.pre = async() => {
    try {
        let res1 = await axios.get(`https://api.rawg.io/api/genres?${KEY}`);
        let respuesta = res1.data.results.map(p => {
            let x = {
                id: p.id,
                name: p.name
            };
            return x;
        });
        await Genre.bulkCreate(respuesta);
    } catch (e){
        console.log('Cannot preload DataBase');
        throw ({message:'Cannot preload DataBase'});
    };
};


pre.pagination = (array, page, size) => {
    let res = {};
    let filtrado = [];
    let cuenta =  array.length;
    let j = 0;
   
    page = queryCleaner(page);
    size = queryCleaner(size);
    
    if(size > 15) size = 15;

    for (let i = Math.floor(page * size);j < size; j++, i++) {
        if(array[i] === undefined) throw ({message: "You've been playing whit my query parameters dont u? TT"});
        filtrado.push(array[i]);
    };

    res.content = filtrado;
    res.results = cuenta;
    res.pages = Math.ceil(cuenta / size);

    return res;
};



module.exports = pre;