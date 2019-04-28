import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import personalapply from './personalapply.hbs';


module.exports = personalapply({
    title: '办件详情',
    header,
    footer,
    mainnav
  })