require('haml');

var app = require('express').createServer();

app.set('view options', {
    layout: false
});

app.get('/', function(req, res){
  res.render('index.haml', {
    locals: {}
  });
});


// Model examples

var example_room = {
  id: 0,
  name: '',
  topic: '',
  membership_limit: 0,
  full: false,
  open_to_guests: true,
  active_token_value: 'XXXX',
  updated_at: '2009-11-17T19:41:38Z',
  created_at: '2009-11-17T19:41:38Z'
}

var example_user = {
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



// Rooms

app.get('/rooms', function(req, res){
  res.send({ rooms: [ example_room ] });
});

app.get('/presence', function(req, res){
  res.send({ rooms: [ example_room ] });
});

app.get('/room/:id', function(req, res){
  // get by id
  res.send({ room: example_room, users: [ example_user ] });
});

app.post('/room/:id/join', function(req, res){
  // get by id
  res.send("OK");
});

app.post('/room/:id/leave', function(req, res){
  // get by id
  res.send("OK");
});

app.post('/room/:id/lock', function(req, res){
  // get by id
  res.send("OK");
});

app.post('/room/:id/unlock', function(req, res){
  // get by id
  res.send("OK");
});

// upload a file
app.post('/room/:id', function(req, res){
  // get by id
  res.send({ upload: example_upload });
});

// update room (name/topic)
app.post('/room/:id', function(req, res){
  // get by id
  res.send("OK");
});

app.get('/room/:id/recent', function(req, res){
  // get by id
  res.send({ messages: [] });
});

app.get('/room/:id/uploads', function(req, res){
  // get by id
  res.send({ uploads: [] });
});

app.get('/room/:id/messages/:message_id/upload', function(req, res){
  // get by id
  res.send({ upload: upload_example });
});





app.listen(3000);