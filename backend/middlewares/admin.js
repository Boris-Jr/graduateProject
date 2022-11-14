import roles from "../models/roles.js";

//Verifica que un usuario es de rol admin
const admin = async (req, res, next) => {
    const adminRole = await roles.findById(req.user.roleId);
    if (!adminRole) return res.status(400).send({ message: "Rol del usuario no encontrado" });

    return adminRole.name === "admin"
        ? next()
        : res.status(400).send({ message: "Usuario denegado" });
};

export default admin;
