const { Router } = require('express')
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { login, googleSignIn } = require('../controllers/auth');

const router = Router()

router.post('/login', [
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
 validateFields
], login)

router.post('/google', [
    check('id_token', 'El id token es necesario').not().isEmpty(),
 validateFields
], googleSignIn)

module.exports = router;