
export const getDatePretty = (str) => {
  try {
    var date = new Date(Date.parse(str));
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+ date.getFullYear() +" "+date.getHours() +"-"+date.getMinutes();
  } catch (err) {
    console.log(err);
  }
}

export const getTimePretty= (seconds) => {
  try{
    var h = Math.floor(seconds/3600);
    var m = Math.floor((seconds%3600)/60);
    // var s = (seconds%60);
    return h+":"+m;
  } catch (err) {
    console.log(err);
  }
}