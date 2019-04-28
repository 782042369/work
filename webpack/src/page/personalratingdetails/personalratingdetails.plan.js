import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import infolist from 'part/infolist/infolist.hbs';
import personalratingdetails from './personalratingdetails.hbs';


module.exports = personalratingdetails({
    title: '我的评价详情',
    header,
    footer,
    mainnav,
    infolist
  })