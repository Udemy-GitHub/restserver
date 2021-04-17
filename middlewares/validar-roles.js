

const adminRoleValidation = (req, res, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { role, name } = req.user

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es administrador`
        })
    }

    next()

}

const rolesValidation = ( ...args ) => {

    return (req, res, next) => {
        
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        console.log(req.user.role);

        if (!args.includes(req.user.role)) {
            return res.status(401).json({
                msg: `El servicio requiere alguno de estos roles: ${args}`
            })
        }

        next()

    }

}

module.exports = {
    adminRoleValidation,
    rolesValidation
}