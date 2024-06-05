const express = require('express')
const app = express()
const cors = require('cors')


const port = 3000
app.use(cors()) 
app.use(express.json())

const {scrapeNews} = require('./trr');
const {getSummaries} = require('./summarize')


app.get('/scrapenews', async(req, res)=>{
    // var result = await scrapeNews();
    // res.send(result);
    // console.log(result);

    // getSummaries()

})


app.get('/', (req, res)=>{
    res.send('Ayo the server is running !');
})




app.listen(port, ()=>{
    console.log('Server is running...')
})