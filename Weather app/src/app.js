const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const fetchData = require('./utils/fetchData')



const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath =  path.join(__dirname , '../views')


//setup handlebars engine and views directory
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/' , (req ,res) => {
    const data = {
        title : 'This is weather app'  ,
        body : 'Get weather of any country'
    }
    res.render('index' , data)
})

app.get('/weather' , (req ,res) => {
    // console.log(1)
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    let weatherData  = {}
    fetchData(req.query.address , (err ,data) =>{
        if(err){
            
            return res.send({
                error : 'Unable to fetch weather'
            })
        }
        else {
            res.send(data)
        }
    })
})

app.get('*' , (req ,res )=> {
    res.render('404')
})

app.listen(3000 , () =>{
    console.log('server running on port 3000')
})