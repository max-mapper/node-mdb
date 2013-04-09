var mdb = require('../')

var fruit = mdb('fruit.mdb')

fruit.tables(function(err, tables) {
  if (err) return console.log(err)
  tables.forEach(function(table, index) {
    fruit.toCSV(table, function(err, csv) {
      console.log(err, table, csv.split('\n').length - 1 + " lines")
      if (index == tables.length-1) testSQL();
    })
  })
})

function testSQL () {
  console.log('---------------------');
  fruit.tables(function(err, tables) {
    if (err) return console.log(err)
    tables.forEach(function(table) {
      fruit.toSQL(table, function(err, sql) {
        console.log(err, table, sql.split('\n').length + " lines")
      })
    })
  })
}
