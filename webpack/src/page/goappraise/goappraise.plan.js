import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import goappraise from './goappraise.hbs';


module.exports = goappraise({
    title: '我要评价',
    header,
    footer,
    mainnav
  })