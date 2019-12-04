const express = require('express');
const bodyparser = require('body-parser');
const config = require('config');
const heartbeatRouter = require('./routes/heartbeat');
const sendemailRouter = require('./routes/sendemail');


const app = express();
const port = config.get('port');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use('/api/v1/', heartbeatRouter);

app.use('/api/v1/', sendemailRouter);

const listen = app.listen(port, () => {
    console.log(`app is listening on port ${port}`);    
});


module.exports = app;
module.exports.port = listen.address().port;