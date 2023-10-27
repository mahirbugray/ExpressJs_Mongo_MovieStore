const express = require("express");

const Movie = require("../models/movie");
const Genre = require("../models/genre");

exports.GetMoviesList = (req, res, next) => {
  Movie.find().then((movies) => {
    res.render("moviesList", {
      title: "movie list",
      movies: movies,
    });
  });
};

exports.GetMovies = (req, res, next) => {
  // Movie.find()
  // Movie.find({filmadi:'Gladyator'})
  // Movie.find({filmadi :/^B/})       //StartsWith
  //Movie.find({filmadi :/r$/})        //EndsWith
  //Movie.find({filmadi :/.*Blue.*/})        //Contains
  //Sorgu Operatörleri
  //eq (equal), ne (not equal), gt (grater than), lt (less than), gte (greater than or equal), lte (less than or equal), in, not in
  // Movie.find({ filmadi: { $regex: req.body.search, $options: 'i' } } arama yapmak için içine girilen bilgiyle eşleşen değerleri sayfada listeler
  //Movie.find({filmadi: {$gt : 'E'}})  //E harfinden sonraki harflerle başlayan filmlerin listesi
  //Movie.find({filmadi: {$in : ['Gladyator', 'Barbie']}})
  Movie.find()
    // .or([{filmadi: {$gte: 'C'}}, {filmadi: /.*Blue.*/}]) //ismi c ve c'den sonraki harflerle başlayan  VEYA (or) isminin içinde Blue geçen filmler
    //.skip(2)     //listenin başından 2 tane atla
    //.limit(2)   // top 2
    //.select({filmadi:1, oyuncular:1, imageUrl:1})
    //.sort({filmadi: -1})  //1 -> ascending (A -Z),   -1 -> descending (Z - A)
    .then((movies) => {
      res.render("movies", {
        title: "movie list",
        movies: movies,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDeleteMovie = (req, res, next) => {
  Movie.findByIdAndDelete({ _id: req.params.id })
    .then(() => {
      res.redirect("/movies/list");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditMovie = (req, res, next) => {
  Genre.find()
  .then(genres => {
    Movie.findById({ _id: req.params.id })
      //.populate('genre', 'turAdi')
      .then((movie) => {
        res.render("editMovie", {
          title: "Film Güncelle",
          film: movie,
          turler: genres
        });
      })
      .catch((err) => {
        console.log(err);
      });
    })
};

exports.postEditMovie = (req, res, next) => {
  const id = req.body.id;
  const filmadi = req.body.filmadi;
  const yonetmen = req.body.yonetmen;
  const oyuncular = req.body.oyuncular;
  const imageUrl = req.body.imageUrl;
  const turId = req.body.selectedGenre;

  Movie.updateOne(
    { _id: id },
    {
      $set: {
        filmadi: filmadi,
        yonetmen: yonetmen,
        oyuncular: oyuncular,
        imageUrl: imageUrl,
        turId: turId
      },
    }
  )
    .then(() => {
      res.redirect("/movies/list");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddMovie = (req, res, next) => {
  Genre.find()
  .then(genres => {
      res.render("addMovie", {
        title: "Film Ekle",
        turler: genres
      });
  })
 
};

exports.postAddMovie = (req, res, next) => {
  const filmadi = req.body.filmadi;
  const yonetmen = req.body.yonetmen;
  const oyuncular = req.body.oyuncular;
  const imageUrl = req.body.imageUrl;
  const turId = req.body.selectedGenre;

  const movie = new Movie({
    filmadi: filmadi,
    yonetmen: yonetmen,
    oyuncular: oyuncular,
    imageUrl: imageUrl,
    turId: turId
  });

  movie
    .save()
    .then(() => {
      console.log(movie);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.GetMovie = (req, res, next) => {
  Movie.findById({ _id: req.params.id })
    .then((movie) => {
      res.render("movieDetail", {
        title: "Film Detayı",
        film: movie,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postSearchMovie = (req, res, next) => {
  Movie.find({ filmadi: { $regex: req.body.search, $options: 'i' } }   
  )
    .then((movies) => {
      res.render("movies", {
        title: "Filmler",
        movies: movies
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
