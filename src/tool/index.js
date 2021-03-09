//去除表情
//unicode 对照表地址 https://blog.csdn.net/hherima/article/details/9045861
export function clearFace(str) {
    return str.replace(/[\u200D\u2700-\u27BF\u2B00-\u2BFF\uD800-\uF8FF\uFE00-\uFE0F]/g, "");
}


//格式化时间日期
export function formatDate(arg, format) {
    let now
    if (!arg) {
        now = new Date()
    } else {
        now = new Date(arg)
    }
    format = format || 'YYYY/MM/DD hh:mm'
    const year = now.getFullYear()
    let month = now.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    let date = now.getDate()
    date = date >= 10 ? date : '0' + date
    let hour = now.getHours()
    let hournum = hour
    hour = hour >= 10 ? hour : '0' + hour
    let minute = now.getMinutes()
    let week = word[now.getDay()]
    minute = minute >= 10 ? minute : '0' + minute
    let second = now.getSeconds()
    second = second >= 10 ? second : '0' + second

    let ampm = "";
   
    if(hournum) > 12) {
        let h =hournum - 12;
        h = h >= 10 ? h : '0' + h;
        ampm = 'PM '+h
    } else {
        ampm = 'AM '+hour
    }

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', date)
        .replace('HH', hour)
        .replace('hh', ampm)
        .replace('mm', minute)
        .replace('ss', second)
}