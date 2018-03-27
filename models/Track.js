const bookshelf = require('./../bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'tracks',
  idAttribute: 'TrackId'
});
