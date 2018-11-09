const axios = require('axios');
const cheerio = require('cheerio');
const URL = 'https://gigazine.net/';

function main(){
  axios.get(URL).then((res) => {
    if (res.status !== 200) {
      console.log('error');
      process.exit(1);
    }

    const $ = cheerio.load(res.data);
    const title = $('title').text();
    const newsList = $('#section > div > section > div > h2 > a > span').map(function(i, el) {
      const newsTitle = el.children[0].data;
      return newsTitle;
    }).get();

    console.log('ページタイトル:' + title);
    console.log(newsList);
  });
}

main();