const mongoose = require('mongoose')



mongoose.connect(process.env.MONGODB_URL , {
    useNewUrlParser : true ,
})
.then(() => {
    // console.log('Connected to database')
})

.catch((err) => {
    console.error(err)
})


