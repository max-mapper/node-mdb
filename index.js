var spawn = require('child_process').spawn
var stream = require('stream')
var util = require('util')
var concat = require('concat-stream')
var shell = require('shellout')

function Mdb(file) {
  stream.Stream.call(this)
  this.writable = true
  this.file = file
  this.tableDelimiter = ','
}

util.inherits(Mdb, stream.Stream)

Mdb.prototype.toCSV = function(table, cb) {
  shell('mdb-export', [this.file, table], function(err, out) {
    if (err) return cb(err)
    if (!out) return cb('no output')
    cb(false, out.toString())
  })
}

Mdb.prototype.tables = function(cb) {
  var self = this
  shell('mdb-tables', ['-d' + this.tableDelimiter, this.file], function(err, out) {
    if (err) return cb(err.toString())
    if (!out) return cb('no output')
    var tables = out.toString().replace(/,\n$/, '').split(self.tableDelimiter)
    cb(false, tables)
  })
}

module.exports = function(data) {
  return new Mdb(data)
}

module.exports.Mdb = Mdb
