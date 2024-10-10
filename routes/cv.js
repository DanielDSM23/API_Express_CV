const router = require('express').Router();
const cvController = require('./../controllers/cv');
const { verifyUser } = require('../middlewares/jwt');

router.get('/', cvController.findAll);

router.get('/:id', cvController.findOneById);

router.post('/', verifyUser, cvController.create);

router.put('/:id');

router.delete('/:id');

module.exports = router;
