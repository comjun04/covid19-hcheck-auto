const { fetch } = require('./utils')

const {
  school,
  studentName,
  birthday,
  password 
} = require('./config.json')
const api = require('./api');

(async () => {
  const schoolCode = await api.getSchoolCode(school)
console.log(schoolCode)
  const userToken = await api.getUserToken(schoolCode, studentName, birthday)
console.log(userToken)
  fetch.setToken(userToken)

  const isPasswordSet = await api.isPasswordSet()
  console.log(isPasswordSet)
})()
