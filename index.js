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

Mdb.prototype.toCSV = function(table, cb) {
  procstream('mdb-export ' + this.file + ' ' + table)
    .data(function(err, out) {
      if (err) return cb(err)
      cb(false, out)
    })

}

Mdb.prototype.tables = function(cb) {
  var self = this
  procstream('mdb-tables -d ' + this.tableDelimiter + ' ' + this.file)
    .data(function(err, out) {
      if (err) return cb(err)
      var tables = out.replace(/,\n$/, '').split(self.tableDelimiter)
      cb(false, tables)
    })
}

module.exports = function(data) {
  return new Mdb(data)
}

module.exports.Mdb = Mdb
