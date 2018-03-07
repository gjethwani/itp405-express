const express = require('express');
const knex = require('knex');

const app = express();

app.get('/genres', function(request, response) {
  let connection = connect();
  //SELECT * FROM genres
  let promise = connection.select().from('genresf')
  promise.then(function(genres) {
    //success
    response.json(genres);
  }, function(err) {
    //error
    response.json({
      error: err
    })
  });
});

app.get('/genres/:id', function(request, response) {
  let id = request.params.id;
  let connection = connect();
  let promise = connection
    .select()
    .from('genres')
    .where('GenreId', id)
    .first();
  promise.then(function(genre) {
    response.json(genre);
  }, function() {
    response.json({
      error: 'Cannot find genre ' + id
    });
  });
});

function connect() {
  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite'
    }
  });
  return connection;
}

const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
