const mong = require('mongoose')

const News = new mong.Schema({
    newsTitle: String, 
    newsDesc: String,
    newsLink: String,
})

module.exports = mong.model('News', News)