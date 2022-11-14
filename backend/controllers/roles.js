import role from "../models/roles.js";

const regExpLetters = new RegExp("^[A-Z]+$", "i");

const registerRole = async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.permiss )
        return res.status(400).send({ message: "Datos incompletos" });
    if (!regExpLetters.test(req.body.name)) {
        return res
        .status(400)
        .send({ message: "The name must not contain numbers" });
    }
    const existingRole = await role.findOne({ name: req.body.name });
    if (existingRole)
        return res.status(400).send({ message: "El rol ya existe" });

    const roleSchema = new role({
        name: req.body.name,
        description: req.body.description,
        permiss: req.body.permiss,
        dbStatus: true,
    });

    const result = await roleSchema.save();
    return !result
        ? res.status(400).send({ message: "Ocurrió un error al registrar el rol. Intente nuevamente" })
        : res.status(200).send({ result });
};

const updateRole = async (req, res) => {
    const   name        = req.body.name,
            description = req.body.description,
            permiss     = req.body.permiss;

    if (!name || !description || !permiss) return res.status(400).send({ message: "Datos incompletos" });

    const existingRole = await role.findById({ _id: req.params["_id"] });

    if (!existingRole) return res.status(400).send({ message: "El rol que intenta actualizar no existe" });

    const roleUpdate = await role.findByIdAndUpdate(req.params["_id"], {
        name: name,
        description: description,
        permiss:permiss,
    });

    return !roleUpdate
        ? res.status(400).send({ message: "Error editanto el rol" })
        : res.status(200).send({ message: "Rol editado satisfactoriamente" });
};
export default { registerRole, updateRole };
