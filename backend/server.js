const express = require('express')
var cors = require('cors');
const app = express()
let bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();



// const posts = [
//     { message: 'first post' },
//     { message: 'second post 34' }
// ]
var UserData = require('./models/User.js');
app.use(cors())
app.use(bodyParser.json())
app.use((req,res,next)=>{
    console.log('request URL!!!!!!!!!',req.url)
    next();
})

// app.get('/posts', cors(), (req, res) => {
//     res.send(posts);
// })

app.post('/register', cors(), async (req, res) => {
    try {
        const userData = req.body;
        let user = new UserData(userData);
        //console.log('new user-', user)
        user.save((err, result) => {
            if (err)
                console.log('saving user error')
            //res.send(200);
            res.send(result)
        })
    } catch (error) {
        console.log('error', error)
    }
})

app.post('/login', cors(), async(req, res)=>{
    console.log('login');
    try {
        const userData = req.body.email;
        console.log('userData', userData);
        const user = await UserData.findOne({ userData })  //request to database
        console.log('userLogin', user);
        res.send(200);      
    } catch (error) {
        console.log('something went wrong', error);
    }
})



//Set up default mongoose connection

mongoose.connect('mongodb+srv://user:1111@cluster0-olmgj.mongodb.net/Pluralsight?retryWrites=true&w=majority', { useMongoClients: true }, (err) => {
    if (!err) console.log('connected to mongo')
})



app.listen(3000);



