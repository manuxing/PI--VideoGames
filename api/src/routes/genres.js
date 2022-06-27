const { Router } = require('express');
const { Genre } = require('../db.js');
const { pagination } = require('../Tools.js');
const axios = require('axios').default;
const router = Router();

router.get('/', async(req, res, next) =>{
    //query pag
    let {page, size} = req.query;

    try {
        let peticionDB = await Genre.findAll();
        // peticionDB = pagination(peticionDB, page, size);
        
        return res.json(peticionDB);

    }catch(e){

        next(e, {message: 'Ups, looks like all the genres are gone'});

    }
});

module.exports = router;