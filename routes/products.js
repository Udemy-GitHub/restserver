const { Router } = require('express')
const { check } = require('express-validator')

const {
    jwtValidation,
    validarCampos,
    adminRoleValidation
} = require('../middlewares')

const { getProducts,
    getProduct,
    putProducts,
    postProducts,
    deleteProducts } = require('../controllers/products')

const { idProductValidation, idCategoryValidation } = require('../helpers/db-validators')

const router = Router()

router.get('/', getProducts)

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idProductValidation),
    validarCampos
], getProduct)

router.put('/:id', [
    jwtValidation,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idProductValidation),
    check('name', 'El nombre no puede quedar vacio')
        .optional().not().isEmpty(),
    check('category', 'La categoría no puede quedar vacía')
        .optional().not().isEmpty(),
    check('category', 'No es un ID válido').optional().isMongoId(),
    check('category').optional().custom(idCategoryValidation),
    check('price').optional().isFloat({ gt: 0 }),
    validarCampos
], putProducts)

router.post('/',[
    jwtValidation,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'La categoría es obligatoria').not().isEmpty(),
    check('category', 'No es un ID válido').isMongoId(),
    check('category').custom(idCategoryValidation),
    validarCampos
], postProducts)

router.delete('/:id', [
    jwtValidation,
    adminRoleValidation,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idProductValidation),
    validarCampos
], deleteProducts)

module.exports = router