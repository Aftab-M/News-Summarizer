const {GoogleGenerativeAI, GenerativeModel} = require("@google/generative-ai")
const express = require('express')
const app = express()
const cors = require('cors')
const genAI = new GoogleGenerativeAI('AIzaSyBxcscQ1qiX8pwECBYb7GbDC37B6BbkAVs');
const port = 3000
app.use(cors()) 
app.use(express.json())

const {scrapeNews} = require('./trr');


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



async function getSummaries(req, res){

    console.log('In getSummaries...')

    
    var newslist = await scrapeNews();

    const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
    
    // const result = await model.generateContent(prompt);
    // const resp = await result.response;

    newslist = newslist.splice(0,5);
    console.log(newslist)

    // AIzaSyBxcscQ1qiX8pwECBYb7GbDC37B6BbkAVs


    // const prompt = `Im giving you a news article. The title is  -  'May Narendra Modi become ...': Nitish Kumar's slip of tongue at Patna rally. -  and the description is - NEW DELHI: Bihar chief minister Nitish Kumar on Sunday accidentally, in a slip of tongue, said that he wishes for Narendra Modi to become the chief minister again, instead of saying Prime Minister. Kumar was campaigning in Patna for the ruling National Democratic Alliance (NDA)."Humaari ichha hai ki hum deshbhar me 400 se bhi zyaada seat jeeta, aur adarniya Narendra Modi ji fir mukhya mantri bane.Desh ka vikas ho, Bihar ka vikas ho, sab kuch ho (We wish to win over 400 seats across India and respected Narendra Modi should become chief minister again. Then India will develop, Bihar will develop, everything will happen)," Nitish Kumar said.Upon realizing his mistake, the 73-year-old leader was promptly corrected by other leaders on stage. He then clarified his statement, emphasizing that he meant for Narendra Modi to continue as the Prime Minister and lead the nation forward."Narendra Modi Pradhan Mantri toh hai hi. Hum toh keh rahe hai ki woh aage badhe. Hum yahi chahte hai (Narendra Modi is already the Prime Minister. I am saying that he will now move ahead. That is what I want)," Nitish Kumar said.The Lok Sabha elections are being conducted across seven phases for the 543 seats, with the results set to be announced on June 4.In Bihar, the BJP is contesting 17 out of the state's 40 seats. This marks a shift from its previous role as a supporting party to Nitish Kumar's Janata Dal United JD(U).Meanwhile, the Mahagathbandhan (Grand Alliance), the opposition coalition in Bihar, comprising the Rashtriya Janata Dal (RJD), Congress, and Left parties, has announced that the RJD, its largest constituent, will contest 26 seats.
    //                     I want you to summarize the title and the description in short. The summary should be at least 2 lines, and at most 5 lines.
    //                     The summary should summarize all the points given in the news. Even if you do not know the context of the news, still provide the summary based on description.
    //                     Do not generate anything else other than the summary.
        // `;

        const prompt = 'Hello, how are you ?';


        // const result = await model.generateContent(prompt);
        // const resp = await result.response;

        // console.log(resp.text());

    for(var i in newslist){

        const prompt = `Im giving you a news article. The title is  ${newslist[i].title}, and the description is ${newslist[i].desc}
                        I want you to summarize the title and the description in short. The summary should be at least 2 lines, and at most 5 lines.
                        The summary should summarize all the points given in the news. Even if you do not know the context of the news, still provide the summary based on description.
                        Do not generate anything else other than the summary.
        `;
        console.log('\nayyyyyy')
        console.log(newslist[i].title)

        console.log(newslist[i].desc.length)

        if ((i + 1) % 3 === 0) {
            console.log(`Waiting for 1 minute before processing item ${i+1}`);
            await delay(4000); // Wait for 1 minute
        }

        // const result = await model.generateContent(prompt);
        // const resp = await result.response;


        // console.log(resp.text())

        // await delay(65000);

    }   // for news


    

    



    // console.log('Response generated !')
    // res.send(resp.text());

    // console.log(resp.text());

}


// getSummaries()


























putIntoMongoDB()


module.exports = {getSummaries}