# mdb

    npm install mdb

### what

use the `mdbtools` CLI tool (written in C) from node to convert MS Access databases to CSV

these aren't native bindings, they just talk to stdin/stdout/stderr of `mdbtools` (specifically `mdb-tables` and `mdb-export`)

### requirements

install https://github.com/brianb/mdbtools. as of this writing I could only get it to compile on Ubuntu and not OS X

also as of this writing `mdbtools` supports `.mdb` and `.accdb` files up through Access 2010

### usage

    var fruit = mdb('fruit.mdb')

    fruit.tables(function(err, tables) {
      tables.forEach(function(table) {
        fruit.toCSV(table, function(err, csv) {
          console.log(err, table, csv.split('\n').length - 1 + " lines")
        })
      })
    })

MIT LICENSE
