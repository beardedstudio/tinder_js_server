// types supported by persistence.js
var integer = "INT"
var text = "TEXT"
var datetime = "DATE"
var bool = "BOOL"
var json = "JSON"

exports.models = function() {

  Room = persistence.define('Room', {
    name: text,
    topic: text,
    membership_limit: integer,
    full: bool,
    open_to_guests: bool,
    active_token_value: text,
    // persistence tries to get fancy with dates, and they won't save!
    updated_at: text,
    created_at: text
  });
  
  // console.log('roomy')
  
}