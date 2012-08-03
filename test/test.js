var mdb = require('../')

var fruit = mdb('fruit.mdb').tables(function(err, tables) {
  tables.forEach(function(table) {
    fruit.toCSV(table, function(err, csv) {
      console.log(table, csv)
    })
  })
})
