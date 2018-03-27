const fs = require('fs');

function doSomethingAsync(callbackFunction) {
  fs.readFile('hello.txt', { encoding: 'utf8' }, function(error, contents) {
    callbackFunction(contents);
  });
}

console.log(1);
doSomethingAsync(function(contents) {
  console.log(contents);
});
console.log(2);
