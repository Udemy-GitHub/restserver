const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
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
    validarCampos
], putUsers)

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailValidation),
    check('password', 'La contraseña debe tener más de 6 letras').isLength({ min: 6 }),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(roleValidation),
    validarCampos
], postUsers)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idValidation),
    validarCampos
], deleteUsers)

router.patch('/', patchUsers)

module.exports = router