const {GoogleGenerativeAI, GenerativeModel} = require("@google/generative-ai")
const express = require('express')
const app = express()
const cors = require('cors')
const genAI = new GoogleGenerativeAI('AIzaSyA4yVrlA6QZDcmDiSOjpiidqDNTrW_Y6ps');
const port = 3000
app.use(cors())
app.use(express.json())

const {scrapeNews} = require('./trr');


app.get('/scrapenews', async(req, res)=>{
    var result = await scrapeNews();
    res.send(result);
    console.log(result);

})


app.get('/', (req, res)=>{
    res.send('Ayo the server is running !');
})




app.listen(port, ()=>{
    console.log('Server is running...')
})