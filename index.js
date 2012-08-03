var spawn = require('child_process').spawn
var stream = require('stream')
var util = require('util')
var concat = require('concat-stream')

function Mdb(file) {
  stream.Stream.call(this)
  this.writable = true
  this.file = file
  this.tableDelimiter = ','
}

util.inherits(Mdb, stream.Stream)

Mdb.prototype.toCSV = function(table, cb) {
  spawn('mdb-export', [this.file, table]).pipe(
    concat(function(err, out) {
      if (err) return cb(err)
      cb(false, out)
    })
  )
}

Mdb.prototype.tables = function(cb) {
  var self = this
  spawn('mdb-tables', ['-d ' + this.tableDelimiter, this.file]).pipe(
    concat(function(err, out) {
      if (err) return cb(err)
      var tables = out.replace(/,\n$/, '').split(self.tableDelimiter)
      cb(false, tables)
    })
  )
}

module.exports = function(data) {
  return new Mdb(data)
}

module.exports.Mdb = Mdb
