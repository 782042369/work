import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import affairlist from './affairlist.hbs';


module.exports = affairlist({
    title: '个人办事',
    header,
    footer,
    mainnav
  })