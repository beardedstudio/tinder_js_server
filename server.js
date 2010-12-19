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


// Because this app is so simple, everything should happen in the same transaction
// But, we need a global placeholder for our single transaction
tx = null
session.transaction(function(tx) {
  // Ugly! Make this transaction globally accessible:
  tx = tx

  // Before each request, make sure we have a valid user
  app.all('*', function(req, res, next){
    // TODO: use real auth_token
    var auth_token = 'XXXXXX'
    User.findBy(session, tx, 'auth_token', auth_token, function(user){
      req.user = user
      if (req.user) {
        next()
      } else {
        next(new Error('cannot find user for ' + auth_token))
      }
    })
  })
  
  // Root route
  app.get('/', function(req, res){
    res.render('index.haml', {
      locals: {}
    });
  });
  
  // Other routes
  require('./rooms').routes();

});


app.listen(3000);