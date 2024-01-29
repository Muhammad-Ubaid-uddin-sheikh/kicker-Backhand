const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socket = require('./controllers/sockethandler');
const http = require('http');
require('dotenv').config();
const app = express();
const server = http.createServer(app);
socket(server);
app.use(bodyParser.json());
app.use(cors());

// routes
const playerRoutes = require('./routes/player');


// api routing
app.use('/api/player/', playerRoutes)

mongoose
    .connect(process.env.dburi)
    .then((result) => {
        server.listen(3000, () => {
            console.log('~~~~ server is up & running ~~~~~')
        });
    })
    .catch((err) => console.log(err));
