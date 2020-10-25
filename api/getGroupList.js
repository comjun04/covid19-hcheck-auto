const { constant, fetch } = require('../utils')

module.exports = async (name) => {
  const result = await fetch('/v2/selectUserGroup', {
    method: 'POST',
    headers: { 'Content-Type': constant.jsonContentType },
    body: '{}'
  }).then(res => res.json())
    .then(json => {
      const list = json.map(item => {
        return {
          name: item.userNameEncpt,
          userNo: item.userPNo,
          token: item.token
        }
      })
      return list
    })

  return result
}
