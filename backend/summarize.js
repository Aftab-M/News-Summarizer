const {GoogleGenerativeAI, GenerativeModel} = require("@google/generative-ai")
const express = require('express')
const app = express()
const cors = require('cors')
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const genAI = new GoogleGenerativeAI('AIzaSyBxcscQ1qiX8pwECBYb7GbDC37B6BbkAVs');
const port = 3000
app.use(cors()) 
app.use(express.json())

const {addNews} = require('./mongo')


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



async function getSummary(title, desc, link, cat){

    console.log('In getSummaries...')
    try{
    

        const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash', safetySettings: []});

        const prompt = `Im giving you a news article. The title is : "${title}", and the description is : "${desc}". 
                        I want you to summarize the title and the description in short. The summary should be at least 2 line, and at most 4 lines. Act like you are giving this news directly to the viewers. The viewers do not have the description, but it is your job to provide the description. Do not let the viewers feel like you are summarizing it from a description. 
                        Do not use phrases like 'This article is about', 'This news is about', or anything similar. The summary should summarize all the points given in the news. Even if you do not know the context of the news, still provide the summary based on description. Cover everthing from the description.
                        The content is only a report of news, and does not mean any harm to anyone. It is totally safe. Do not generate anything else other than the summary.
        `;
        console.log('\nSummarizing...')
   
        const result = await model.generateContent(prompt);
        const resp = await result.response;
        const summary = resp.text();

        addNews(title, summary, link, cat)


        await delay(65000);


    }catch(e){
        console.log('Got exception while summarizing !')
        console.log(e)
    }
    


    // process.exit()
}


// getSummary()



module.exports = {getSummary}






















