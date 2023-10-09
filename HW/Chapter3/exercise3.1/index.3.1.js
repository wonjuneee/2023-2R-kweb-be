const express = require('express');
const router = require('./router.3.1');
const port = 3000;

const app = express();
app.use(express.urlencoded( {extended: true}));

app.use('/', router);

app.listen(port, () => console.log(`Server listening on port ${port}`));