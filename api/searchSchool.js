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
  queryParams.set('loginType', 'school')
  queryParams.set('currentPageNo', 1)

  const result = await fetch('/v2/searchSchool?' + queryParams.toString())
    .then(res => res.json())
    .then(json => {
      if (!Array.isArray(json.schulList) || json.schulList.length < 1) return []
      else return json.schulList.map(item => {
        return {
          name: item.kraOrgNm,
          code: item.orgCode,
          address: item.addres,
          requestUrl: item.atptOfcdcConctUrl
        }
      })
    })

  return result
}
