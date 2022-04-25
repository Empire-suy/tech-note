const deepClone = function(data) {
  let obj = {}

  if (Array.isArray(data)) {
    return data.map(item => deepClone(item))
  }

  if (Object.prototype.toString.call(data) === '[object Object]') {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        obj[key] = deepClone(data[key])
      }
    }

    return obj
  }

  return data
}

const objA = {
  name: 'jack',
  birthday: new Date(),
  pattern: /jack/g,
  body: document.body,
  others: [123,'coding', new Date(), /abc/gim,]
};


let obj2 = deepClone(objA)

obj2.name = 'obj2name'
console.log(obj2.name === objA.name)
console.log(obj2.birthday === objA.birthday)
objA.pattern === /\d+/
console.log(obj2.pattern === objA.pattern)
console.log(obj2.body === objA.body)
console.log(obj2.others === objA.others)
console.log(obj2)

