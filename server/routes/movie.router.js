const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// queries db for movie information, as well as the total number of movies in the db
router.get('/', (req, res) => {
  const query = `SELECT "movies".id, "movies".title, "movies".poster, "movies".description, SUM(COUNT("movies")) OVER() AS "total_movies"
  FROM "movies" GROUP BY "movies".id, "movies".title, "movies".poster, "movies".description
  ORDER BY "movies".id ASC LIMIT 10`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});

// queries db for all columns from movie table as well as all genres for a single movie id
router.get('/:id', (req, res) => {
  console.log('in get movie detail with id', req.params.id);
  const query = `SELECT "movies".title, "movies".poster, "movies".description, STRING_AGG("genres".name, ', ') AS "genres" FROM "movies"
  JOIN "movies_genres" ON "movies".id = "movies_genres".movie_id
  JOIN "genres" ON "movies_genres".genre_id = "genres".id
  WHERE "movies".id = $1
  GROUP BY "movies".title, "movies".poster, "movies".description;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});

// queries db for all movies that include the given search string
router.get('/search/:query', (req, res) => {
  console.log('received filter query', req.params.query);
  const filterText = '%'+req.params.query+'%';
  const query = `SELECT * FROM "movies"
  WHERE "movies".title LIKE $1 ORDER BY "id" ASC LIMIT 10;`;
  pool
    .query(query, [filterText])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});

// queries db for all movies that include the given genre
router.get('/genre/:id', (req, res) => {
  console.log('received filter genre', req.params.id);
  const query = `SELECT "movies".id, "movies".title, "movies".poster FROM "movies"
  JOIN "movies_genres" ON "movies".id = "movies_genres".movie_id
  JOIN "genres" ON "movies_genres".genre_id = "genres".id
  WHERE "genres".id = $1;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});

// deletes movie first from junction table, then from movie table
router.delete('/:id', (req, res) => {
  console.log('in delete with movie id', req.params.id);
  const junctionDeleteQuery = `DELETE from "movies_genres" WHERE "movie_id" = $1`;
  pool
    .query(junctionDeleteQuery, [req.params.id])
    .then((result) => {
      console.log('deleted movie from junction table');
      const movieDeleteQuery = `DELETE from "movies" WHERE "id" = $1;`;
      pool
        .query(movieDeleteQuery, [req.params.id])
        .then((result) => {
          console.log('deleted movie from movie table');
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log('error in movie table delete', error);
        });
    })
    .catch((error) => {
      console.log('error in junction table delete', error);
      res.sendStatus(500);
    });
});

// queries db to update movie details at given id
router.put('/:id', (req, res) => {
  console.log('in put with movie id', req.params.id);
  console.log('also received', req.body.title, req.body.description);
  const query = `UPDATE "movies"
  SET "title" = $1, "description" = $2
  WHERE "id" = $3;`;
  pool
    .query(query, [req.body.title, req.body.description, req.params.id])
    .then((result) => {
      console.log('updated movie');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('received error', error);
      res.sendStatus(500);
    });
});

// adds new movie to movie table, then to junction table
router.post('/', (req, res) => {
  console.log('in post server with', req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `;
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
