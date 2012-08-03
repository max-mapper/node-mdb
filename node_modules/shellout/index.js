var stream = require('stream')
var util = require('util')
var concat = require('concat-stream')
var spawn = require('child_process').spawn

function Shell(cmd, args, cb) {
  if (!cb) {
    cb = args
    args = null
  }
  var self = this
  stream.Stream.call(this)
  this.writable = true
  this.child = spawn(cmd, args)
  this.stderrDone = false
  this.stdoutDone = false
  this.concat('stdout', function(err, stdout) {
    if (err) return cb(err)
    self.stdout = stdout
    self.stdoutDone = true
    if (self.stderrDone) cb(self.stderr, self.stdout)
  })
  this.concat('stderr', function(err, stderr) {
    if (err) return cb(err)
    self.stderr = stderr
    self.stderrDone = true
    if (self.stdoutDone) cb(self.stderr, self.stdin)
  })
  this.on('error', function(e) { this.child.stdin.emit('error', e) })
}

util.inherits(Shell, stream.Stream)

Shell.prototype.write = function(chunk) {
  this.child.stdin.write(chunk)
}

Shell.prototype.end = function() {
  this.child.stdin.end()
}

Shell.prototype.concat = function(name, cb) {
  this.child[name].pipe(
    concat(function(err, out) {
      if (err) return cb(err)
      cb(false, out)
    })
  )
}

module.exports = function(cmd, args, cb) {
  return new Shell(cmd, args, cb)
}

module.exports.Shell = Shell
