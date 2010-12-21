var yaml = require('yaml')
var fs = require('fs')

console.log(process.argv)

// Database
persistence = require('persistencejs/persistence').persistence;
persistenceStore = require('persistencejs/persistence.store.mysql');
var db = yaml.eval(fs.readFileSync('./config/database.yml')+'').connection;
persistenceStore.config(persistence, db.host, db.port, db.database, db.username, db.password);
session = persistenceStore.getSession();

// persistence migrations want to run in the browser - fails without this
window = { persistence: persistence }

// Migrations
persistenceMigrations = require('persistencejs/persistence.migrations')

// the migrations code must be old - this patches a transaction method onto persistence
persistence.transaction = function(callback){
  session.transaction(callback)
}

var migrations = require('./models/migrations')
migrations.migrate()
