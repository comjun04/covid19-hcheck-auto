const { fetch } = require('./utils')

const {
  school,
  studentName,
  birthday
} = require('./config.json')
const api = require('./api');

(async () => {
  // Step 1. 학교 코드 가져오기
  const schoolCode = await api.getSchoolCode(school)
console.log(schoolCode)

  // Step 2. 학생 인증 토큰 가져오기
  const userToken = await api.getUserToken(schoolCode, studentName, birthday)
console.log(userToken)
  fetch.setToken(userToken)

  // Step 3. 참여자 목록 조회
  const usersInAccount = await api.getGroupList()
  console.log(usersInAccount)

  // Step 4. 학생 데이터 가져오기 (갱신 토큰)
  const user = usersInAccount.find(item => item.name === studentName)
  if (!user) return console.log('알 수 없는 이유로 참여자 목록에서 학생정보를 불러오지 못했습니다.')

  // Step 5. 설문 토큰 가져오기 (갱신 토큰 이용)
  const surveyToken = await api.getSurveyToken(schoolCode, user)
  console.log(surveyToken)

  // Step 6. 설문 전송
  await api.sendSurveyData(surveyToken)
  console.log('완료')

  // TODO Step 7. 정상적으로 처리되었는지 확인
})()
