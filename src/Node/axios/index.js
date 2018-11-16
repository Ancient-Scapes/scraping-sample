const axios = require('axios');
const cheerio = require('cheerio');

async function main(){
  const newsList = await fetchNewsList();
  console.log(newsList);
}

function fetchNewsList() {
  return new Promise((resolve, reject) => {
    const URL = 'https://gigazine.net/';

    axios.get(URL).then((res) => {
      const $ = cheerio.load(res.data);
      resolve($('div.card > h2 > a').map(extractionNews).get());
    });
  });
}

function extractionNews(i, el) {
  // 最後の方にある広告は取得したくない
  if(!el.attribs.title) return;

  return {
    title: el.attribs.title,
    link: el.attribs.href
  }
}

main();