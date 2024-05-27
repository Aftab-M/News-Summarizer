const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://timesofindia.indiatimes.com/';

async function getLinks() {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const titleElements = $('div.col_l_6');
        let newslinks = [];

        titleElements.each((index, element) => {
            const linkElement = $(element).find('a.Hn2z7.undefined');
            if (linkElement.length > 0) {
                const href = linkElement.attr('href');
                if (href) {
                    newslinks.push(href);
                }
            }
        });

        return newslinks;
    } catch (error) {
        console.error('Error fetching the main page:', error);
        return [];
    }
}

async function getTitleAndDescription(newslinks) {
    let newses = [];

    for (let link of newslinks) {
        try {
            const linkResponse = await axios.get(link);
            const $ = cheerio.load(linkResponse.data);

            const titleElement = $('h1.HNMDR');
            const descElement = $('div._s30J.clearfix');

            if (titleElement.length > 0 && descElement.length > 0) {
                newses.push({
                    title: titleElement.text(),
                    desc: descElement.text(), 
                    link: link
                });
            }
        } catch (error) {
            console.error('Error fetching the news link:', error);
        }
    }

    return newses;
}

async function scrapeNews() {
    const newslinks = await getLinks();
    const newses = await getTitleAndDescription(newslinks);
    // console.log(newses);
    return newses;
}


// scrapeNews()

module.exports = { scrapeNews };
















