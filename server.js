var yaml = require('yaml')
var fs = require('fs')

// Database

persistence = require('persistencejs/persistence').persistence;
var persistenceStore = require('persistencejs/persistence.store.mysql');
var db = yaml.eval(fs.readFileSync('./config/database.yml')+'').connection;
persistenceStore.config(persistence, db.host, db.port, db.database, db.username, db.password);
session = persistenceStore.getSession();

// Models, models, models!
require('./models/models').models(persistence)

// Framework

app = require('express').createServer();

app.set('view options', {
  layout: false
});

// root
app.get('/', function(req, res){
  res.render('index.haml', {
    locals: {}
  });
});


// Model examples

example_user = {
  id: 1,
  admin: false,
  email_address: '',
  name: '',
  type: 'member',
  full: false,
  created_at: '2009-11-17T19:41:38Z'
}

var example_upload = {
  byte_size: 8922,
  content_type: "image/jpeg",
  id: 1,
  name: 'me.jpg',
  room_id: 1,
  user_id: 1,
  full_url: "http://account.campfirenow.com/room/1/uploads/1/me.jpg"
}

require('./rooms').routes();





app.listen(3000);