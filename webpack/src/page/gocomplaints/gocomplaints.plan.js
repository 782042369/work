import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import gocomplaints from './gocomplaints.hbs';


module.exports = gocomplaints({
    title: '我要投诉',
    header,
    footer,
    mainnav
  })