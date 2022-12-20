const { Router } = require('express');
const vg = require('./vg.js');
const vgs = require('./vgs.js');
const genres = require('./genres.js');

const router = Router();
router.use('/videogame', vg);
router.use('/videogames', vgs);
router.use('/genres', genres);

module.exports = router;
