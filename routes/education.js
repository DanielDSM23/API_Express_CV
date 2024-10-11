const router = require('express').Router();
const eduController = require('./../controllers/educations');
const { verifyUser } = require('../middlewares/jwt');

router.get('/', verifyUser, eduController.getAllEducations);

router.get('/:id', verifyUser, eduController.getEducation);

router.post('/', verifyUser, eduController.createEducation);

router.put('/:id', verifyUser, eduController.updateEducation);

router.delete('/:id', verifyUser, eduController.deleteEducation);

module.exports = router;
