var yaml = require('yaml')
var fs = require('fs')

// Database

persistence = require('persistencejs/persistence').persistence;
var persistenceStore = require('persistencejs/persistence.store.mysql');
var db = yaml.eval(fs.readFileSync('./config/database.yml')+'').connection;
persistenceStore.config(persistence, db.host, db.port, db.database, db.username, db.password);
session = persistenceStore.getSession();

// without this, migrations script exits
window.persistence = persistence

persistenceMigrations = require('persistencejs/persistence.migrations')

var migrations = require('./models/migrations')
migrations.migrate()