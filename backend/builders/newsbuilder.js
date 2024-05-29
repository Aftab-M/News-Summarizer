
const News = require('../models/News')
const jwt = require('jsonwebtoken')
// const LocalStorage = require('node-localstorage').LocalStorage
const bcrypt = require('bcrypt')








async function getUser(req, res){
    try{
        const ii = req.params.id;
        // console.log('ID IS : '+ii)
        const user = await User.findOne({_id:ii})
        .then((user)=>{
            // console.log("FOUND EM" + user);
            res.json({user:user})
        })
        .catch((err)=>{console.log('NODE ERROR : '+err)})
        

       
        
    }catch(err){console.log('CAUGHT : '+err)}

}









module.exports = {userLogin, getUser, checkIfUserExists, checkIfEmailExists, registerUser, addNewVenture, getHomeData, addNewLearning, getLearnings, updateLearning, deleteLearning, toggleVisibility, getTopLearnings, getProfile}
