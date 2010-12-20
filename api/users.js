exports.routes = function(){

  // Get information about the current user
  app.get('/users/me', function(req, res){
    util.to_json(tx, req.user, function(json_user){
      res.send({ user: json_user });
    })
  });

  // Get information about a user
  app.get('/users/:id', function(req, res){
    User.load(session, tx, req.params.id, function(user){
      util.to_json(tx, user, function(json_user){
        // TODO: real users list
        res.send({ user: json_user });
      });
    });
  });

}