import header from 'part/header/header.hbs'
import footer from 'part/footer/footer.hbs'
import mainnav from 'part/mainnav/mainav.hbs'
import suggest from './suggest.hbs'

module.exports = suggest({
    title: '建议公开',
    header,
    footer,
    mainnav
  })