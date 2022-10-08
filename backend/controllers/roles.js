import role from "../models/roles.js";

const regExpLetters = new RegExp("^[A-Z]+$", "i");

const registerRole = async (req, res) => {
    if (!req.body.name || !req.body.description)
        return res.status(400).send({ message: "Incomplete data" });
    if (!regExpLetters.test(req.body.name)) {
        return res
        .status(400)
        .send({ message: "The name must not contain numbers" });
    }
    const existingRole = await role.findOne({ name: req.body.name });
    if (existingRole)
        return res.status(400).send({ message: "The role already exist" });

    const roleSchema = new role({
        name: req.body.name,
        description: req.body.description,
        dbStatus: true,
    });

    const result = await roleSchema.save();
    return !result
        ? res.status(400).send({ message: "Failed to register role" })
        : res.status(200).send({ result });
    };

export default { registerRole};
