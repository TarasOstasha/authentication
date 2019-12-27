const express = require('express')
var cors = require('cors');
var jwt = require('jwt-simple');
const app = express()
let bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');



// const posts = [
//     { message: 'first post' },
//     { message: 'second post 34' }
// ]
var UserData = require('./models/User.js');
mongoose.Promise = Promise;

app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
    //console.log('request URL!!!!!!!!!',req.url)
    next();
})

// app.get('/posts', cors(), (req, res) => {
//     res.send(posts);
// })

router.post('/register', cors(), async (req, res) => {
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

router.post('/login', cors(), async (req, res) => {
    //console.log('login');
    try {
        const loginData = req.body;
        //console.log('userData', userData.password);
        const user = await UserData.findOne({ email: loginData.email })  //request to database
        if (!user)
            return res.status(401).send({ message: 'email is not invalid' }) // - I don't understand, there was not status Ok from postman, but it should be 200
            bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
                if (!isMatch) return res.status(401).send({ message: 'email or password is not invalid' })
                //I have installed jwt JSON Web Token) encode and decode module for node.js
                const payload = {}
                const token = jwt.encode(payload, '123')
                //then I'm going to have token
                console.log('token', token);
                //res.sendStatus(200);
                res.status(200).send(token); // actually send token to front end? what's nex step?
        })




    } catch (error) {
        console.log('something went wrong', error);
    }
})

router.get('/users', cors(), async (req, res) => {
    try {
        const users = await UserData.find({}, '-password -__v') // request to data base 
        res.send(users);
        //the second method how to process users on backend 
        // const userMap = {}
        // users.forEach((user)=>{
        //     userMap[user.name] = user;
        // })
        // res.send(userMap);
    } catch (error) {
        res.sendStatus(500)
    }

})

router.get('/user/:id', cors(), async (req, res) => {
    try {
        console.log(req.params.id);
        const user = await UserData.findById(req.params.id) // request to data base 
        res.json(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

})


//Set up default mongoose connection

mongoose.connect('mongodb+srv://user:1111@cluster0-olmgj.mongodb.net/Pluralsight?retryWrites=true&w=majority', { useMongoClients: true }, (err) => {
    if (!err) console.log('connected to mongo')
})



app.listen(5000);

module.exports = router;


