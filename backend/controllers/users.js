import user from "../models/users.js";
import role from "../models/roles.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const regExpLetters = new RegExp("^[A-Z]+$", "i");
const regExpEmail = new RegExp("^[^@]+@[^@]+.[a-zA-Z]{2,}$", "i");

const registerUser = async (req, res) => {
  //Validamos que vengan todos los datos
if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.numberPhone
)
    return res.status(400).send({ message: "Incomplete data" });
  //Validamos que el nombre no contenga números
if (!regExpLetters.test(req.body.name)) {
    return res
    .status(400)
    .send({ message: "The username must not contain numbers" });
}
  //Validamos que el email esté bien escrito
if (!regExpEmail.test(req.body.email)) {
    return res
    .status(400)
    .send({ message: "It seems your email has typos. Give it another try!" });
}
  //Validamos que no exista actualemnte un usuario registrado con ese email
const existingUser = await user.findOne({ email: req.body.email });
if (existingUser)
    return res.status(400).send({ message: "The user is already registered" });

  //Se encripta la contraseña
const passHash = await bcrypt.hash(req.body.password, 10);

  //Validamos que el rol de usuario exista en la base de datos
const roleId = await role.findOne({ name: "user" });
if (!roleId) return res.status(400).send({ message: "No role was assigned" });

const userRegister = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    numberPhone: req.body.numberPhone,
    roleId: roleId._id,
    dbStatus: true,
});

  //Se envía el usuario a la base de datos
const result = await userRegister.save();

try {
    //Retornamos el token
    return res.status(200).json({
    token: jwt.sign(
        {
        _id: result._id,
        name: result.name,
        roleId: result.roleId,
        iat: moment().unix(),
        },
        process.env.SK_JWT
    ),
    userName: result.name,
    });
} catch (e) {
    return res.status(400).send({ message: "Register error" });
}
};

const login = async (req, res) => {

    if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

const userLogin = await user.findOne({ email: req.body.email });
if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

const hash = await bcrypt.compare(req.body.password, userLogin.password);
if (!hash)
    return res.status(400).send({ message: "Wrong email or password" });

try {
    return res.status(200).json({
    token: jwt.sign(
        {
        _id: userLogin._id,
        name: userLogin.name,
        roleId: userLogin.roleId,
        iat: moment().unix(),
        },
        process.env.SK_JWT
    ),
    userName: userLogin.name,
    });
} catch (e) {
    return res.status(400).send({ message: "Login error" });
}
};

export default { registerUser, login };
