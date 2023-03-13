const fs = require('fs')
const { demandOption } = require('yargs')
const yargs = require('yargs')
const {getNotes , addNote ,updateNote} = require('./utils')

// LIST NOTES
yargs.command({
    command : 'list' ,
    describe : 'List your notes' ,
    handler (){
       getNotes()
    }

})

yargs.command({
    command : 'add' ,
    describe : 'Add your notes' ,
    builder : {
        title : {
            describe : 'Add note' ,
            demandOption : true ,
            type : 'string' 
        }    ,
        body : {
            demandOption : true , 
            type : 'string'  ,
        }
    } , 
    handler(argv) {
        addNote(argv)
    }

})

yargs.command({
    command : 'update' ,
    describe : 'Update your notes' ,
    builder : {
        title : {
            describe : 'Note title' ,
            demandOption : true ,
            type : 'string' 
        }    ,

        newtitle : { 
            descibe : 'New title' ,
            type : 'string'
        } ,

        body : { 
            descibe : 'New Note body' ,
            type : 'string'
        }


        
    } , 
    handler : (argv) => {        
       updateNote(argv)
    }

})


yargs.parse()