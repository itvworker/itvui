export default function(arg, format) {
    // console.log(typeof arg.toString());
    let now
    if (!arg) {
        now = new Date()
    } else {
        now = new Date(arg)
    }

    format = format || 'Y/M/D h:m'
    const year = now.getFullYear()
    let month = now.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    let date = now.getDate()
    date = date >= 10 ? date : '0' + date
    let hour = now.getHours()
    hour = hour >= 10 ? hour : '0' + hour
    let minute = now.getMinutes()

    minute = minute >= 10 ? minute : '0' + minute
    let second = now.getSeconds()
    second = second >= 10 ? second : '0' + second
    return format
        .replace('Y', year)
        .replace('M', month)
        .replace('D', date)
        .replace('h', hour)
        .replace('m', minute)
        .replace('s', second)
}
