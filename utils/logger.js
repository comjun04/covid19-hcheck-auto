const chalk = require('chalk')

const totalStep = 6

module.exports.logStep = (step, str) => {
  console.log(`${chalk.cyan(`(${step}/${totalStep})`)} ${str}`)
}

module.exports.logError = (err) => {
  let str = ''
  if (err instanceof Error) str = err.stack
  else str = err

  console.error(chalk.red(str))
}

module.exports.logSuccess = () => {
  console.log(chalk.green('자가진단을 완료하였습니다!'))
}

module.exports.logDisclaimer = () => {
  console.log(chalk.yellow.bold(`
${chalk.inverse('경고')} 이 스크립트는 건강상의 문제가 없는 사람이 빠르게 자가진단을 할 수 있게 하는 목적으로 개발되었습니다.
실행 전 반드시 자신이 건강한지 확인하시기 바랍니다. 만약 건강상의 문제가 있다면 스크립트를 사용하지 말고 직접 자가진단을 하셔야 합니다.
이 스크립트를 사용함으로서 발생하는 피해는 스크립트를 사용한 본인에게 책임이 있습니다.`))
}
