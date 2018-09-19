const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const usersController = require('./user.controller.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', usersController.hello);
app.get('/users', usersController.findAll);
app.get('/users/:id', usersController.findOne);
app.post('/users/add', usersController.create);
app.put('/users/:id', usersController.update);
app.delete('/users/:id', usersController.delete);

app.listen(3123, () => console.log('Webhook server is listening, port 3123'));