const index = require('./routes/index')
const express = require('express')
const request = require('supertest')
const assert = require('assert')
// const connectDB = require('./connections/mongoTestingConfig')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(index)


// connectDB()

test('index route works', done =>{
    try {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect({ name: 'frodo'})
            .expect(200, done)
    } catch (error) {
        console.error('Error occured during testing: ', error.message)
    }
})

test('post with array works', done =>{
    request(app)
        .post('/test')
        .type('form')
        .send({item: 'hey'})
        .then(() =>{
            request(app)
                .get('/test')
                .expect({ array: ['hey'] }, done)
        })
})

test('get user route works', done =>{
    request(app)
        .get('/user')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({ name: 'John', height: '56 inch', age: 45 }, done)
})


// test('responds with json', done =>{
//     request(app)
//         .post('/users')
//         .send({ name: 'John' })
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done)
// })

test('get workers route respons with json', () =>{
    request(app)
        .get('/workers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(resonse =>{
            assert(resonse.body.email, 'worker@work.com')
        })
        
})

test('get tasks route responds with json', async() =>{
    const response = await request(app)
        .get('/tasks')
        .set('Accept', 'application/json')

    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).toEqual(200)
    expect(response.body.tasks).toStrictEqual(['abc', 'xyz'])

})

test('Post user route returns user.name as case-insensitive match for john', async() =>{
    const response = await request(app)
        .post('/player')
        .send('name=JOHN')
        .set('Accept', 'application/json')
    response.body.name = response.body.name.toLowerCase()
    expect(response.body.name).toEqual('john')
    expect(response.body).toStrictEqual({ name: 'john'})
    expect(response.status).toEqual(200)

})

test('Sychronous test for post player works', done =>{
    request(app)
        .post('/player')
        .send('name=JOHN')
        .set('Accept', 'application/json')
        .expect((res) => res.body.name = res.body.name.toLowerCase())
        .expect(200)
        .expect({ name: 'john' }, done)
})

test('______________POST USER route works', async() =>{
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
       
})
