const router = require('express').Router();
router.use('/users', require('./user.routes'));
router.use('/images', require('./images.routes'));
router.use('/text', require('./text.routes'));

module.exports = router;
