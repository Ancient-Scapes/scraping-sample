const puppeteer = require('puppeteer');
const URL = 'https://gigazine.net/';

async function main(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const title = await page.title();
  const newsListSelector = '#section > div > section > div > h2 > a > span';
  const newsList = await fetchEvaluateTextArray(page, newsListSelector);

  browser.close();

  console.log('ページタイトル:' + title);
  console.log(newsList);
}


const fetchEvaluateTextArray = async function(page, listSelector) {
  return page.evaluate((selector) => {
    const list = Array.from(document.querySelectorAll(selector));
    return list.map((data) => data.innerText);
  }, listSelector);
}

main();