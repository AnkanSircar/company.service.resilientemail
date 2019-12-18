import express from 'express';

const router = express.Router();

router.get('/heartbeat', (req, res) => {
  let statusCode = 200;
  let statusDetails = 'heartbeat is ok';
  res.status(statusCode).send({statusCode, statusDetails});
});

export default router;
