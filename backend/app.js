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
const User = require('./models/User')
const { trnslt } = require('./tests')



mong.connect("mongodb+srv://useraf:passnew@cluster0.awk4cby.mongodb.net/ainews?retryWrites=true&w=majority&appName=Cluster0");



app.get('/scrapenews', async(req, res)=>{
    // var result = await scrapeNews();
    // res.send(result);
    // console.log(result);
    // 
    // getSummaries()

})


app.post('/getnews', async(req, res)=>{
    var cat = req.body.cat;
    var date = req.body.dt;
    console.log(date);
    // console.log(cat)
    var allnews = await News.find({newsCat: cat, newsDate: date})
    console.log(`Got ${allnews.length} news from the DB`)
    if(allnews){
        res.send({'stat':['DONE'], 'general':allnews})
    }else{
        res.send({'stat':['YERRER']})
    }
})

app.post('/saveuser', async(req, res)=>{
    var user = req.body.user;
    console.log(user);
    try{
        var result = await User.findOneAndUpdate({email: user.email}, {$set: { email: user.email, email_verified: user.email_verified, family_name: user.family_name, given_name: user.given_name, last_login: new Date().toString(), name: user.name, nickname: user.nickname, picture: user.picture, sub: user.sub, updated_at: user.updated_at}}, {upsert: true, returnOriginal: false})
        res.send({msg: 'Verified'})
    }
    catch(e){
        console.log(e);
        res.send({msg: e});
    }
    
})



app.post('/translatee', async(req, res)=>{
    const items = req.body.items;
    const lang = req.body.lang;
    var t_items = [];
    // console.log(items);
    await Promise.all(items.map(async(item)=>{
        console.log(item['newsTitle'])
        var tr_t = await trnslt(item['newsTitle'], lang)
        // console.log(tr_t)
        var tr_d = await trnslt(item['newsSummary'], lang)
        // console.log(tr_d)
        t_items.push({newsTitle: tr_t, newsSummary: tr_d, newsLink: item['newsLink']})
    }))
    // console.log('-----------------------------------------------> t_items are : ')
    // console.log(t_items)
    res.send({t_items: t_items})
})








app.post('/searchnews', async(req, res)=>{
    var keyword = req.body.keyword;
    // console.log(keyword)
    const regex = new RegExp(keyword, 'i');
    var result = await News.find({
        $or: [
            {newsTitle: {$regex: regex}}, 
            {newsSummary: {$regex: regex}}, 
            {newsLink: {$regex: regex}},
        ]
    })
    console.log(result);
    res.send({news: result});
})










app.get('/', (req, res)=>{
    res.send('Ayo the server is running !');
})




app.listen(port, ()=>{
    console.log('Server is running...')
})