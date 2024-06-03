const axios = require('axios');
const cheerio = require('cheerio');

// const url = 'https://timesofindia.indiatimes.com/sports';

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

async function getIndianSportsNews() {
  console.log('\n\n------------------------------------> Sports news are : ')

  const html = await fetchPage('https://sports.ndtv.com/');
    const $ = cheerio.load(html);



    // const newslinks = await getNewsLinks('https://sports.ndtv.com/');
    
    const newslinks = [];
    $('div.vjl-md-12').each((index, element) => {
        // const linkElement = $(element).find('a.lfn2e');
        const linkElement = $(element).find('a.crd_lnk');
        // console.log(linkElement)
        if (linkElement.length && linkElement.attr('href').includes('https://sports.ndtv.com')) {
            newslinks.push(linkElement.attr('href'));
        }
    });


    
    // const newses = await getTitleAndDescription(newslinks);

    const newses = [];
    
    for (const link of newslinks) {
        const fullLink = `${link}`;
        const htmll = await fetchPage(fullLink);
        const $_ = cheerio.load(htmll);

        const title = $_('h1.sp-ttl').text();
        const desc = $_('div._s30J.clearfix').text();
        
        if (title && desc) {
            newses.push({ title: title.trim(), desc: desc.trim() });
        }
}

// console.log(newses);
for (var i in newses){
  console.log(newses[i].title);
}
console.log(newslinks)

}









async function getInternationalSportsNews() {
  const url = 'https://www.bbc.com/sport';

  try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const allNews = $('div.ssrcss-1va2pun-UncontainedPromoWrapper.eqfxz1e5');

      let newsLinks = [];

      allNews.each((index, element) => {
          const oneElement = $(element).find('a.ssrcss-zmz0hi-PromoLink.exn3ah91');
          const title = $(element).find('p.ssrcss-1nzemmm-PromoHeadline.exn3ah96').text();

          if (oneElement && oneElement.attr('href')) {
              if (title && !oneElement.attr('href').includes('/sounds/')) {
                  newsLinks.push({
                      linkk: oneElement.attr('href'),
                      titlee: title
                  });
              }
          }
      });

      let newses = [];

      for (const news of newsLinks) {
          const linkResponse = await axios.get('https://www.bbc.com' + news.linkk);
          const $$ = cheerio.load(linkResponse.data);

          const desc = $$('div.ssrcss-uf6wea-RichTextComponentWrapper.ep2nwvo0').text();

          if (desc) {
              newses.push({
                  title: news.titlee,
                  desc: desc
              });
          }
      }
      console.log(newses)
      return newses;
  } catch (error) {
      console.error('Error fetching news:', error);
      return [];
  }
}














async function getPoliticalNews() {
  const url = 'https://www.bbc.com/news';

  try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const allNews = $('div.sc-52c2b1e7-2');
      // console.log(allNews)
      let newsLinks = [];

      allNews.each((index, element) => {
          const oneElement = $(element).find('a.sc-2e6baa30-0');
          const title = $(element).find('h2.sc-4fedabc7-3').text();

          // console.log(oneElement.attr('href'))
          // console.log("\n\n"+title)
          if (oneElement && oneElement.attr('href')) {
                if(!oneElement.attr('href').includes('https://')){
                  newsLinks.push({
                      linkk: oneElement.attr('href'),
                      titlee: title
                  });
          }
          }
      });

      // console.log(newsLinks)
      let newses = [];

      for (const news of newsLinks) {
          const linkResponse = await axios.get('https://www.bbc.com' + news.linkk);
          const $$ = cheerio.load(linkResponse.data);

          const desc = $$('p.sc-eb7bd5f6-0').text();

          if (desc) {
              newses.push({
                  title: news.titlee,
                  desc: desc
              });
          }
      }
      console.log(newses)
      return newses;
  } catch (error) {
      console.error('Error fetching news:', error);
      return [];
  }
}



















async function getIndiaNews() {
  const url = 'https://timesofindia.indiatimes.com/';

  try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const mainDiv = $('div.contentwrapper');

      const neo = $(mainDiv).find('div.nEjlO')
      const allNews = $(neo).find('div.col_l_6')
      // const allNews = $('div.');
      // console.log(allNews)
      let newsLinks = [];
      // console.log(allNews)

      allNews.each((index, element) => {
          // const oneDiv = $(element).find('div.col_l_6');
          const oneElement = $(element).find('a.Hn2z7');
          const title = $(element).find('figcaption').text();

          // console.log(oneElement.attr('href'))
          // console.log("\n\n"+"Title"+title)
          if (oneElement.attr('href') && title!=undefined) {
                if(oneElement.attr('href').includes('https://')){
                  newsLinks.push({
                      linkk: oneElement.attr('href'),
                      titlee: title
                  });
          }
          }
      });

      newsLinks.splice(0, 10)
      console.log(newsLinks.length)
      let newses = [];

      for (const news of newsLinks) {
          const linkResponse = await axios.get(news.linkk);
          const $$ = cheerio.load(linkResponse.data);

          const desc = $$('div._s30J').text();

          if (desc) {
              newses.push({
                  title: news.titlee,
                  desc: desc
              });
          }
      }
      console.log(newses.length)
      return newses;
  } catch (error) {
      console.error('Error fetching news:', error);
      return [];
  }
}
















// async function getPoliticalNews() {
//   console.log('\n\n------------------------------------> Political news are : ')
//   const newslinks = await getNewsLinks('https://timesofindia.indiatimes.com/elections/news');
//   const newses = await getTitleAndDescription(newslinks);
//   // console.log(newses);
//   for (var i in newses){
//     console.log(newses[i].title);
//   }
// }

async function getEventsNews() {

  console.log('\n\n------------------------------------> Events news are : ')
  const newslinks = await getNewsLinks('https://timesofindia.indiatimes.com/technology');
  const newses = await getTitleAndDescription(newslinks);
  // console.log(newses);
  for (var i in newses){
    console.log(newses[i].title);
  }
}


async function getAllNews(){
  
  
  // await getInternationalSportsNews()

  await getPoliticalNews();
  
  // await getIndiaNews();

  // await getEventsNews();
  // fetch news for each of the category
}


getAllNews()