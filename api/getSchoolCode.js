const { URLSearchParams } = require('url')

const { constant, fetch } = require('../utils')

module.exports = async (school) => {
  const queryParams = new URLSearchParams()
  queryParams.set('lctnScCode', '06')
  queryParams.set('schulCrseScCode', 4)
  queryParams.set('orgName', school.name)
  queryParams.set('currentPageNo', 1)

  const result = await fetch('/school?' + queryParams.toString())
    .then(res => res.json())
    .then(json => {
      if (json.schulList.length > 1) throw new Error('너무 많은 학교가 검색되었어요! 학교 이름을 정확하게 입력해주세요!')
      else if (json.schulList.length < 1) throw new Error('검색된 학교가 하나도 없어요! 학교 이름을 정확하게 입력해주세요!')
      else return json.schulList[0].orgCode
    })

  return result
}
