
const News = require('../models/News')
// const jwt = require('jsonwebtoken')
// const LocalStorage = require('node-localstorage').LocalStorage
// const bcrypt = require('bcrypt')

// const {News} = require('../models/News')







async function getUser(req, res){
    try{
        // const ii = req.params.id;
        
        // const user = await User.findOne({_id:ii})
        // .then((user)=>{
        //     // console.log("FOUND EM" + user);
        //     res.json({user:user})
        // })
        // .catch((err)=>{console.log('NODE ERROR : '+err)})
        
        var resp = await News.find({});
        console.log(resp);
       
        
    }catch(err){console.log('CAUGHT : '+err)}

}





getUser()




module.exports = {}
