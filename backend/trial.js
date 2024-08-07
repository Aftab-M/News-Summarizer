const axios = require('axios');
const cheerio = require('cheerio');
const {getSummary} = require('./summarize')


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));








// ORIGINAL SCRAPING FUNCTIONS

async function fetchPage(url) {
    const response = await axios.get(url);
    // console.log('Got the response : ')
    // console.log(response)
    return response.data;
}

async function getNewsLinks(url) {
    const html = await fetchPage(url);
    const $ = cheerio.load(html);
    
    const newslinks = [];
    $('div.vjl-md-12').each((index, element) => {
        // const linkElement = $(element).find('a.lfn2e');
        const linkElement = $(element).find('a.crd_lnk');
        // console.log(linkElement)
        if (linkElement.length && linkElement.attr('href').includes('https://sports.ndtv.com')) {
            newslinks.push(linkElement.attr('href'));
        }
    });

    return newslinks;
}

async function getTitleAndDescription(newslinks) {
    const newses = [];
    
    for (const link of newslinks) {
        const fullLink = `${link}`;
        const html = await fetchPage(fullLink);
        const $ = cheerio.load(html);

        const title = $('h1.sp-ttl').text();
        const desc = $('div._s30J.clearfix').text();
        
        if (title && desc) {
            newses.push({ title: title.trim(), desc: desc.trim() });
        }

    }

    return newses;
}





















// GETTING SPORTS NEWS


async function getInternationalSportsNews() {
  const url = 'https://www.bbc.com/sport';
  let newses = [];
  let cnt = 0;
  try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const allNews = $('div.ssrcss-1va2pun-UncontainedPromoWrapper.eqfxz1e5');

      let newsLinks = [];

      allNews.each((index, element) => {
        if(cnt>=4) {return}
          const oneElement = $(element).find('a.ssrcss-zmz0hi-PromoLink.exn3ah91');
          const title = $(element).find('p.ssrcss-1nzemmm-PromoHeadline.exn3ah96').text();

          if (oneElement && oneElement.attr('href')) {
              if (title && !oneElement.attr('href').includes('/sounds/')) {
                  newsLinks.push({
                      linkk: oneElement.attr('href'),
                      titlee: title
                  });
                  cnt++;
              }
          }
      });

      

      for (const news of newsLinks) {
          const linkResponse = await axios.get('https://www.bbc.com' + news.linkk);
          const $$ = cheerio.load(linkResponse.data);

          const desc = $$('div.ssrcss-uf6wea-RichTextComponentWrapper.ep2nwvo0').text();

          if (desc) {
              newses.push({
                  title: news.titlee,
                  desc: desc, 
                  link: 'https://www.bbc.com'+news.linkk,
              });
          }
        console.log(news)
      }
      console.log(newses.length+" news from getInternationalSportsNews()")
      console.log(newses.length)

      for(var i in newses){
        console.log('Title  : '+newses[i].title+' with desc length : '+newses[i].desc.length)

          console.log('Summarizing the news : '+newses[i].title)
          try{
            getSummary(newses[i].title, newses[i].desc, newses[i].link, 'Sports');
          }
          catch(e){
            console.log('Got the error from getInternationalSportsNews()')
            console.log(e)
          }
          await delay(30000);


      }
     

  } catch (error) {
      console.error('Error fetching news:', error);
      return [];
  }
  
}






























// GETTING POLITICS NEWS

async function getIntPol() {
    const url = 'https://www.bbc.com/news';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const allNews = $('article.sc-9636e898-0.dYtsiK');
    const newsLinks = [];
    const newss = allNews.find('a.sc-2e6baa30-0.gILusN')
    const encounteredTitles = new Set();

    newss.each((index, element) => {
        const newsLink = $(element).attr('href')
        const title = $(element).find('h2.sc-4fedabc7-3.zTZri').text();

        if (newsLink && title && newsLink.includes('/news/articles/') && !encounteredTitles.has(title)) {
            encounteredTitles.add(title);
            newsLinks.push({ link: newsLink, title: title });
        }
    });
    console.log(newsLinks.length)

    var newses = [];

    for (const news of newsLinks) {
        const linkResponse = await axios.get('https://www.bbc.com' + news.link);
        const $$ = cheerio.load(linkResponse.data);
        const descriptions = $$('p.sc-eb7bd5f6-0.fYAfXe').slice(0, -2).map((index, element) => $(element).text()).get();
        const description = descriptions.join('. '); 
        
        newses.push({
            title: news.title, 
            desc: description, 
            link: 'https://bbc.com'+news.link
        });
        
    }







    // SUMMARIZATION
    console.log(`Summarizing ${newses.length} news for Politics in total`)
    for(var i in newses){
        console.log('Title  : '+newses[i].title+' with desc length : '+newses[i].desc.length)

          console.log('Summarizing the news : '+newses[i].title)
          try{
            getSummary(newses[i].title, newses[i].desc, newses[i].link, 'Politics');
          }
          catch(e){
            console.log('This exception is printed from trial.js')
            console.log(e)
          }
          await delay(20000);


      }


}   // getIntPol()






















// GETTING INDIAN / GENERAL NEWS


async function getIndiaNews() {
  const url = 'https://timesofindia.indiatimes.com/';

  try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const mainDiv = $('div.contentwrapper');

      const neo = $(mainDiv).find('div.nEjlO')
      const allNews = $(neo).find('div.col_l_6')
      
      let newsLinks = [];
      
      allNews.each((index, element) => {
          const oneElement = $(element).find('a.Hn2z7');
          const title = $(element).find('figcaption').text();

          if (oneElement.attr('href') && title!=undefined) {
                if(oneElement.attr('href').includes('https://')){
                  newsLinks.push({
                      linkk: oneElement.attr('href'),
                      titlee: title
                  });
          }
          }
      });

      console.log(newsLinks.length+" news from getIndiaNews()")
      let newses = [];

      for (const news of newsLinks) {
          const linkResponse = await axios.get(news.linkk);
          const $$ = cheerio.load(linkResponse.data);

          const desc = $$('div._s30J').text();

          if (desc) {
              newses.push({
                  title: news.titlee,
                  desc: desc, 
                  linkk: news.linkk
              });
          }
      }
      
      newses = newses.splice(5, 20)
      console.log(`Summarizing ${newses.length} news for India in total`)
      for(var i in newses){
          console.log('Summarizing the news : '+newses[i].linkk)
          try{
            getSummary(newses[i].title, newses[i].desc, newses[i].linkk, 'General');
          }
          catch(e){
            console.log('This exception is printed from trial.js')
            console.log(e)
          }
          await delay(20000);


      }

  } catch (error) {
      console.error('Error fetching news:', error);
      return [];
  }
}
















async function getAllNews(){
  
  await getInternationalSportsNews()

//   await getIntPol()
  
//   await getIndiaNews().then(()=>{
//     console.log('Done summarizing...!')
//     process.exit()
//   })

  
}


getAllNews()
