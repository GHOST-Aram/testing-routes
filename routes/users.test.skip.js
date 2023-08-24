const express = require('express')
const router = require('./users')
const request = require('supertest')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

describe('Post users route tests ', () =>{
    const createUser = jest.fn().mockImplementationOnce((
        requestBody
    )=>({
        first_name: requestBody.first_name,
        last_name: requestBody.last_name,
        email: requestBody.email,
        username: requestBody.username, 
        password: requestBody.password, 
    })).mockImplementationOnce((
        requestBody
    )=>({
        first_name: requestBody.first_name,
        last_name: requestBody.last_name,
        email: requestBody.email,
        username: requestBody.username, 
        password: requestBody.password, 
    }))
    .mockName('createNewUser')
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
            expect(createUser).toHaveBeenCalledTimes(3)
            // createUser.mockReset()
            console.log('Mock Calls: ',createUser.mock.calls)
            console.log('Mock Name: ', createUser.getMockName())
            console.log('Mock results: ', createUser.mock.results)
            console.log('Mock Last Call: ', createUser.mock.lastCall)
        })
        
        
})

