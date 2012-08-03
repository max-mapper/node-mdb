var mdb = require('../')

var fruit = mdb('fruit.mdb')

fruit.tables(function(err, tables) {
  tables.forEach(function(table) {
    fruit.toCSV(table, function(err, csv) {
      console.log(err, table, csv.split('\n').length - 1 + " lines")
    })
  })
})
