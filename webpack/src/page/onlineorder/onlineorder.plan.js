import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import onlineorder from './onlineorder.hbs';


module.exports = onlineorder({
    title: '网上预约',
    header,
    footer,
    mainnav
  })