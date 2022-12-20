const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');
const { Op } = require('sequelize');
const axios = require('axios').default;
const router = Router();
const { pagination, get, separateIds} = require('../Tools.js');
const { KEY } = process.env;

router.get('/', async(req, res, next) => {

    let {search /*page, size*/} = req.query;
    // if (!page) page = 0;
    // if (!size) size = 15;
    let name = search;

    if(!name){

        try{

            let peticionA = await get(`https://api.rawg.io/api/games?${KEY}`);
            let peticionDB = await Videogame.findAll({
                include: Genre
            });
            let peticion = peticionDB.length > 0 ? peticionDB.map(p => {
                return p.dataValues;
            }) : [];

            peticion = peticion.concat(peticionA); //pagination( /*, page.toString(), size.toString()*/);

            peticion.content = peticion.map(p => {
                let x = {
                    id: p.id,
                    name: p.name,
                    rating: p.rating,
                    back: p.background_image ? p.background_image : p.img,
                    genres: p.genres,
                    genres_id: separateIds(p.genres)
                };
                return x; 
            }); 
            
            return res.json(peticion.content);

        } catch(e){

            if(e.name && e.name === "AxiosError"){
                return next(e);
            }

            return next({status: 400, message: "There are no Video Games"});

        };
    };

    try{

        let peticionA = await get(`https://api.rawg.io/api/games?search=${name}&${KEY}`);
            let peticionDB = await Videogame.findAll({
                where:{
                [Op.like]: `%${name}%`
                },
                include: Genre,
            });
        let peticion = peticionDB.map(p => {
            return p.dataValues;
        });

        peticion = peticion.concat(peticionA); //pagination( /*, page.toString(), size.toString()*/);

        peticion.content = peticion.map(p => {
            let x = {
                id: p.id,
                name: p.name,
                back: p.background_image ? p.background_image : p.img,
                genres: p.genres,
                genres_id: separateIds(p.genres)
            };
            return x; 
        });

        return res.json(peticion);

    } catch(e){

        if(e.name && e.name === "AxiosError"){
            return next(e);
        };

        return next({status: 400, message: "Invalid Name"});

    };
    
});

router.post('/', async(req, res, next) => {
    
    let {name, createdGen} = req.body;
    let uni = req.body.genres;
    let esta = await Videogame.findAll({
        where: {
            name: name,
        }
    });

    // if(createdGen){
    //     const create = async () => {
    //         try{
    //             idd = idd + 1;
    //             uni.push(idd);
    //             let crear = await Genre.create({id:idd, name:createdGen});
    //             idd = idd + 1;
    //         }catch(e){
    //             next(e,{message: 'Not able to create the genre of your new game'});
    //         };
    //     };
    //     create();
    // };

    if(esta.length >= 1) return next({message:'The game already exists'});

    if(!name || !req.body.description || !req.body.platforms){
        return next({message:'U r missing something...'});
    };

    try{   
        
        let hacer = await Videogame.create(req.body);
        let promesas = uni.map(p => new Promise(resolve => hacer.addGenres(p)));
        Promise.all(promesas);
        return res.json(hacer);

    } catch (e){

        return next(e);

    };

});

module.exports = router;