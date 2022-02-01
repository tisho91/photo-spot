const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const spotsRoutes = require('./routes/spots.routes')
const usersRoutes = require('./routes/users.routes')
const HttpError = require('./models/http-error');
const fs = require('fs')
const path = require('path')
require('dotenv').config();
const app = express();


app.use(bodyParser.json());

const root = require('path').join(__dirname, '../client/build');
app.use(express.static(root))


app.use('/api/spots/', spotsRoutes);
app.use('/api/users/', usersRoutes);

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})


app.use((error, req, res, next) => {
    if (req.file) {
        console.log('ima file', req.file)
        fs.unlink(req.file.path, (err) => {
            console.log(err)
        })
    }
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' })

});

let uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@cluster0.6ehvq.mongodb.net/${ process.env.DB_NAME }?retryWrites=true&w=majority`;

mongoose.connect(uri).then(() => {
    app.listen(process.env.PORT || 3200);
}).catch((error) => {
    console.log(error)
})


