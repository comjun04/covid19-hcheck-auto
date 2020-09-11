const { publicKey } = require('./constant')

// Fake browser env
global.navigator = { appName: 'nodejs' }
global.window = {}

const JSEncrypt = require('jsencrypt').default
const jsEncrypt = new JSEncrypt()
jsEncrypt.setPublicKey(publicKey)

module.exports = (str) => {
  return jsEncrypt.encrypt(str)
}
