const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://timesofindia.indiatimes.com/');

  // Wait for the news list to load, adjust the selector accordingly
  await page.waitForSelector('/html/body/div[2]/div/div[3]/div[2]/div[4]/div[4]/div[2]/div', { timeout: 10000 });

  // Extract news headlines
  const headlines = await page.evaluate(() => {
    const newsList = document.querySelectorAll('/html/body/div[2]/div/div[3]/div[2]/div[4]/div[4]/div[2]/div');
    const headlinesArray = [];
    newsList.forEach(newsItem => {
    //   const headline = newsItem.textContent.trim();
    //   headlinesArray.push(headline);
    });
    return newsList;
  });

  console.log(headlines);

  await browser.close();
})();
