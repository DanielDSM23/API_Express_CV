const router = require('express').Router();
const professionalController = require('./../controllers/professional');
const { verifyUser } = require('../middlewares/jwt');

router.get('/:id', verifyUser, professionalController.find);

router.post('/', verifyUser, professionalController.create);

router.put('/:id', verifyUser, professionalController.update);

router.delete('/:id', verifyUser, professionalController.delete);

module.exports = router;
