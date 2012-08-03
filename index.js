var procstream = require('procstreams')
var stream = require('stream')
var util = require('util')
var concat = require('concat-stream')

function Mdb(file) {
  stream.Stream.call(this)
  this.file = file
}

util.inherits(Mdb, stream.Stream)

Mdb.prototype.allTablesToCSV = function() {
  var tables = {}
  this.tables(file).forEach(function(table) {
    tables[table] = this.toCSV(table)
  })
  return tables
}

Mdb.prototype.toCSV = function(table) {
  return procstream('mdb-export ' + table + ' ' + this.file)
}

Mdb.prototype.tables = function(cb) {
  procstream('mdb-tables ' + this.file)
    .data(function(stdout, stderr) {
      console.log(stdout, stderr)
    });
  
  // .pipe(concat(function(err, tables) {
  //   if (err) return cb(err)
  //   cb(false, tables.split(' '))
  // }))
}

module.exports = function(data) {
  return new Mdb(data)
}

module.exports.Mdb = Mdb
