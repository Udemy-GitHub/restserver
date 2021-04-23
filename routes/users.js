const { Router } = require('express')
const { check } = require('express-validator')

// const { jwtValidation } = require('../middlewares/validar-jwt')
// const { adminRoleValidation, rolesValidation } = require('../middlewares/validar-roles')
// const { validateFields } = require('../middlewares/validar-campos')
const {
    jwtValidation,
    adminRoleValidation,
    rolesValidation,
    validateFields
} = require('../middlewares')


const { roleValidation, emailValidation, idValidation } = require('../helpers/db-validators')

const { getUsers,
    putUsers,
    postUsers,
    deleteUsers,
    patchUsers } = require('../controllers/users')

const router = Router()

router.get('/', getUsers)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idValidation),
    check('role').custom(roleValidation),
    validateFields
], putUsers)

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailValidation),
    check('password', 'La contraseña debe tener más de 6 letras').isLength({ min: 6 }),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(roleValidation),
    validateFields
], postUsers)

router.delete('/:id', [
    jwtValidation,
    // adminRoleValidation,
    rolesValidation('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idValidation),
    validateFields
], deleteUsers)

router.patch('/', patchUsers)

module.exports = router