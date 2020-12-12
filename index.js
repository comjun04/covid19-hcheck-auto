const { fetch, logger, generateSchoolListTable } = require('./utils')

const {
  school,
  studentName,
  birthday,
  password
} = require('./config.json')
const api = require('./api'); // semicolon is needed to break statement

(async () => {
  logger.logDisclaimer()

  // Step 1. 학교 데이터 가져오기
  let schoolData = {}
  const preEnteredCode = school.code
  try {
    const schoolList = await api.searchSchool(school)
    if (schoolList.length < 1) return logger.logError('검색된 학교가 하나도 없어요! 학교 이름을 정확하게 입력해주세요!')
    else if (preEnteredCode) {
      schoolData = schoolList.find(sch => preEnteredCode === sch.code)
      if (!schoolData) {
        logger.logError('올바르지 않은 학교 코드에요! 아래 표를 확인하여 올바른 학교 코드를 등록해 주세요!')
        return console.log(generateSchoolListTable(schoolList))
      }
    } else if (schoolList.length > 1) {
      logger.logError('너무 많은 학교가 검색되었어요! 아래 표를 확인하여 자신이 다니는 학교를 확인 후 직접 학교 코드를 등록해 주세요!')
      return console.log(generateSchoolListTable(schoolList))
    } else schoolData = schoolList[0]
  } catch (e) {
    return logger.logError(e)
  }

  logger.logStep('학교 데이터 가져오기 완료')
  fetch.setRequestUrl('https://' + schoolData.requestUrl)
  const schoolCode = schoolData.code

  // Step 2. 학생 인증 후 참여자 목록 조회 토큰 가져오기
  let userToken = ''
  try {
    userToken = await api.findUser(schoolCode, studentName, birthday)
    logger.logStep('학생 인증 완료')
  } catch (e) {
    return logger.logError(e)
  }

  fetch.setToken(userToken)

  // Step 3. 비밀번호 확인
  try {
    userToken = await api.checkPassword(userToken, password)
    logger.logStep('비밀번호 확인 완료')
  } catch (e) {
    return logger.logError(e)
  }

  fetch.setToken(userToken)

  // Step 4. 참여자 목록 조회
  const usersInAccount = await api.getGroupList()
  logger.logStep('참여자 목록 조회 완료')

  // Step 5. 학생 데이터 가져오기 (갱신 토큰)
  const user = usersInAccount.find(item => item.name === studentName)
  if (!user) return logger.logError('알 수 없는 이유로 참여자 목록에서 학생정보를 불러오지 못했어요.')
  else logger.logStep('참여자 목록에서 학생정보 가져오기 완료')

  // Step 6. 설문 토큰 가져오기 (갱신 토큰 이용)
  const surveyToken = await api.getSurveyToken(schoolCode, user)
  logger.logStep('설문 전송에 사용되는 토큰 가져오기 완료')

  // Step 7. 설문 전송
  await api.sendSurveyData(surveyToken, user.name)
  logger.logStep('설문 데이터 전송 완료')

  // TODO Step 7. 정상적으로 처리되었는지 확인

  logger.logSuccess()
})()
