// types supported by persistence.js
var integer = "INT"
var text = "TEXT"
//var datetime = "DATE"
var datetime = "TEXT" // persistence tries to get fancy with dates, and they won't save!
var bool = "BOOL"
var json = "JSON"

exports.models = function() {

  // This model is intended to mirror http://developer.37signals.com/campfire/reference

  Message = persistence.define('Message', {
    room_id: integer,
    user_id: integer,
    body: text,
    type: text,
    updated_at: datetime,
    created_at: datetime
  });

  Room = persistence.define('Room', {
    name: text,
    topic: text,
    membership_limit: integer,
    full: bool,
    open_to_guests: bool,
    active_token_value: text,
    updated_at: datetime,
    created_at: datetime
  });

  Upload = persistence.define('Upload', {
    room_id: integer,
    user_id: integer,
    byte_size: text,
    content_type: text,
    full_url: text,
    updated_at: datetime,
    created_at: datetime
  });

  User = persistence.define('User', {
    name: text,
    email_address: text,
    admin: bool,
    type: text,
    updated_at: datetime,
    created_at: datetime
  });
  
}