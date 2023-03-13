const mongoose = require('mongoose')



mongoose.connect('mongodb://127.0.0.1:27017/TaskApiDB' , {
    useNewUrlParser : true ,
})
.then(() => {
    console.log('Connected to database')
})

.catch((err) => {
    console.error(err)
})


