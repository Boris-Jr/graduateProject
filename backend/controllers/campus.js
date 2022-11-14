import campus from "../models/campus.js";

const registerCampus = async (req, res) => {

    const campusId = req.body.campus;
    const name = req.body.name;

    if (!name || !campusId) return res.status(400).send({ message: "Datos incompletos" });

    const existingCampus = await campus.findOne({ campusId: campusId });

    if (existingCampus) return res.status(400).send({ message: "Ya existe una sede con este código" });

    const campusSchema = new campus({
        campusId: campusId,
        name: name,
        dbStatus: true,
    });

    const result = await campusSchema.save();
    return !result
        ? res.status(400).send({ message: "Error al registrar la sede" })
        : res.status(200).send({ result });
};

const validateCampusId = async (req, res) => {

    const campusId = req.body.campus;

    if (!campusId) return res.status(400).send({ message: "No ha ingresado ningún código" });
    const existingCampus = await campus.findOne({ campusId: campusId });
    if (existingCampus) return res.status(400).send({ message: "Ya existe una sede con este código" });
}

const updateCampus = async (req, res) => {
    const campusId = req.body.campus;
    const name = req.body.name;

    if (!campusId || !name) return res.status(400).send({ message: "Datos incompletos" });

    const existingCampus = await campus.findOne({ campusId: campusId });

    if (!existingCampus) return res.status(400).send({ message: "La sede que intenta actualizar no existe" });

    const campusUpdate = await campus.findByIdAndUpdate( req.params["_id"], {
        name: req.body.name,
    });

    return !campusUpdate
        ? res.status(400).send({ message: "Error editanto la sede" })
        : res.status(200).send({ message: "Sede editada" });
};

const listCampus = async (req, res) => {
    const campusList = await campus.find( { dbStatus: true } );
    return campusList.length == 0
        ? res.status(400).send({ message: "No hay sedes registradas aún" })
        : res.status(200).send({ campusList: campusList });
};

const findCampus = async (req, res) => {
    const campusId = await campus.findById({ _id: req.params["_id"] });

    return !campusId
        ? res.status(400).send({ message: "No se encontraron resultados" })
        : res.status(200).send({ campus: campusId });
};

const deleteCampus = async (req, res) => {
    const existingCampus = await campus.findOne({ _id: req.params["_id"], dbStatus: false });

    if (existingCampus) return res.status(400).send({ message: "La sede que intenta eliminar no existe" });

    const campusDelete = await campus.findByIdAndUpdate({ _id: req.params["_id"] }, {
        dbStatus: false,
    });
    return !campusDelete
        ? res.status(400).send({ message: "Sede no encontrada" })
        : res.status(200).send({ message: "Sede eliminada satisfactoriamente" });
};

export default { registerCampus, validateCampusId, updateCampus, listCampus, findCampus, deleteCampus };
