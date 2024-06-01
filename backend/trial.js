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
    const newslinks = await getNewsLinks('https://sports.ndtv.com/');
    const newses = await getTitleAndDescription(newslinks);
    console.log(newses);
    for (var i in newses){
      console.log(newses[i].title);
    }
    console.log(newslinks)
}

async function getPoliticalNews() {
  console.log('\n\n------------------------------------> Political news are : ')
  const newslinks = await getNewsLinks('https://timesofindia.indiatimes.com/elections/news');
  const newses = await getTitleAndDescription(newslinks);
  // console.log(newses);
  for (var i in newses){
    console.log(newses[i].title);
  }
}

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
  await getIndianSportsNews();
  // await getPoliticalNews();
  // await getEventsNews();
  // fetch news for each of the category
}


getAllNews()