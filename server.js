const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');


require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect( process.env.MONGODB_URI || 'mongodb+srv://iancarlo:mongodb@cluster0-cerfm.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Tu base de datos MONGODB ha sido actualizada y succesful")
});

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//MAKE SURE ITS AVAILABLE FOR PRODUCTION
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});