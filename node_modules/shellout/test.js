var shell = require('./')

// e.g. node test.js ls
var cmd = shell(process.argv[2], function(err, out) {
  console.log(err, out.toString())
})

