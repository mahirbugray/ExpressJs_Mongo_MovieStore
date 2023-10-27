const express = require('express');
const router = express.Router();

const genreController = require('../controllers/genres')

router.get('/list', genreController.GetGenres);

router.get('/addGenre', genreController.getAddGenre);

router.post('/addGenre', genreController.postAddGenre);

router.get('/edit/:id', genreController.getEditGenre);

router.post('/edit', genreController.postEditGenre);

router.get('/delete/:id', genreController.getDeleteGenre);

module.exports = router;