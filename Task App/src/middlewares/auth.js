const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth  = async (req ,res ,next) => {
    try { 
        
        let token=  req.header('Authorization')
        token = token.split(' ')[1]
        const decoded = jwt.verify(token , 'random')
        
        const user = await User.findOne({_id : decoded._id , 'tokens.token'  : token })
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }
    catch(e){
        res.status(401).send({'msg' : 'Please authenticate'})
    }
}

module.exports  = auth