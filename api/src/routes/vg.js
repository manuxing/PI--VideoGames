const { Router } = require('express');
require('dotenv').config();
const { Videogame, Genre } = require('../db.js');
const pre = require('../Tools')
const axios = require('axios').default;
const router = Router();
const { KEY } = process.env;


router.get('/:idi', async(req, res, next) => {

    let {idi} = req.params;
    const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    if(!idi) next({message:'You must enter an ID'});
    if(regExp.test(idi)){
        try {
            let peticionDB = await Videogame.findByPk(idi,{
                include: Genre,
            });
            let {id, name, background_image, img, genres, description,
            released, rating, platforms} = peticionDB.dataValues;
            let respuesta = {
              id,
              name,
              back : background_image ? background_image : img,
              genres,
              description,
              date: released,
              rating,
              platforms,
            };
            
            return res.json(respuesta);

        } catch (e){

            return next({status: 400, message:'Videogame not found'});

        };
    } else {
        try {
            let peticionA = await axios.get(`https://api.rawg.io/api/games/${idi}?${KEY}`);
            let {id, name, background_image, genres, description_raw,
                 released, rating, platforms} = peticionA.data;
            let respuesta = {
                    id,
                    name,
                    background_image,
                    genres,
                    description_raw,
                    date: released,
                    rating,
                    platforms: pre.displayPlat(platforms),
                };
            
            return res.json(respuesta);

        } catch(e){

            if(e.name && e.name === "AxiosError"){
                return next(e);
            }

            return next({status: 400, message: "Video Game not found"});

        };
    };
});

module.exports = router;