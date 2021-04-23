const { Router } = require('express')
const { check } = require('express-validator')

const {
    jwtValidation,
    validateFields,
    adminRoleValidation
} = require('../middlewares')

const { getCategories,
    getCategory,
    putCategories,
    postCategories,
    deleteCategories } = require('../controllers/categories')

const { idCategoryValidation } = require('../helpers/db-validators')

const router = Router()

router.get('/', getCategories)

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idCategoryValidation),
    validateFields
], getCategory)

router.put('/:id', [
    jwtValidation,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idCategoryValidation),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], putCategories)

router.post('/',[
    jwtValidation,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], postCategories)

router.delete('/:id', [
    jwtValidation,
    adminRoleValidation,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idCategoryValidation),
    validateFields
], deleteCategories)

module.exports = router