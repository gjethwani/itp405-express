function doSomethingAsync(callbackFunction) {
  setTimeout(function() {
    callbackFunction();
  }, 0);
}

console.log(1);
doSomethingAsync(function() {
  console.log(3);
});
console.log(2);
