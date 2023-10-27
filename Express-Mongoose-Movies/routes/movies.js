const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movies')

/* GET users listing. */
router.get('/', movieController.GetMovies);   //referanstan yakaladığı için parantez açıp kapatmaya gerek duymuyoruz statik metodlarda parantez açıp kapatıyoruz.

router.get('/list', movieController.GetMoviesList);

router.get('/addMovie', movieController.getAddMovie);

router.post('/addMovie', movieController.postAddMovie);

router.get('/edit/:id', movieController.getEditMovie);

router.post('/edit', movieController.postEditMovie);

router.get('/delete/:id', movieController.getDeleteMovie);

router.get('/detail/:id', movieController.GetMovie);  

router.post('/search', movieController.postSearchMovie)

module.exports = router;
