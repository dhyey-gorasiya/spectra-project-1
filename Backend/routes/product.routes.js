const router = require('express').Router();
const controller = require('../controllers/product.controller');
const { auth } = require('../middleware/auth.middleware');

router.use(auth);
router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
module.exports = router;