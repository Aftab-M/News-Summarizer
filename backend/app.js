const express = require('express')
const app = express()
const cors = require('cors')
const mong = require('mongoose')

const port = 3000
app.use(cors()) 
app.use(express.json())

const {scrapeNews} = require('./trr');
// const {getSummaries} = require('./summarize')
const News = require('./models/News')



mong.connect("mongodb+srv://useraf:passnew@cluster0.awk4cby.mongodb.net/ainews?retryWrites=true&w=majority&appName=Cluster0");



app.get('/scrapenews', async(req, res)=>{
    // var result = await scrapeNews();
    // res.send(result);
    // console.log(result);
    // 
    // getSummaries()

})


app.get('/getnews', async(req, res)=>{
    var allnews = await News.find()
    console.log(`Got ${allnews.length} news from the DB`)
    if(allnews){
        res.send({'stat':['DONE'], 'general':allnews})
    }else{
        res.send({'stat':['YERRER']})
    }
})


app.get('/', (req, res)=>{
    res.send('Ayo the server is running !');
})




app.listen(port, ()=>{
    console.log('Server is running...')
})