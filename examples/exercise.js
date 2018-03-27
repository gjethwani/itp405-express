function timeout(milliseconds) {
  return new Promise(function(resolve, reject) {
    if (milliseconds < 2000) {
      setTimeout(function() {
        resolve();
      }, milliseconds);
    } else {
      reject();
    }
  });
}

console.log(1);
timeout(1500).then(
  function() {
    console.log("sup");
  },
  function() {
    console.log("too long");
  }
);
console.log(2);
