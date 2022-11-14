import positions from "../models/positions.js";

const registerPosition = async (req, res) => {

    const positionId = req.body.position;
    const name = req.body.name;

    if (!name || !positionId) return res.status(400).send({ message: "Datos incompletos" });

    const existingPosition = await positions.findOne({ positionId: positionId });

    if (existingPosition) return res.status(400).send({ message: "Ya existe un cargo con este código" });

    const positionSchema = new positions({
        positionId: positionId,
        name: name,
        dbStatus: true,
    });

    const result = await positionSchema.save();
    return !result
        ? res.status(400).send({ message: "Error al registrar el cargo" })
        : res.status(200).send({ result });
};

const updatePosition = async (req, res) => {
    const positionId = req.body.position;
    const name = req.body.name;

    if (!positionId || !name) return res.status(400).send({ message: "Datos incompletos" });

    const existingPosition = await positions.findOne({ positionId: positionId });

    if (!existingPosition) return res.status(400).send({ message: "El cargo que intenta actualizar no existe" });

    const positonUpdate = await positions.findByIdAndUpdate( req.params["_id"], {
        name: req.body.name,
    });

    return !positonUpdate
        ? res.status(400).send({ message: "Ocurrió un error editanto el cargo. Por favor intente nuevamente." })
        : res.status(200).send({ message: "Cargo editada" });
};

const listPosition = async (req, res) => {
    const positionList = await positions.find( { dbStatus: true } );
    return positionList.length == 0
        ? res.status(400).send({ message: "No hay cargos registrados aún" })
        : res.status(200).send({ campusList: positionList });
};

const findPosition = async (req, res) => {
    const positionId = await positions.findById({ _id: req.params["_id"] });

    return !positionId
        ? res.status(400).send({ message: "No se encontraron resultados" })
        : res.status(200).send({ campus: positionId });
};

const deletePosition = async (req, res) => {
    const existingPosition = await positions.findOne({ _id: req.params["_id"], dbStatus: false });

    if (existingPosition) return res.status(400).send({ message: "La sede que intenta eliminar no existe" });

    const campusDelete = await positions.findByIdAndUpdate({ _id: req.params["_id"] }, {
        dbStatus: false,
    });
    return !campusDelete
        ? res.status(400).send({ message: "Cargo no encontrado" })
        : res.status(200).send({ message: "El cargo fue eliminado satisfactoriamente" });
};

export default { registerPosition, updatePosition, listPosition, findPosition, deletePosition };
