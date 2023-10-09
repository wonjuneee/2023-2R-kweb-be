const express = require('express');
const router = require('./router.3.3');
const port = 3000;

const app = express();

app.use('/factorial', router);

app.listen(port, () => console.log(`Server listening on port ${port}`));