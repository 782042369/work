const app = {
  set(name, key) {
    localStorage.setItem(name, JSON.stringify(key))
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  remove(key) {
    localStorage.removeItem(key)
  }
}
export default app
