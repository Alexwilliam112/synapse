require('dotenv').config();
const cors = require('cors');
const express = require('express');
const router = require('./routers');
const port = 3004;

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router)

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});