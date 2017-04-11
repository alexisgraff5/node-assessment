var express = require('express');
var bodyParser = require('body-parser');
var userCtrl = require('./userCtrl');

var app = express();
app.use(bodyParser.json());

app.get('api/users', function(req, res, next) {
    if(req.query.favorites) {
        res.status(200).json(userCtrl.getUsersByFavorite(req.query.favorites))
    } else if(req.query.age) {
        res.status(200).json(userCtrl.getUsersByAgeLimit(req.query.age))
    } else if(req.query.lastname) {
        res.status(200).json(userCtrl.findUserByQuery('last_name', req.query.lastname))
    } else if(req.query.email) {
        res.status(200).json(userCtrl.findUserByQuery('email', req.query.email))
    } else {
        res.status(200).json(userCtrl.readAll())
    }
});

app.get('/api/users/:userId', function(req, res, next) {
    if (!userCtrl.findUserById(req.params.userId)) {
        res.status(404);
    } else {
        res.status(200).json(userCtrl.findUserById(req.params.userId));
    }
});

app.get('/api/admins', function(req, res, next) {
    res.status(200).json(userCtrl.getAdmins())
});

app.get('/api/nonadmins', function(req, res, next) {
    res.status(200).json(userCtrl.getNonAdmins())
});

app.put('/api/users/:userId', function(req, res, next) {
    res.status(200).json(userCtrl.updateUser(req.params.userId, req.body))
});

app.post('/api/users', function(req, res, next) {
    res.status(200).json(userCtrl.createUser(req.body))
});

app.delete('/api/users/:userId', function(req, res, next) {
    res.status(200).json(userCtrl.removeUser(req.params.userId))
});


// app.listen(3000, function() {
//   console.log('listening');
// });

module.exports = app;