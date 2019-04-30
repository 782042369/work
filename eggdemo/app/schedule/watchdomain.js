const cheerio = require('cheerio')
module.exports = app => {
  return {
    schedule: {
      interval: '5s',
      type: 'all'
    },
    async task(ctx) {
      // const url = "https://news.baidu.com/";
      // let result = await ctx.service.spider.requestUrl(url);
      // let htmldata = result.data.toString()
      // const $ = cheerio.load(htmldata, {
      //   decodeEntities: false
      // });
      // let title = $('title').html()
      // if (title !== '百度新闻——海量中文资讯平台') {
      //   console.log('网站挂了');
      // }
      // $('.hotnews').each(res => {
      //   console.log('res: ', $(this));
      // })
    }
  }
}
