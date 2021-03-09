export default class Doc {
    constructor (doc) {
        this.doc = doc
    
    }
    getHtml () {

       
        this.doc = this.doc.replace(/<p>[\S\s]+?<\/p>/ig, (word) => {
            if (word.indexOf('$#') === -1) {
                return word
            }
            let str = word.replace('<p>', '').replace('</p>', '')
            str = str.replace(/\$#[\/\.a-zA-z=_\-"'&;#\d]+/ig, (value) => {
                let str = value.substr(2, value.length)
                let arr = str.split('.')
                let html = '<'
                if (arr.length <= 1) {
                    html += arr[0] + '>'
                    return html
                }
                html += arr[0] + ' '
                arr.splice(0, 1)
                arr.forEach((item, index) => {
                    let a = item.split('=')
                    if (a.length >= 2) {
                        html += `${a[0]}="${a[1].replace(/_/ig, ' ')}"`
                    } else {
                        html += item.replace(/_/ig, ' ') + ' '
                    }
                })
                html += '>'

                return html
            })

            return str
        })

        return this.doc
    }
    rmEmptyArr (value) {
        let arr = []
        value.forEach((item, index) => {
            if (item.length > 3) {
                arr.push(item)
            }
        })
        return arr
    }
}
