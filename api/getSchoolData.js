const { URLSearchParams } = require('url')

const { constant, fetch } = require('../utils')

module.exports = async (school) => {
  const regionCode = constant.regions[school.region]
  const schoolLevelCode = constant.schoolLevels[school.level]
  if (!regionCode) throw new Error('올바르지 않은 지역 이름이 입력되었어요! 다시 확인해주세요!')
  else if (!schoolLevelCode) throw new Error('올바르지 않은 학교급이 입력되었어요! 다시 확인해주세요!')

  const queryParams = new URLSearchParams()
  queryParams.set('lctnScCode', regionCode)
  queryParams.set('schulCrseScCode', schoolLevelCode)
  queryParams.set('orgName', school.name)
  queryParams.set('currentPageNo', 1)

  const result = await fetch('/school?' + queryParams.toString())
    .then(res => res.json())
    .then(json => {
      if (!Array.isArray(json.schulList) || json.schulList.length < 1) throw new Error('검색된 학교가 하나도 없어요! 학교 이름을 정확하게 입력해주세요!')
      if (json.schulList.length > 1) throw new Error('너무 많은 학교가 검색되었어요! 학교 이름을 정확하게 입력해주세요!')
      else return {
        schoolCode: json.schulList[0].orgCode,
        requestUrl: json.schulList[0].acptOfcdcConctUrl
      }
    })

  return result
}
