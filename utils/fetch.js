const fetch = require('node-fetch')

const { baseUrl, fakeUserAgent } = require('./constant')

let token = ''

function _fetch (addr, options) {
  if (!options) options = {}
  if (!options.headers) options.headers = {}

  if (token.length > 0) options.headers.Authorization = token
  options.headers['User-Agent'] = fakeUserAgent
  options.headers['X-Requested-With'] = 'XMLHttpRequest'

  return fetch(baseUrl + addr, options)
}

_fetch.setToken = (tk) => { token = tk }

module.exports = _fetch
