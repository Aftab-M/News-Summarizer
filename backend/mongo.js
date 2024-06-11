

// const {MongoClient, ServerApiVersion} = require('mongodb')
const mong = require('mongoose')







mong.connect("mongodb+srv://useraf:passnew@cluster0.awk4cby.mongodb.net/ainews?retryWrites=true&w=majority&appName=Cluster0");

const News = require('./models/News')


async function getNews(){

    var result = await News.find()
    .then((data)=>{
        // console.log(`Fetched ${data.length} news documents`)
        console.log(data)
    })

    process.exit()

}


async function addNews(newsTitle, newsSummary, newsLink, newsCat){
    var now = new Date()
    var todayDate = new Date().toISOString().split('T')[0];
    // var date = now.getDate() + '-' + parseInt(parseInt(now.getMonth())+1) + '-' + now.getFullYear()
    var todayTime = new Date().toISOString().split('T')[1];
    // var time = now.getHours() + '-' + now.getMinutes() + '-' + now.getMilliseconds()

    var result = await News.insertMany({'newsTitle': newsTitle, 'newsLink': newsLink, 'newsSummary': newsSummary, 'newsDate': todayDate, 'newsTime': todayTime, 'newsCat': newsCat})
    .then((res)=> console.log('Inserted successfully'))
    .catch((err)=> console.log('Got error : ',err))
}


function checkDateTime(){
    var now = new Date()
    const todayDate = new Date().toISOString().split('T')[0];
    const todayTime = new Date().toISOString().split('T')[1];
    console.log(todayDate);
    console.log(todayTime)
    // var date = now.getDate() + '-' + parseInt(parseInt(now.getMonth())+1) + '-' + now.getFullYear()
    // var time = now.getHours() + '-' + now.getMinutes() + '-' + now.getMilliseconds()
    // console.log(date)
    process.exit()
}



// THIS IS TO MAKE ANY VALUE-BASED CHANGES IN THE DATA ALREADY EXISTING IN THE DB
async function makeChanges(){
    // News.updateOne({newsTitle: `Master 360° management with IIM Lucknow's program`}, {newsLink: 'https://timesofindia.indiatimes.com/india/rajeev-chandrasekhar-smriti-irani-and-anurag-thakur-not-in-modi-3-0-cabinet/articleshow/110847093.cms'})
    // .then((res)=>{
    //     console.log('Updated !')
    //     console.log(res)
    // })
    // .catch((err)=>{
    //     console.log("got error : ")
    //     console.log(err)
    // })

    News.deleteOne({newsTitle: `Birla Estates sets a new benchmark in Uber luxury real estate`})
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })

    // News.find({newsLink: 'https://timesofindia.indiatimes.com/india/rajeev-chandrasekhar-smriti-irani-and-anurag-thakur-not-in-modi-3-0-cabinet/articleshow/110847093.cms'})
    // .then((res)=>{
    //     console.log('Updated !')
    //     console.log(res)
    // })
    // .catch((err)=>{
    //     console.log("got error : ")
    //     console.log(err)
    // })
}


makeChanges()


// checkDateTime()

// getNews()


module.exports = {getNews, addNews}