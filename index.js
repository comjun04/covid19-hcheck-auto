const { fetch, logger } = require('./utils')

const {
  school,
  studentName,
  birthday
} = require('./config.json')
const api = require('./api');

(async () => {
  logger.logDisclaimer()

  // Step 1. 학교 데이터 가져오기
  let schoolData = {}
  try {
    schoolData = await api.getSchoolData(school)
    logger.logStep(1, '학교 데이터 가져오기 완료')
  } catch (e) {
    return logger.logError(e)
  }
  const { schoolCode } = schoolData
  fetch.setRequestUrl(schoolData.requestUrl)

  // Step 2. 학생 인증 후 참여자 목록 조회 토큰 가져오기
  let userToken = ''
  try {
    userToken = await api.getUserToken(schoolCode, studentName, birthday)
    logger.logStep(2, '학생 인증 완료')
  } catch (e) {
    return logger.logError(e)
  }

  fetch.setToken(userToken)

  // Step 3. 참여자 목록 조회
  const usersInAccount = await api.getGroupList()
  logger.logStep(3, '참여자 목록 조회 완료')

  // Step 4. 학생 데이터 가져오기 (갱신 토큰)
  const user = usersInAccount.find(item => item.name === studentName)
  if (!user) return logger.logError('알 수 없는 이유로 참여자 목록에서 학생정보를 불러오지 못했어요.')
  else logger.logStep(4, '참여자 목록에서 학생정보 가져오기 완료')

  // Step 5. 설문 토큰 가져오기 (갱신 토큰 이용)
  const surveyToken = await api.getSurveyToken(schoolCode, user)
  logger.logStep(5, '설문 전송에 사용되는 토큰 가져오기 완료')

  // Step 6. 설문 전송
  await api.sendSurveyData(surveyToken)
  logger.logStep(6, '설문 데이터 전송 완료')

  // TODO Step 7. 정상적으로 처리되었는지 확인

  logger.logSuccess()
})()
