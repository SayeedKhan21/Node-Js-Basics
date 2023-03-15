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
        // console.log(newTask.user)
        res.status(201).send(newTask)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id' ,auth , async (req , res) => {
    try{

        const allowedUpdates = ['description' , 'completed']
        const updatesGiven = Object.keys(req.body)

        const isValid = updatesGiven.every((update) =>  allowedUpdates.includes(update))

        if(!isValid){
            return res.status(400).send({'msg' : 'Invalid property'})
        }

        const task = await Task.findOne({_id : req.params.id , user : req.user._id})
        if(!task){
            return res.status(404).send('Cannot update this task')
        }

        updatesGiven.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()

        res.status(200).send(task)     
    }
    catch(e){
        res.status(500).send(e)
    }
})



router.delete('/tasks/:id' , auth , async (req ,res) => {
    try{
        const task = await Task.findOneAndDelete({_id : req.params.id , user: req.user._id})
        
        if(!task){
            return res.status(400).send({'msg' : 'Unable to delete'})
        }

        res.send({"msg" : 'Deleted'})
    }
    catch(e){
        res.send(e)
    }
})


module.exports = router

