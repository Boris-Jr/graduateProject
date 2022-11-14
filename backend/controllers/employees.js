import employees from "../models/employees.js";

const registerEmployye = async (req, res) => {

    const   idEmployee  = req.body.idEmployee,
            documType   = req.body.documType,
            positionId  = req.body.positionId,
            name        = req.body.name,
            lastName    = req.body.lastName,
            numberPhone = req.body.numberPhone,
            mail        = req.body.mail;

    if (!(name || idEmployee || documType || positionId || lastName || numberPhone || mail))
        return res.status(400).send({ message: "Datos incompletos" });

    const existingEmployee = await employees.findOne({ idEmployee: idEmployee, documType: documType });

    if (existingEmployee) return res.status(400).send({ message: "El empleado ya se encuentra registrado" });

    const employeeSchema = new employees({
        idEmployee: idEmployee,
        documType: documType,
        positionId: positionId,
        name: name,
        lastName: lastName,
        numberPhone: numberPhone,
        mail: mail,
        dbStatus: true,
    });

    const result = await employeeSchema.save();
    return !result
        ? res.status(400).send({ message: "Error al registrar el empleado" })
        : res.status(200).send({ result });
};

const updateEmployees = async (req, res) => {
    const   idEmployee  = req.body.idEmployee,
            documType   = req.body.documType,
            positionId  = req.body.positionId,
            name        = req.body.name,
            lastName    = req.body.lastName,
            numberPhone = req.body.numberPhone,
            mail        = req.body.mail;

    if (!(name || idEmployee || documType || positionId || lastName || numberPhone || mail))
        return res.status(400).send({ message: "Datos incompletos" });

    const existingEmployee = await employees.findOne({ idEmployee: idEmployee, documType: documType });

    if (!existingEmployee) return res.status(400).send({ message: "El empleado que intenta actualizar no existe" });

    const employeeUpdate = await employees.findByIdAndUpdate( req.params["_id"], {
        positionId: positionId,
        name: name,
        lastName: lastName,
        numberPhone: numberPhone,
        mail: mail,
    });

    return !employeeUpdate
        ? res.status(400).send({ message: "Error editanto al empleado" })
        : res.status(200).send({ message: "Empleado editado satisfactoriamente" });
};

const listEmployees = async (req, res) => {
    console.log(req.user)
    const employeesList = await employees.find({ dbStatus: true });
    return employeesList.length == 0
        ? res.status(400).send({ message: "No hay empleados registrados aún" })
        : res.status(200).send({ employeesList: employeesList });
};

const findEmployee = async (req, res) => {
    const employeeId = await employees.findById({ _id: req.params["_id"] });

    return !employeeId
        ? res.status(400).send({ message: "No se encontraron resultados" })
        : res.status(200).send({ employee: employeeId });
};

const deleteEmployee = async (req, res) => {

    const existingEmployee = await employees.findOne({ _id: req.params["_id"], dbStatus: false });

    if (!existingEmployee) return res.status(400).send({ message: "El empleado que intenta eliminar no existe" });

    const campusDelete = await employees.findByIdAndUpdate({ _id: req.params["_id"] },{
        dbStatus: false,
    });
    return !campusDelete
        ? res.status(400).send({ message: "empleado no encontrado" })
        : res.status(200).send({ message: "Empleado eliminado satisfactoriamente" });
};

export default { registerEmployye, updateEmployees, listEmployees, findEmployee, deleteEmployee };
