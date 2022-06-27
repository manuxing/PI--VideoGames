const { Router } = require('express');
require('dotenv').config();
const { Videogame, Genre } = require('../db.js');
const axios = require('axios').default;
const router = Router();
const { pagination } = require('../Tools.js');
const { KEY } = process.env;
let idd = 200;
  


router.get('/', async(req, res, next) => {
    //hay que mandar del otro lado por url
    //query pag

    let {name, page, size} = req.query;
    if (!page) page = 0;
    if (!size) size = 15;

    if(!name){

        try{
            let peticionA = await axios.get(`https://api.rawg.io/api/games?${KEY}`);
            let peticionDB = await Videogame.findAll({
                include: Genre
            });
            console.log(peticionDB)
            let peticion = peticionDB.length > 0 ? peticionDB.map(p => {
                return p.dataValues;
            }) : [];

            peticion = pagination(peticion.concat(peticionA.data.results), page.toString(), size.toString());
            peticion.content = peticion.content.map(p => {
                let x = {
                    id: p.id,
                    name: p.name,
                    back: p.background_image ? p.background_image : p.img,
                    genres: p.genres 
                };
                return x; 
            });
            return res.json(peticion);

        } catch(e){

            return next(e);

        };
    };

    try{

        let peticionA = await axios.get(`https://api.rawg.io/api/games?search=${name}&${KEY}`);
        let peticionDB = await Videogame.findAll({
            where:{
               name: name,
            },
            include: Genre,
        });
        let peticion = peticionDB.map(p => {
            return p.dataValues;
        });

        peticion = pagination(peticionDB.concat(peticionA.data.results), page, size);
        peticion.content = peticion.content.map(p => {
            let x = {
                id: p.id,
                name: p.name,
                back: p.background_image ? p.background_image : p.img,
                genres: p.genres // va a haber que iterar en front
            };
            return x; 
        });

        return res.json(peticion);

    } catch(e){

        return next(e, {message: 'Invalid name'});

    };
    
});



router.post('/', async(req, res, next) => {
    
    //en el form que los generos por detras signifiquen sus respectivos ids, cuando se igrese uno nuevo 
    //hay que generarle su propio id y sumarlo a su tabla antes de asociarlo con toda la request
    //agregar pic en front
    console.log(req.body)
    let {name, createdGen} = req.body;
    let uni = req.body.genres;
    let esta = await Videogame.findAll({
        where: {
            name: name,
        }
    });

    if(createdGen){
        const create = async () => {
            try{
                idd = idd + 1;
                uni.push(idd);
                let crear = await Genre.create({id:idd, name:createdGen});
                idd = idd + 1;
            }catch(e){
                next(e,{message: 'Not able to create the genre of your new game'});
            }
        };
        create();
    };

    if(esta.length >= 1) return next({message:'The game already exists'});

    if(!name || !req.body.description || !req.body.platforms){
        return next({message:'U r missing something...'});
    };

    try{   
        
        let hacer = await Videogame.create(req.body);
        console.log('ui',uni)
        let promesas = uni.map(p => new Promise(resolve => hacer.addGenres(p)));
        Promise.all(promesas);

        return res.json(hacer);

    } catch (e){

        return next(e);

    };

});

module.exports = router;