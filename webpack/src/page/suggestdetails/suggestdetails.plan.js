import header from 'part/header/header.hbs'
import footer from 'part/footer/footer.hbs'
import mainnav from 'part/mainnav/mainav.hbs'
import suggestdetails from './suggestdetails.hbs'

module.exports = suggestdetails({
    title: '投诉公开',
    header,
    footer,
    mainnav
  })