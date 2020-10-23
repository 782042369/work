class MyPromise {
  callbacks = []
  constructor(fn) {
    fn(this._resolve.bind(this))
  }
  then(onFulfilled) {
    this.callbacks.push(onFulfilled)
    return this //看这里
  }
  _resolve(value) {
    this.callbacks.forEach((fn) => fn(value))
  }
}
module.exports = MyPromise
