const Table = require('cli-table3')
const chalk = require('chalk')

module.exports = (schoolList) => {
  const table = new Table({
    head: [ '학교 이름', '학교 주소', '학교 코드' ],
    style: { head: ['green'] }
  })

  schoolList.forEach(item => table.push([
    item.name,
    item.address,
    chalk.cyan.bold(item.code)
  ]))

  return table.toString()
}
