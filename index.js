var procstream = require('procstreams')
var stream = require('stream')
var util = require('util')
var concat = require('concat-stream')

function Mdb(file) {
  stream.Stream.call(this)
  this.file = file
  this.tableDelimiter = ','
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
  procstream('mdb-tables -d ' + this.tableDelimiter + ' ' + this.file)
    .data(function(err, out) {
      if (err) return cb(err)
      cb(false, out.split(this.tableDelimiter))
    })
}

module.exports = function(data) {
  return new Mdb(data)
}

module.exports.Mdb = Mdb
