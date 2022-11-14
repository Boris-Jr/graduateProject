import elements from "../models/elemnets.js";

const registerElement = async (req, res) => {
    const   referenceName   = req.body.referenceName,
            serialNumber    = req.body.serialNumber,
            amount          = req.body.amount,
            destiny         = req.body.destiny,
            authId          = req.params["_authId"];

    if (!serialNumber || !referenceName || !amount || !destiny || !authId)
        return res.status(400).send({ message: "Datos incompletos" });

    const existingElements = await elements.findOne({ serialNumber: serialNumber });

    if (existingElements) return res.status(400).send({ message: "Ya existe una elemento con este número de serial" });

    let imageUrl = "";
    if (req.files) {
        if (Object.keys(req.files).length === 0) {
            imageUrl = "";
        } else {
            if (req.files.image) {
                if (req.files.image.type != null) {
                    const url = req.protocol + "://" + req.get("host") + "/";
                    const serverImg =
                        "./uploads/" + moment().unix() + path.extname(req.files.image.path);
                    fs.createReadStream(req.files.image.path).pipe(
                        fs.createWriteStream(serverImg)
                    );
                    imageUrl =
                        url +
                        "uploads/" +
                        moment().unix() +
                        path.extname(req.files.image.path);
                }
            }
        }
    }

    const elementSchema = new elements({
        serialNumber: serialNumber,
        referenceName: referenceName,
        amount: amount,
        desntiny: destiny,
        imageUrl: imageUrl,
        authId: authId,
        authStatus: "P",
        dbStatus: true,
    });

    const result = await elementSchema.save();
    return !result
        ? res.status(400).send({ message: "Ocurrió un error al registrar el elemento. Intente nuevamente" })
        : res.status(200).send({ result });
};

const updateElement = async (req, res) => {
    const referenceName = req.body.referenceName;
    const serialNumber = req.body.serialNumber;
    const amount = req.body.amount;
    const destiny = req.body.desntiny;

    if (!referenceName || !serialNumber || !amount || !destiny)
        return res.status(400).send({ message: "Datos incompletos" });

    const existingElement = await elements.findOne({ serialNumber: serialNumber });

    if (!existingElement) return res.status(400).send({ message: "El elemento que intenta actualizar no existe" });

    const elementUpdate = await elements.findByIdAndUpdate(req.params["_id"], {
        serialNumber: serialNumber,
        referenceName: referenceName,
        amount: amount,
        desntiny: destiny,
    });

    return !elementUpdate
        ? res.status(400).send({ message: "Error editanto el elemento" })
        : res.status(200).send({ message: "Elemento editado satisfactoriamente" });
};

const listElement = async (req, res) => {
    const elementList = await elements.find({ dbStatus: true });
    return elementList.length == 0
        ? res.status(400).send({ message: "No hay elementos registrados aún" })
        : res.status(200).send({ campusList: elementList });
};

const findElement = async (req, res) => {
    const elementId = await elements.findById({ _id: req.params["_id"] });

    return !elementId
        ? res.status(400).send({ message: "No se encontraron resultados" })
        : res.status(200).send({ campus: elementId });
};

const deleteElement = async (req, res) => {
    const existingElement = await elements.findOne({ _id: req.params["_id"], dbStatus: false });

    if (existingElement) return res.status(400).send({ message: "El elemento que intenta eliminar no existe" });

    const elementDelete = await elements.findByIdAndUpdate({ _id: req.params["_id"] }, {
        dbStatus: false,
    });
    return !elementDelete
        ? res.status(400).send({ message: "Elemento no encontrado" })
        : res.status(200).send({ message: "Elemento eliminado satisfactoriamente" });
};

const authElement = async (req,res) => {
    const   serialNumber    = req.body.serialNumber,
            authId          = req.params["_authId"],
            authNote        = req.body.authNote,
            authStatus      = req.body.authStatus,
            authBy          = req.user.name;

    let authLog,
        today = new Date(),
        now = today.toLocaleString();

    if (!serialNumber || !authId || !authStatus) return res.status(400).send({ message: "Datos incompletos" });

    const existingElement = await elements.findOne({ serialNumber: serialNumber, authId: authId, dbStatus: true });
    if (!existingElement) return res.status(400).send({ message: "El elemento que intenta autorizar fue eliminado" });

    authLog = existingElement.authLog + " [*] " + authStatus == "A"
            ? "Autorizado " : authStatus == "D" ? "Denegado " : "Pendiente ";
    authLog += serialNumber + " por " + authBy + " el " + now;

    const elementAuth = await elements.findByIdAndUpdate({ serialNumber: serialNumber, authId: authId }, {
        authNote: authNote,
        authStatus: authStatus,
        authBy: authBy,
        authLog: authLog,
    });
    return !elementAuth
        ? res.status(400).send({ message: "Ocurrió un error al momento de autorizar" })
        : res.status(200).send({ message: "Autorización aplicada satisfactoriamente" });
};


export default { registerElement, updateElement, listElement, findElement, deleteElement, authElement };
