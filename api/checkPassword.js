const { constant, fetch, encrypt } = require('../utils')

module.exports = async (token, password) => {
  const reqBody = {
    password: encrypt(password),
    deviceUuid: ''
  }

  const result = await fetch('/v2/validatePassword', {
    method: 'post',
    headers: { 'Content-Type': constant.jsonContentType },
    body: JSON.stringify(reqBody)
  }).then(res => res.text())
    .then(text => {
      if (!text.startsWith('"Bearer')) throw new Error('비밀번호가 올바르지 않아요!')
      else return text.slice(1, -1) // NOTE: Remove double quotes
    })

  return result
}
