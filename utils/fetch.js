const fetch = require('node-fetch')

const { baseUrl } = require('./constant')

let token = ''

function _fetch (addr, options) {
  if (!options) options = {}
  if (!options.headers) options.headers = {}

  if (token.length > 0) options.headers.Authorization = token
  options.headers['User-Agent'] = 'hcheck-auto/1.0'

  return fetch(baseUrl + addr, options)
}

_fetch.setToken = (tk) => { token = tk }

module.exports = _fetch
