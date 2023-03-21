const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Task = require('./task')
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
        } ,
        email : {
            type : String ,
            unique : true ,
            required : true ,
            validate : {
                validator(value){
                    if(! validator.isEmail(value)){
                        throw new Error ('Enter valid email')
                    }
                }
            }
        } ,
        password : {
            type : String ,
            required : true ,
            validate : {
                validator(value){
                    if(value.length <= 3)
                        throw new Error('Password must be atleast of 3 characters')
                }
            }
        } ,
        tokens : [{
            token : {
                type :String , 
                required : true 
            }
        }] ,
        avatar : {
            type : Buffer
        }
    }
)



UserSchema.methods.toJSON = function(){
    const user = this
    // console.log(user)
    const userObject = user.toObject()
    // console.log(1)
    // console.log("userObject = " , userObject)

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

UserSchema.methods.generateAuthToken = async function(){
    const user = this 
    const token = jwt.sign({_id : user._id.toString()} , 'random')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token 
}

UserSchema.statics.findByCredentials = async (email , pass) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('User Not found')
    }

    const isMatch  = await bcrypt.compare(pass , user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

UserSchema.pre('save' , async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    next()
})




const User = mongoose.model('User' , UserSchema)


module.exports = User