import header from 'part/header/header.hbs';
import footer from 'part/footer/footer.hbs';
import mainnav from 'part/mainnav/mainav.hbs';
import infolist from 'part/infolist/infolist.hbs';
import personalinteractdetail from './personalinteractdetail.hbs';


module.exports = personalinteractdetail({
    title: '我的建议',
    header,
    footer,
    mainnav,
    infolist
  })