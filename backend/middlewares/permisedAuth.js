import roles from "../models/roles.js";

//Verifica que un usuario es de rol admin
const admin = async (req, res, next) => {
    const authPermiss = await roles.findById(req.user.roleId);
    if (!authPermiss) return res.status(400).send({ message: "Rol del usuario no encontrado" });

    let permiss = authPermiss.permiss;
    let bolContinue = false;

    console.log(authPermiss);

    permiss = permiss.split(",");
    permiss.forEach(e => {
        if(e === "auth") bolContinue = true;
    });

    return bolContinue
        ? next()
        : res.status(400).send({ message: "Usuario denegado" });
};

export default admin;
