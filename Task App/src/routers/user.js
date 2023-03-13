const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.post('/users' , async (req ,res) => {
    
    const newUser = new User(req.body)
    try {
        await newUser.save()
        res.status(201).send(newUser)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/users' , async (req ,res) => {
    try{
        const allUsers = await User.find({})
        res.status(200).send(allUsers)
    }
    catch(e){
        res.send(e)
    }
})

router.get('/users/:id' , async (req ,res) => {
    const id = req.params.id

    try{
        const user = await User.findById(id)
        if(!user ){
            res.status(404).send({'msg' : 'User not found'})
        }
        res.send(user)
    }
    catch(e){
        res.send(e)
    }
   
})


router.patch('/users/:id' , async (req , res) => {
    try{

        const allowedUpdates = ['name' , 'age']
        const updatesGiven = Object.keys(req.body)

        const isValid = updatesGiven.every((update) =>  allowedUpdates.includes(update))

        if(!isValid){
            return res.status(400).send({'msg' : 'Invalid property'})
        }

        const user = await User.findByIdAndUpdate(req.params.id , req.body ,  {new : true , runValidators : true})
        if(!user){
            res.status(404).send('User not Found')
        }
        res.status(200).send(user)     
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.delete('/users/:id' , async (req ,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            res.status(404).send({'msg' : 'User not found'})
        }

        res.send({"msg" : 'Deleted'})
    }
    catch(e){
        res.send(e)
    }
})


module.exports = router