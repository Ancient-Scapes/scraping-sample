const puppeteer = require('puppeteer');
const URL = 'https://gigazine.net/';

async function main() {
  const newsList = await fetchNewsList();
  console.log(newsList);
}

async function fetchNewsList(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const newsList = await extractionNews(page);

  browser.close();
  return newsList;
}


async function extractionNews(page) {
  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('div.card > h2 > a'))
            .map((value) => {
              return {
                title: value.title,
                link: value.href
              }
            })
            .filter((value) => {
              return value.title !== ''
            });
  });
}

main();