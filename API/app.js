const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv/config');

const app = express();
const messageRoutes = require('./routes/messages');
const authRoute = require('./routes/auth');
const getRoute = require('./routes/privateRoute')
const verifyToken = require('./routes/verifyToken');
mongoose.connect(process.env.DB_CONNECTION,
 { useNewUrlParser: true,
    useUnifiedTopology: true
    },
    ()=> {
        console.log("Connected to Database");
})

// Middlewares (runs something when a path is accesed)
app.use(bodyParser.json());
app.use(cors());
app.use('/messages', messageRoutes);
app.use('/auth/user', authRoute);
app.use('/private', verifyToken);
app.use('/private', getRoute);

// Routes
app.get('/', (req, res) => {
    res.send('Hellooo');
});


// Listen
app.listen(8000);