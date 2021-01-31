const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:filter', (req, res) => {
  const query = `SELECT * FROM "movies"
  WHERE "movies".title LIKE '%$1%' ORDER BY "id" ASC`;
  pool
    .query(query, [])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});

module.exports = router;