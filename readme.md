# mdb

    npm install mdb

### what

use the `mdbtools` CLI tool (written in C) from node to convert MS Access databases to CSV

these aren't native bindings, they just talk to stdin/stdout/stderr of `mdbtools` (specifically `mdb-tables` and `mdb-export`)

### requirements

install https://github.com/brianb/mdbtools. as of this writing I could only get it to compile on Ubuntu and not OS X

also as of this writing `mdbtools` supports `.mdb` and `.accdb` files up through Access 2010

### usage

#### Get tables

    tables(callback)

Example
````javascript
var fruit = mdb('fruit.mdb')
fruit.tables(function(err, tables) {
  tables.forEach(function (table) {
    console.log(table);
  });
});
````
    
#### Convert table rows to CSV rows

    toCSV(table, callback)

Example

````javascript
var fruit = mdb('fruit.mdb')
fruit.tables(function(err, tables) {
  tables.forEach(function(table) {
    fruit.toCSV(table, function(err, csv) {
      console.log(err, table, csv.split('\n').length - 1 + " lines")
    });
  });
});
````
#### Convert table rows to SQL INSERT statements

    toSQL(table, function, backend)
    
Currently defaults to `mdb-export -I mysql` "mysql" backend; so generates mysql compatible INSERT statements. See [mdb-export -I](https://github.com/brianb/mdbtools/blob/master/doc/mdb-export.txt) for more backends.

````javascript
var fruit = mdb('fruit.mdb')

fruit.tables(function(err, tables) {
  tables.forEach(function(table) {
    fruit.toSQL(table, function(err, sql) {
      console.log(err, table, sql.split('\n').length - 1 + " lines")
    });
  });
});
````


MIT LICENSE
