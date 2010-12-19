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