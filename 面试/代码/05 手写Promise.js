class _Promise {
  constructor(executor) {
    this.init()
    
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }

  init() {
    this.PromiseResult = null
    this.PromiseState = 'pending'
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }

  resolve = value => {
    if (this.PromiseState !== 'pending') return
    
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value

    while(this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }

  reject = err => {
    if (this.PromiseState !== 'pending') return
    
    this.PromiseState = 'rejected'
    this.PromiseResult = err

    while(this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }

  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

    const thenPromise = new _Promise((resolve, reject) => {
      const resolvePromise = cb => {
        setTimeout(() => {
          try {
            const x = cb(this.PromiseResult)
            if (x === thenPromise) {
              throw new Error('不能返回自身...')
            }
  
            if (x instanceof _Promise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (err) {
            reject(err)
            throw new Error(err)
          }
        });
      }

      if (this.PromiseState === 'fulfilled') {
        resolvePromise(onFulfilled)
      } else if (this.PromiseState === 'rejected') {
        resolvePromise(onRejected)
      } else if (this.PromiseState === 'pending') {
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
      }
    })
    
    return thenPromise
  }
}


new _Promise((resolve, reject) => {
  // resolve('成功')
  // reject('失败')
  setTimeout(() => {
    resolve('成功')
  }, 2000)
  // throw new Error('TypeError')
}).then(res => {
  console.log('成功回调', res)
  return 200
}).then(res => {
  console.log('二次回调', res)
})
