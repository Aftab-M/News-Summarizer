const mong = require('mongoose')

const News = new mong.Schema({
    newsTitle: String, 
    newsDesc: String,
    newsSummary: String,
    newsLink: String,
    newsDate: String, 
    newsTime: String, 
    newsCat: String,
})

module.exports = mong.model('News', News)