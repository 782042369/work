import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import infolist from 'part/infolist/infolist.hbs';
import personalappraise from './personalappraise.hbs';


module.exports = personalappraise({
    title: '我的评价',
    header,
    footer,
    mainnav,
    infolist
  })