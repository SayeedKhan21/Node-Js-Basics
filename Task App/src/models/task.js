const mongoose = require('mongoose')


const Schema = mongoose.Schema


const TaskSchema = new Schema(
    {
        description : {
            type : String  ,
            required : true  ,
            validate : {
                validator(value) {
                    if(value.length < 10){
                        throw new Error('Length of description must be greater then 10')
                    }
                }
            }
        } ,
        completed : {
            type : Boolean ,
            required : false ,
            default : false
        } , 

        user : {
            type : mongoose.Schema.Types.ObjectId ,
            required : true  ,
            ref : 'User'
        }
    }
)

TaskSchema.methods.toJSON = function(){
    const task = this 
    const taskObj = task.toObject()

    delete taskObj.user
    return taskObj
}

const Task = mongoose.model('Task' , TaskSchema)

module.exports  = Task