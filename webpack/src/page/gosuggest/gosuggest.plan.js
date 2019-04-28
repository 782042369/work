import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import gosuggest from './gosuggest.hbs';


module.exports = gosuggest({
    title: '我要建议',
    header,
    footer,
    mainnav
  })