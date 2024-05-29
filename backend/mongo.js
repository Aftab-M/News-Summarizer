

const {MongoClient, ServerApiVersion} = require('mongodb')
const mong = require('mongoose')







mong.connect("mongodb+srv://useraf:passnew@cluster0.awk4cby.mongodb.net/ainews?retryWrites=true&w=majority&appName=Cluster0");

const News = require('./models/News')


async function getNews(){

    var result = await News.find()
    .then((data)=>{
        console.log(`Fetched ${data.length} news documents`)
    })

}


async function addNews(newsTitle, newsLink, newsSummary){
    var result = await News.insertMany({'newsTitle': newsTitle, 'newsLink': newsLink, 'newsSummary': newsSummary})
    .then((res)=> console.log('Inserted successfully'))
    .catch((err)=> console.log('Got error : ',err))
}





module.exports = {getNews, addNews}