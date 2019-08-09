const key = 'toutiao-77'
export default {
  setUser (val) {
    window.sessionStorage.setItem(key, JSON.stringify(val))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(key) || '{}')
  },
  removeUser () {
    window.sessionStorage.removeItem(key)
  }
}
