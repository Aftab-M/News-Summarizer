const puppeteer = require('puppeteer')


async function scrape(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    

    // const [el] = await page.$x('//*[@id="main"]/div[2]/div/div[1]/div/article/div[5]/div[1]/div/div[1]/figure/a/div/picture/img')
    // const imgsrc = await el.getProperty('src')
    // const srcTxt = imgsrc.jsonValue()
    // console.log({srcTxt})

    const allArticles = await page.evaluate(()=>{
        const articles = document.querySelectorAll('article')
        console.log('in all articles')
        return Array.from(articles).slice(0,3).map((article)=>{
            const title = article.querySelector('h1').innerText
            const url = article.querySelector('a').href
            console.log({title, url})
            return {title, url}
        })
    })

    console.log(allArticles);



    browser.close();
}

scrape('https://synthedia.substack.com/p/adobe-firefly-is-here-its-free-its')