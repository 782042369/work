import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import infolist from 'part/infolist/infolist.hbs';
import personalcomplaints from './personalcomplaints.hbs';


module.exports = personalcomplaints({
    title: '我的投诉',
    header,
    footer,
    mainnav,
    infolist
  })