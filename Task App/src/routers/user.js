const express = require('express')
const User = require('../models/user')
const Task = require('../models/task')
const auth =  require('../middlewares/auth')
const router = express.Router()

router.post('/users' , async (req ,res) => {
    
    const newUser = new User(req.body)

    try {
        await newUser.save()
        const token = await newUser.generateAuthToken()
        res.status(201).send({newUser , token})
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/users/me/' ,auth , async (req ,res) => {

    res.send(req.user)
})

router.patch('/users/me' ,auth  , async (req , res) => {
    try{

        const allowedUpdates = ['name' , 'age' , 'password' , 'email']
        const updatesGiven = Object.keys(req.body)

        const isValid = updatesGiven.every((update) =>  allowedUpdates.includes(update))

        if(!isValid){
            return res.status(400).send({'msg' : 'Invalid property'})
        }

    
        allowedUpdates.forEach(async (update) => {
                req.user[update] = req.body[update]
        })

        await req.user.save()

        res.status(200).send(req.user)     
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.delete('/users/me/' , auth  , async (req ,res) => {
    try{
        await Task.deleteMany({user : req.user._id})
        // console.log(1)
        await User.deleteOne({_id : req.user._id})
        req.user = {}
        res.send("Deleted")
    }
    catch(e){
        res.send(e)
    }
})



router.post('/users/login' , async(req ,res) => {
    try{
        const user = await User.findByCredentials(req.body.email , req.body.password)
      
        const token = await user.generateAuthToken()

        res.send({user, token})
    }
    catch(e){
        res.status(400).send({'error' : 'Unable to login'})
    }

})


router.post('/users/logout/' ,auth , async (req, res)=> {

    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !==  req.token
        })

        await req.user.save()

        res.send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }

})


module.exports = router