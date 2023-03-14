const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

require('./db/mongoose')


const app = express()
const port  = process.env.PORT || 3000


app.use(express.json())



app.use(userRouter)
app.use(taskRouter)

// const myfunc =  async () => {
//     const mypass = 'sk1234'
//     const password = await bcrypt.hash(mypass ,8)
//     console.log(password)
// }
// myfunc()

app.listen(3000 , ()=> {
    console.log(`Server is running on port ${port}`)
})