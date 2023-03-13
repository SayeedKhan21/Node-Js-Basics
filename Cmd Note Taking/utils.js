const fs = require('fs')

const getNotes =  () => {
    try {
        const buffer = fs.readFileSync('data.json')
        console.log('--- DISPLAYING ALL NOTES ---')
        const data = JSON.parse(buffer.toString())
        console.log(data)
    }
    catch(e){
        console.log('File not Found')
    }
}
const addNote =  (argv) => {

    let noteTitle = argv.title 
    let noteBody = argv.body 

    const buffer = fs.readFileSync('data.json')
    let arr = []
    if( buffer.length) {    
        arr = JSON.parse(buffer.toString())
    }
    const noteData = {
            "title" : noteTitle ,
            "body" : noteBody
        }
        
    arr.push(noteData)
    fs.writeFileSync('data.json' ,JSON.stringify(arr))

    console.log("Note added")
}
const updateNote =  (argv) => {
    let buffer = fs.readFileSync('data.json')
    buffer =  buffer.toString()
    let found = new Boolean(0)
    let data
    if(buffer.length){
         data = JSON.parse(buffer)

        for ( d of data) { 
            if( d.title  === argv.title){
                found = 1
                d.title = argv.newtitle 
                d.body = argv.body
            }
        }
    }
    if(!found) {
        console.log('No data present')
    }
    else {
        fs.writeFileSync('data.json' , JSON.stringify(data))
    }

}


module.exports = { 
    getNotes : getNotes ,
    addNote : addNote ,
    updateNote , updateNote
}
