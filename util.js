exports.date_to_mysql_timestamp = function(date) {
  if (typeof date == 'undefined') {
    date = new Date()
  }
  
  function pad(integer) {
    if (integer < 10) {
      integer = '0'+integer
    }
    return integer
  }

  var date = date.getFullYear() + '-' 
             + pad(date.getMonth()+1) + '-' 
             + pad(date.getDate()) + ' ' 
             + pad(date.getHours()) + ':' 
             + pad(date.getMinutes()) + ':' 
             + pad(date.getSeconds())

  return date
}

exports.to_json = function(tx, object, callback) {
  object.selectJSON(tx, ['*'], function(item){
    callback(item)
  })
}

exports.collect_json = function(tx, result, callback) {
  json_collection = []
  if (result.length == 0) {
    callback(json_collection)
  }
  for (var i=0; i<result.length; i++) {
    exports.to_json(tx, result[i], function(item){
      json_collection.push(item)
      // if this is the last, return the array
      if (i == result.length-1) {
        callback(json_collection)
      }
    })
  }
}
