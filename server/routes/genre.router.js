const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// router.get('/:id', (req, res) => {
//    console.log('in server', req.params.id)
//   // Add query to get all genres
//   const sqlTExt = `SELECT * FROM "movies_genres"
//   JOIN movies ON movies_genres.movie_id = movies.id
//   JOIN genres ON movies_genres.genre_id = genres.id
//   WHERE "movie_id" = ${req.params.id}`;

  
//   pool.query(sqlTExt)
//   .then((result) => {
//     res.send(result.rows);
//   }).catch ((err) => {
//     console.log('error in GET server', err)
//     res.sendStatus(500)
//   })
 
// });

module.exports = router;