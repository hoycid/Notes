const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
//const bodyParser = require('body-parser');

const app = express();

//Bodyparser middleware
app.use(express.json()); //app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log('[Error]: ' + err));

// Use Routes
app.use('/api/notes', require('./routes/api/notes'));
app.use('/api/users', require('./routes/api/users'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index,html'))
    });
}

const port = process.env.PORT || 3001;
        app.listen(port, () => console.log(`Server started on port ${port}`));