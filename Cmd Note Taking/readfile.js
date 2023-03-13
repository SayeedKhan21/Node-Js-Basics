const fs = require('fs')
const { parse } = require('path')
const { json } = require('stream/consumers')


const buffer = fs.readFileSync('sampledata.json')
const parsedString = buffer.toString()

const jsondata = JSON.parse(parsedString)
const dummy = {
    "author" : 'xyz' ,
}

jsondata.push(dummy)
console.log(jsondata)

fs.writeFileSync('sampledata.json' , JSON.stringify(jsondata))