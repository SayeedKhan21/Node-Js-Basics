const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const auth = require('../middlewares/auth')

router.get('/tasks' ,  async (req ,res) => {
    try { 
        const allTasks = await Task.find({})
        return res.send(allTasks)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/me' , auth , async (req ,res) => {

    try { 
        const tasks = await Task.find({user : req.user._id})
        if(!tasks){
            return res.status(404).send({'msg' : 'task not found'})
        }

        res.send(tasks)
    }
    catch(e){
        res.status(500).send(e)
    }
   
})
router.post('/tasks' ,auth , async (req ,res) => {
    const newTask = new Task(req.body)
    try {
        newTask.user = req.user._id  
        await newTask.save()
        await newTask.populate('user')
        console.log(newTask.user)
        res.status(201).send(newTask)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id' , async (req , res) => {
    try{

        const allowedUpdates = ['description' , 'completed']
        const updatesGiven = Object.keys(req.body)

        const isValid = updatesGiven.every((update) =>  allowedUpdates.includes(update))

        if(!isValid){
            return res.status(400).send({'msg' : 'Invalid property'})
        }

        const task = await Task.findByIdAndUpdate(req.params.id , req.body ,  {new : true , runValidators : true})
        if(!task){
            res.status(404).send('Task not Found')
        }
        res.status(200).send(task)     
    }
    catch(e){
        res.status(500).send(e)
    }
})



router.delete('/tasks/me' , async (req ,res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            res.status(404).send({'msg' : 'task not found'})
        }

        res.send({"msg" : 'Deleted'})
    }
    catch(e){
        res.send(e)
    }
})


module.exports = router

