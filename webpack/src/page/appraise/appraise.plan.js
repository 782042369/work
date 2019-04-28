import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import appraise from './appraise.hbs';


module.exports = appraise({
    title: '我要评价',
    header,
    footer,
    mainnav
  })