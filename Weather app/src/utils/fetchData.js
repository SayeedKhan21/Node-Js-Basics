const request = require('request')


const  fetchData = (q , callback) => {
    const url  = `https://api.weatherapi.com/v1/current.json?key=8b28169af9d543f095b12249231103&q=${q}`
    request({url : url  , json : true} , (err ,res) => {
        // console.log("err = " , err)
        if(res.body.error){
            console.log('Inside error')
            callback(res.body.error , undefined)
        }
        else{
            // console.log("here")
            // console.log(res.body)
            const data = {
                temp : res.body.current.temp_c ,
                rain : res.body.current.condition.text ,
                humidity : res.body.current.humidity
            }
           callback(undefined ,data)
            
        }
    })
}

module.exports  = fetchData