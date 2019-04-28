import index from './index.hbs'
import header from 'part/header/header.hbs'
import footer from 'part/footer/footer.hbs'

module.exports = index({
  title: '政务服务标准化平台',
  header,
  footer
})