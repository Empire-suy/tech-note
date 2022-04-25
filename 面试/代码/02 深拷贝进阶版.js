function deepCopy(sourceObj) {
  if (typeof sourceObj !== 'object') return sourceObj;

  let newObj = sourceObj instanceof Array ? [] : {}

  for (let key in sourceObj) {
    if (sourceObj.hasOwnProperty(key)) {
      if (!(key in newObj)) {
        if (sourceObj[key] instanceof Date) {
          newObj[key] = new Date(sourceObj[key].getTime())
        } else if (sourceObj[key] instanceof RegExp) {
          newObj[key] = new RegExp(sourceObj[key])
        } else if ((typeof sourceObj[key] === 'object') && sourceObj[key].nodeType === 1) {
          let domEle = document.getElementsByTagName(sourceObj[key].nodeName)[0]
          newObj[key] = domEle.cloneNode(true)
        } else {
          newObj[key] = typeof sourceObj[key] === 'object' ? deepCopy(sourceObj[key]) : sourceObj[key]
        }
      }
    }
  }

  return newObj
}

// deepCopy 函数测试效果
const objA = {
  name: 'jack',
  birthday: new Date(),
  pattern: /jack/g,
  body: document.body,
  others: [123,'coding', new Date(), /abc/gim,]
};

const objB = deepCopy(objA);
console.log(objA === objB); // false
console.log(objA.others === objB.others); // false
console.log(objA.body === objB.body); // false
console.log(objA, objB); // 对象内容一样

