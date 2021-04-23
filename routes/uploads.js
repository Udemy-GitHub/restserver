const { Router } = require('express')
const { check } = require('express-validator');

const { validateFile, validateFields } = require('../middlewares');

const { collectionValidation } = require('../helpers');

const { uploadFile, updateFile, getFile, updateFileCloudinary } = require('../controllers/uploads');


const router = Router()

router.post('/', validateFile, uploadFile)

router.put('/:collection/:id', [
    validateFile,
    check('collection').custom( c => collectionValidation( c, ['users', 'products'])),
    check('id', 'No es un ID válido').isMongoId(),
    validateFields
], updateFileCloudinary)

router.get('/:collection/:id', [
    check('collection').custom( c => collectionValidation( c, ['users', 'products'])),
    check('id', 'No es un ID válido').isMongoId(),
    validateFields
], getFile)

module.exports = router;