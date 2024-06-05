

const {MongoClient, ServerApiVersion} = require('mongodb')
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


async function addNews(newsTitle, newsSummary, newsLink){
    var now = new Date()
    var date = now.getDate() + '-' + parseInt(parseInt(now.getMonth())+1) + '-' + now.getFullYear()
    var time = now.getHours() + '-' + now.getMinutes() + '-' + now.getMilliseconds()

    var result = await News.insertMany({'newsTitle': newsTitle, 'newsLink': newsLink, 'newsSummary': newsSummary, 'newsDate': date, 'newsTime': time})
    .then((res)=> console.log('Inserted successfully'))
    .catch((err)=> console.log('Got error : ',err))
}


function checkDateTime(){
    var now = new Date()
    var date = now.getDate() + '-' + parseInt(parseInt(now.getMonth())+1) + '-' + now.getFullYear()
    var time = now.getHours() + '-' + now.getMinutes() + '-' + now.getMilliseconds()
    console.log(date)
    process.exit()
}


// checkDateTime()

getNews()


module.exports = {getNews, addNews}