const axios = require('axios');
const cheerio = require('cheerio');
// const { summarize } = require('node-summary');
const {getSummary} = require('./summarize')

// const url = 'https://timesofindia.indiatimes.com/sports';



const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));






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
  let newses = [];
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
      }
      // console.log(newses.length+" news from getInternationalSportsNews()")
      // console.log(newses)
      
      // summarizeNews(newses);

    //   newses = newses.splice()
    var n = newses.length
    // newses = newses.slice(3, n-2)
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

      const allNews = $('div.sc-b38350e4-1');
    //   console.log(allNews)
      let newsLinks = [];

      allNews.each((index, element) => {
          const oneElement = $(element).find('a.sc-2e6baa30-0');
        //   console.log(oneElement)
          const title = $(element).find('h2.sc-4fedabc7-3').text();
        // console.log(title)
          // console.log(oneElement.attr('href'))
          // console.log("\n\n"+title)
        //   if (oneElement && oneElement.attr('href')) {
                // if(!oneElement.attr('href').includes('https://')){
                  newsLinks.push({
                      linkk: oneElement.attr('href'),
                      titlee: title
                  });
        //   }
        //   }
      });

      console.log(newsLinks)
      let newses = [];

      for (const news of newsLinks) {
          const linkResponse = await axios.get('https://www.bbc.com' + news.linkk);
          const $$ = cheerio.load(linkResponse.data);

          const desc = $$('p.sc-eb7bd5f6-0').text();

          if (desc) {
              newses.push({
                  title: news.titlee,
                  desc: desc, 
                  link: 'https://www.bbc.com'+ news.linkk,
              });
          }
      }
      console.log(newsLinks.length+" news from getPoliticalNews()")
    //   console.log(newsLinks)
    //   return newses;
    // newses = newses.splice(2, 5)

    // for(var i in newses){
    //   console.log('Title  : '+newses[i].title+' with desc length : '+newses[i].desc.length)

    //     console.log('Summarizing the news : '+newses[i].title)
    //     getSummary(newses[i].title, newses[i].desc, newses[i].link, 'Politics');
    //     await delay(4000);


    // }
  } catch (error) {
      console.error('Error fetching news:', error);
      return [];
  }
}


















// async function getIntPol() {

async function getIntPol() {
    const url = 'https://www.bbc.com/news';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const allNews = $('article.sc-9636e898-0.dYtsiK');
    const newsLinks = [];
    const newss = allNews.find('a.sc-2e6baa30-0.gILusN')
    // console.log(newss)
    const encounteredTitles = new Set();

    newss.each((index, element) => {
        // const newsLink = $(element).find('a.sc-2e6baa30-0.gILusN').attr('href');
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
        // console.log(descriptions)
        const description = descriptions.join('. '); // Concatenate descriptions into a single string
        

        // console.log('Title:', news.title, '\n\n');
        // console.log(description,'\n\n\n\n')
        
        newses.push({
            title: news.title, 
            desc: description, 
            link: 'https://bbc.com'+news.link
        });
        
    }







    // SUMMARIZATION
    // newses.slice(4,19)
    // console.log(newses.length)
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

      // newsLinks.splice(0, 11)
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
      // console.log(newses)
      newses = newses.splice(5, 20)
      console.log(`Summarizing ${newses.length} news for India in total`)
    for(var i in newses){
        // console.log('Title  : '+newses[i].title+' with desc length : '+newses[i].desc.length)

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

  // await getIntPol()
  
  await getIndiaNews().then(()=>{
    console.log('Done summarizing...!')
    process.exit()
  })

  
}


getAllNews()



// function summarizeAllNews(){
//   const intNews = getInternationalSportsNews();
//   // const polNews = getPoliticalNews();
//   // const indNews = getIndiaNews();


//   for(var i in intNews){
//     console.log(intNews[i].title);
//   }


// }


// summarizeAllNews()




