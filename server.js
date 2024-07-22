const express = require('express'); const app = express();
const mongoose = require('mongoose'); const User = require('./models');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/myapp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); db.once('open', () => { console.log('Connected to database'); });

app.get('/', (req, res) => { res.send('Hello World!'); });
app.post('/users', bodyParser.json(), (req, res) => {
    const user = new User({ name: req.body.name, email: req.body.email, age: req.body.age });
//    user.save((err, user) => { if (err) return console.error(err); res.send(user); });
    user.save()
    .then(function (user) {
        res.send(user);
    })
    .catch(function (err) {
    console.log(err);
    });
});
app.get("/users", function(req, res){
    User.find({})
    .then(foundItems => {
        res.send(foundItems);
    })
    .catch(err => {
        console.log(err);
    });
});        
app.put('/users/:id', (req, res) => {
    User.findOneAndUpdate( { _id: req.params.id }, { $set: req.body }, { new: true }, (err, user) => { if (err) return console.error(err); res.send(user); } );
});
app.delete('/users/:id', (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }, (err, user) => { if (err) return console.error(err); res.send(user); });
});
app.listen(3000, () => { console.log('Server running on port 3000'); });