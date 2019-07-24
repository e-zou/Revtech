const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 9000;
const axios = require('axios');

app.use(cors());

app.get('/', (req, res) => {
    axios
        .get('https://randomfox.ca/floof')
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            console.log("couldn't get the fox: ", err);
        });
});

app.listen(PORT, () => {
    console.log("listening on the old porty port: " + PORT);
});