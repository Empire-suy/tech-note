function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype
  while(proto) {
    if (proto === prototype) {
      return true
    }

    proto = Object.getPrototypeOf(proto)
  }

  return false
}

const arr = [1, 2, 3]
console.log(arr instanceof Array)
console.log(myInstanceof(arr, Array))
