var mdb = require('../')

mdb('fruit.mdb').tables(function(err, tables) {
  console.log(err, tables)
})
