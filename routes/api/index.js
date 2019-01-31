const router = require('express').Router();
const coinRoutes = require('./coins');
const userRoutes = require('./users');
const savedData = require('./saveData');

router.use('/coins', coinRoutes);
router.use('/dashboard', savedData);
router.use('/users', userRoutes);

module.exports = router;
