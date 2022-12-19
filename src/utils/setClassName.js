
const getVal = (data) => {
    let str = ''
    if (!data) return str
    if (typeof data === 'string' || typeof data === 'number') {
        str += data
    } else if (typeof data === 'object') {
        Object.entries(data).forEach(([key, value]) => {
            if (value) str += key
        })
    } else {
        str += data.map(r => getVal(r)).join(' ')
    }
    return str
}

const setClassName = (...args) => args.map(arg => getVal(arg)).join(' ');

export default setClassName;