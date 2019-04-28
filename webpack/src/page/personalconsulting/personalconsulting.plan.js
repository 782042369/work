import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import infolist from 'part/infolist/infolist.hbs';
import personalconsulting from './personalconsulting.hbs';


module.exports = personalconsulting({
    title: '我的咨询',
    header,
    footer,
    mainnav,
    infolist
  })