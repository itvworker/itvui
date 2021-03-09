export function formatDate(arg, format) {
    // console.log(typeof arg.toString());
   

    if(typeof arg === "String") {
        arg = arg.replace(/-/ig, '/');
    }
    
    format = format || "Y/M/D h:m";
    let now = ''
    if(!arg) {
        now = new Date();
    }else{
        now = new Date(arg);
    }
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    month = month >= 10 ? month : "0" + month;
    var date = now.getDate();
    date = date >= 10 ? date : "0" + date;
    var hour = now.getHours();
    hour = hour >= 10 ? hour : "0" + hour;
    var minute = now.getMinutes();
  
    minute = minute >= 10 ? minute : "0" + minute;
    var second = now.getSeconds();
    second = second >= 10 ? second : "0" + second;
    return format
      .replace("Y", year)
      .replace("M", month)
      .replace("D", date)
      .replace("h", hour)
      .replace("m", minute)
      .replace("s", second);
  }