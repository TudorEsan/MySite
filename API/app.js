const compression = require('compression');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv/config');
const https = require('https');
const fs = require('fs');
const dbName = 'crypto';
var db;
const options = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('cert.pem')
};

const app = express();
const messageRoutes = require('./routes/messages');
const cryptoRoutes = require('./routes/crypto')
const authRoute = require('./routes/auth');
const getRoute = require('./routes/privateRoute')
const verifyToken = require('./routes/verifyToken');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    poolSize: 10,
    useUnifiedTopology: true
    },
  () => {
        console.log("Connected to Database");
})

// Middlewares (runs something when a path is accesed)
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use('/messages', messageRoutes);
app.use('/auth/user', authRoute);
app.use('/private', verifyToken);
app.use('/private', getRoute);
app.use('/crypto', cryptoRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('Hellooo');
});


// Listen
https.globalAgent.maxSockets = Infinity;
https.createServer(options, app).listen(443, ()=> {
	console.log("statsad as");
})


