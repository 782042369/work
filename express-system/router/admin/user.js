import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('用户首页');
})

router.get('/add', (req, res) => {
  res.send('add增加用户');
})

export default router;
