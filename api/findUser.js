const { URLSearchParams } = require('url')

const { constant, fetch, encrypt } = require('../utils')

module.exports = async (schoolCode, name, birthday) => {
  const reqBody = {
    orgCode: schoolCode,
    name: encrypt(name),
    birthday: encrypt(birthday),
    loginType: 'school',
    stdntPNo: null
  }

  const result = await fetch('/v2/findUser', {
    method: 'POST',
    headers: { 'Content-Type': constant.jsonContentType },
    body: JSON.stringify(reqBody)
  }).then(res => res.json())
    .then(json => {
      if (json.isError) throw new Error('입력하신 학생정보가 올바르지 않아요! 학교 정보, 학생 이름, 생년월일을 확인해주세요!')
      else if (json.token) return json.token
      else throw new Error('인증 토큰 조회에 실패했습니다. 구조가 변경되었을 가능성이 있으니 개발자에게 알려주세요.')
    })

  return result
}
