const { constant, fetch } = require('../utils')

module.exports = async () => {
  const result = await fetch('/checkpw', {
    method: 'POST',
    headers: { 'Content-Type': constant.jsonContentType },
    body: '{}'
  }).then(res => res.json())
    .then(json => json.sndLogin.existsYn)

  return result === 'Y'
}
