exports.routes = function() {
  
  // List all rooms
  app.get('/rooms', function(req, res){
    Room.all(session).limit(10).list(tx, function(rooms) {
      collectJSON(tx, rooms, function(json_rooms){
        // when data is collected, return to the client
        res.send({ rooms: json_rooms });
      })
    });
  });
  
  // API Addition!
  // Add a new room
//  app.post('/rooms', function(req, res){
//    // TODO: add a room
//  });

  // List rooms the current user is in
  app.get('/presence', function(req, res){
    // TODO: filter by presence - this just lists all
    Room.all(session).limit(10).list(tx, function(rooms) {
      collectJSON(tx, rooms, function(json_rooms){
        // when data is collected, return to the client
        res.send({ rooms: json_rooms });
      })
    });
  });

  // Fetch a single room
  app.get('/room/:id', function(req, res){
    Room.load(session, tx, req.params.id, function(room){
      room.selectJSON(tx, ['*'], function(item){
        // TODO: real users list
        res.send({ room: item, users: [  ] });
      });
    });
  });

  // API Addition!
  // Delete a single room
//  app.post('/room/:id/delete', function(req, res){
//    // TODO: delete the room
//  });

  // Add the current user to a room
  app.post('/room/:id/join', function(req, res){
    // get by id
    res.send("OK");
  });

  // Remove the current user from a room
  app.post('/room/:id/leave', function(req, res){
    // get by id
    res.send("OK");
  });

  // Lock a room
  app.post('/room/:id/lock', function(req, res){
    // get by id
    res.send("OK");
  });

  // Unlock a room
  app.post('/room/:id/unlock', function(req, res){
    // get by id
    res.send("OK");
  });

  // Upload a file
  app.post('/room/:id', function(req, res){
    // get by id
    res.send({ upload: example_upload });
  });

  // Update a room (name/topic)
  app.post('/room/:id', function(req, res){
    // get by id
    res.send("OK");
  });

  // Recent messages from a room
  app.get('/room/:id/recent', function(req, res){
    // get by id
    res.send({ messages: [] });
  });

  // Recent uploads from a room
  app.get('/room/:id/uploads', function(req, res){
    // get by id
    res.send({ uploads: [] });
  });

  // Upload from an upload message
  app.get('/room/:id/messages/:message_id/upload', function(req, res){
    // get by id
    res.send({ upload: upload_example });
  });
  
  
  // utility methods
  
  function collectJSON(tx, result, callback) {
    json_collection = []
    console.log(result.length)
    if (result.length == 0) {
      callback(json_collection)
    }
    for (var i=0; i<result.length; i++) {
      result[i].selectJSON(tx, ['*'], function(item){
        json_collection.push(item);
        // if this is the last, return the array
        if (i == result.length-1) {
          callback(json_collection);
        }
      });
    }
  }

  
}