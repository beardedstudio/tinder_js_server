exports.routes = function(){

  // Post a new message to a room
  app.post('/room/:id/speak', function(req, res){
    // create a new message and return its data
    res.send("OK");
  });

  // Highlight a message
  app.post('/messages/:id/star', function(req, res){
    // make a message starred
    res.send("OK");
  });

  // Un-highlight a message
  app.delete('/messages/:id/star', function(req, res){
    // make a message un-starred
    res.send("OK");
  });

}