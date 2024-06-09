const mong = require('mongoose')

const User = new mong.Schema({
    given_name: String, 
    family_name: String,
    nickname: String,
    name: String,
    picture: String, 
    updated_at: String, 
    email: String,
    email_verified: Boolean,
    sub: String,
    last_login: String,
})

module.exports = mong.model('User', User)