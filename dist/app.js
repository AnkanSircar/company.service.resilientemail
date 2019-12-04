const express = require('express');
const bodyparser = require('body-parser');
const config = require('config');
const heartbeatRouter = require('./routes/heartbeat');
const sendemailRouter = require('./routes/sendemail');

const app = express();
const port = config.get('port');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/api/', heartbeatRouter);

app.use('/api/v1/', sendemailRouter);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
//# sourceMappingURL=app.js.map