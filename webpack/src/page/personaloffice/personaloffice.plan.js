import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import infolist from 'part/infolist/infolist.hbs';
import personaloffice from './personaloffice.hbs';


module.exports = personaloffice({
    title: '我的办件',
    header,
    footer,
    mainnav,
    infolist
  })