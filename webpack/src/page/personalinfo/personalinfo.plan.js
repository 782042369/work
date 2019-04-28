import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import infolist from 'part/infolist/infolist.hbs';
import personalinfo from './personalinfo.hbs';


module.exports = personalinfo({
    title: '我的空间',
    header,
    footer,
    mainnav,
    infolist
  })