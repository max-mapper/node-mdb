# node-shellout

    npm install shellout

then

    var concat = require('shellout')
    shellout('ls', function(err, out) {
      // undefined 'index.js\nnode_modules\npackage.json\nreadme.md\ntest.js\n'
    })

see also: [[https://github.com/bahamas10/node-exec]]

MIT LICENSE
