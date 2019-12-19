const express = require('express')
var cors = require('cors');
const app = express()
let bodyParser = require('body-parser');
var mongoose = require('mongoose');
//onst router = express.Router();

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


//function power(base, exponent) {
   // if(exponent == 0) { // 
        //return 1
   // }else {
        //return base * power(base, exponent - 1) //
        //return 2 * power(2, 3 - 1) //
   // }
//}
//console.log(power(2,3)) //8

//functio name() {
    //let m = ''dffsf
//     function name2() {
//         let m = 'sdsdsdsd'
            //return m +1
//     }
//    return name2
// }