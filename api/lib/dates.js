
exports.getDateFromHour = function(time)
{
	
	// 23:00. (01:00 - the next day)
  
  
  var splitTime = time.split(":");
  var hour = splitTime[0];
  var minutes = splitTime[1];
  
  var nowWithTime = new Date();
  nowWithTime.setHours(hour);
  nowWithTime.setMinutes(minutes);
  
  var now = new Date();
  if(nowWithTime <= now)
  {
    nowWithTime.setHours(nowWithTime.getHours() + 24);
  }
  
  return nowWithTime;
}