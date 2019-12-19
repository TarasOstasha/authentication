const express = require('express')
var cors = require('cors');
const app = express()
let bodyParser = require('body-parser');
var mongoose = require('mongoose');


const posts = [
    { message: 'first post' },
    { message: 'second post' }
]
var UserData = require('./models/User.js');
app.use(cors())
app.use(bodyParser.json())

app.get('/posts', cors(), (req, res) => {
    res.send(posts);
})

app.post('/register', cors(), async (req, res) => {
    try {
        console.log(req.body);
        const userData = req.body;
        let user = new UserData(userData);
        user.save((err, result) => {
            if (err)
                console.log('saving user error')
            //res.send(200);
            res.send(result)

        })
        //console.log(userData.email, userData.password)
    } catch (error) {
        console.log('error', error)
    }

})



//Set up default mongoose connection

mongoose.connect('mongodb+srv://user:1111@cluster0-olmgj.mongodb.net/Pluralsight?retryWrites=true&w=majority', { useMongoClients: true }, (err) => {
    if (!err) console.log('connected to mongo')
})



app.listen(3000);
