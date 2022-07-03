const { Router } = require('express');
const { Genre } = require('../db.js');
const { pagination } = require('../Tools.js');
const axios = require('axios').default;
const router = Router();

router.get('/', async(req, res, next) =>{

    try {

        let peticionDB = await Genre.findAll();
        
        return res.json(peticionDB);

    }catch(e){

        next({status: "500", message: 'Ups, looks like all the genres are gone'});

    }
});

module.exports = router;