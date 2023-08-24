const express = require('express')
const router = require('./users')
const request = require('supertest')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

describe('Post users route tests ', () =>{
    const createUser = jest.fn().mockImplementation( ()=>({
        first_name: 'John',
        last_name: 'Kennedy',
        email: 'johnken@gmail.com',
        username: 'John', 
        password: 'password', 
    }))
    
    app.use(router({ createUser }))
    
    test('Returns content type application/json', async() =>{
        const response = await request(app).post('/user')
            .type('form')
            .send({
                first_name: 'John',
                last_name: 'Kennedy',
                email: 'johnken@gmail.com',
                username: 'John', 
                password: 'password', 
            })
            .set('Accept', 'application/json')
        
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.status).toEqual(200)
            expect(response.body).toStrictEqual({
                first_name: 'John',
                last_name: 'Kennedy',
                email: 'johnken@gmail.com',
                username: 'John', 
            })
            expect(createUser).toHaveBeenCalled()
            expect(createUser).toHaveBeenCalledWith({
                first_name: 'John',
                last_name: 'Kennedy',
                email: 'johnken@gmail.com',
                username: 'John', 
                password: 'password', 
            })
            expect(createUser).toHaveBeenCalledTimes(1)
        })
           

})

