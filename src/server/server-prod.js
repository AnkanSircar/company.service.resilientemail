import express from 'express';
import bodyparser from 'body-parser';
import config from 'config';
import heartbeatRouter from '../routes/heartbeat';
import sendemailRouter from '../routes/sendemail';

const app = express();
const port = config.get('port');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use('/api/v1/', heartbeatRouter);

app.use('/api/v1/', sendemailRouter);

const listen = app.listen(port, () => {
  console.log(`app is listening on port ${port}`); // eslint-disable-line no-undef
});

export default {
  app,
  port: listen.address().port,
};
