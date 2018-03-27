const fs = require('fs');

function doSomethingAsync() {
  // promise states = pending, resolved (success), rejected (error)
  return new Promise(function(resolve, reject) {
    fs.readFile('hello.txt', { encoding: 'utf8' }, function(error, contents) {
      if (error) {
        reject(error);
      } else {
        resolve(contents);
      }
    });
  });
}

console.log(1);
doSomethingAsync()
  .then(function(contents) {
    // success
    console.log('File contents: ', contents);
  }, function(error) {
    // error
    console.error('There was an error!', error);
    throw error;
  })
  .then(function() {
    console.log('yayyyyy');
  }, function() {
    console.error('bummer');
  });
console.log(2);
