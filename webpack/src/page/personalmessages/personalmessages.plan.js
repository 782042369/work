import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import infolist from 'part/infolist/infolist.hbs';
import personalmessages from './personalmessages.hbs';


module.exports = personalmessages({
    title: '消息提醒',
    header,
    footer,
    mainnav,
    infolist
  })