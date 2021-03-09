// let content = `<svg t="1580716909778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M512 64a448 448 0 1 1-448 448 448 448 0 0 1 448-448m0-64a512 512 0 1 0 512 512 512 512 0 0 0-512-512z" fill="iconColor"></path><path d="M768 362.24a32 32 0 0 0-44.8 0L448 632.96 302.72 486.4a32 32 0 1 0-46.72 44.8l148.48 147.2 45.44 45.44L768 407.68a32 32 0 0 0 0-45.44z" fill="iconColor"></path></svg>`
// content = content.replace(/</ig,'%3c').replace(/\//ig,'%2f').replace(/>/ig, '%3e').replace(/"/ig, "'")
// console.log(content);

export function svgXml(content) {
    content = content.replace(/</ig,'%3c').replace(/\//ig,'%2f').replace(/>/ig, '%3e').replace(/"/ig, "'");
    return 'data:image/svg+xml,'+ content;
}


export function slideHeight (content) {
    return function(height) {
        content.style.height = height + 'px';
    };
}

/**
 * 格式化时间
 * @param {String,Number} arg 时戳或日期字符串
 * @param {String} format 格式化的时间 Y：年 M:月 D:日 h：时 m:分 s:秒
 */
export function formatDate(arg="", format) {
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
