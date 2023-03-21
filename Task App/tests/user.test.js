const request =  require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

beforeEach(async() => {
    await User.deleteMany()
})


test('Should create a new user' , async() => {
    await request(app).post('/users').send(
        {
            name : "akash" ,
            age : 22 ,
            email : "ak22@example.com" ,
            password : "akash22"
        }
    )
    .expect(201)
})