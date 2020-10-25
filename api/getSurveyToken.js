const { constant, fetch } = require('../utils')

module.exports = async (schoolCode, user) => {
  fetch.setToken(user.token)
  const surveyToken = await fetch('/v2/getUserInfo', {
    method: 'POST',
    headers: { 'Content-Type': constant.jsonContentType },
    body: JSON.stringify({
      orgCode: schoolCode,
      userPNo: user.userNo
    })
  }).then(res => res.json())
    .then(json => json.token)

  return surveyToken
}
