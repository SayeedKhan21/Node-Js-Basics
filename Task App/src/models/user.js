const mongoose = require('mongoose')


const Schema = mongoose.Schema


const UserSchema = new Schema(
    {
        name  : {
            type : String ,
            required : [true , 'Why no name ? '] ,
            unique : true
        } ,
        age : {
            type : Number ,
            required : true ,
            validate : {
                validator(value){
                    if(value < 0){
                        throw new Error('Age must be positive')
                    }
                }
            }
        }
    }
)
const User = mongoose.model('User' , UserSchema)


module.exports = User