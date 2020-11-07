const { constant, fetch } = require('../utils')

const surveyData = {
  deviceUuid: '',
  rspns00: 'Y',
  rspns01: '1',
  rspns02: '1',
  rspns03: null,
  rspns04: null,
  rspns05: null,
  rspns06: null,
  rspns07: null,
  rspns08: null,
  rspns09: '0',
  rspns10: null,
  rspns11: null,
  rspns12: null,
  rspns13: null,
  rspns14: null,
  rspns15: null
}

module.exports = async (token, username) => {
  fetch.setToken(token)

  await fetch('/registerServey', {
    method: 'POST',
    headers: { 'Content-Type': constant.jsonContentType },
    body: JSON.stringify({
      ...surveyData,
      upperToken: token,
      upperUserNameEncpt: username
    })
  })
}
