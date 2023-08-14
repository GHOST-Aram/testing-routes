const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})


const db = mongoose.connnetion

db.on('error', console.error.bind(console, "Mongo connnetcion Error"))
