var yaml = require('yaml')
var fs = require('fs')

// Database
persistence = require('persistencejs/persistence').persistence;
var persistenceStore = require('persistencejs/persistence.store.mysql');
var db = yaml.eval(fs.readFileSync('./config/database.yml')+'').connection;
persistenceStore.config(persistence, db.host, db.port, db.database, db.username, db.password);
session = persistenceStore.getSession();

// Utils
util = require('./util')

// Models, models, models!
require('./models/models').models(persistence)

// Framework
express = require('express')
app = express.createServer();
app.set('view options', {
  layout: false
});
// Decodes post variables
app.use(express.bodyDecoder());
// Allows use of _method in forms - probably not needed
app.use(express.methodOverride());

// We need a global placeholder for our single transaction
tx = null

// With each request
app.all('*', function(req, res, next){
  // TODO: use real auth_token
  var auth_token = 'XXXXXX'

  // Because this app is so simple, everything should happen in the same transaction
  session.transaction(function(transaction) {
    // Make this transaction globally accessible:
    tx = transaction

    // Make sure we have a valid user
    User.findBy(session, tx, 'auth_token', auth_token, function(user){
      req.user = user
      if (req.user) {
        next()

        // Flush all database changes in this transaction
        session.flush(tx, function() {
          // console.log('Done flushing!')
        });

      } else {
        next(new Error('cannot find user for ' + auth_token))
      }
    })
  
  });

})

// Root route
app.get('/', function(req, res){
  res.render('index.haml', {
    locals: {}
  })
})

// Other routes
require('./api/messages').routes()
require('./api/rooms').routes()
require('./api/users').routes()
require('./api/streaming').routes()


app.listen(3000)