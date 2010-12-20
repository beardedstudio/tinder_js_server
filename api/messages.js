exports.routes = function(){

  // Post a new message to a room
  app.post('/room/:id/speak', function(req, res){
    var date = util.date_to_mysql_timestamp()

    message = new Message({
      room_id: req.params.id, 
      user_id: req.user.id,
      type: req.body.type,
      body: req.body.body,
      // TODO: refactor to the model, somehow
      updated_at: date,
      created_at: date
    })
    session.add(message)
    res.send("OK")
  });

  // Highlight a message
  app.post('/messages/:id/star', function(req, res){
    // make a message starred
    res.send("OK");
  });

  // Un-highlight a message
  app.del('/messages/:id/star', function(req, res){
    // make a message un-starred
    res.send("OK");
  });

}