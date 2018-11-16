const puppeteer = require('puppeteer');
const URL = 'https://gigazine.net/';

async function main() {
  const newsList = await fetchNewsList();
  console.log(newsList);
}

// 記事のタイトルとリンク一覧を取得
async function fetchNewsList(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const newsList = await extractionNews(page);

  browser.close();
  return newsList;
}

// 必要な情報のみ抽出
async function extractionNews(page) {
  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('div.card > h2 > a'))
            .map((value) => {
              return {
                title: value.title,
                link: value.href
              };
            })
            // 広告はtitleがないのでfilterで抜く
            .filter((value) => {
              return value.title !== '';
            });
  });
}

main();