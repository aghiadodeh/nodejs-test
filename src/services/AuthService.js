import jsonwebtoken from "jsonwebtoken";
import HttpService from "./HttpService";
import Constants from "../common/config/constants";

async function checkUser({ email, password }) {
    // dummyJson login depending on username & password,
    // and we depend on user email & password.
    // so we need get the user by email, so this logic is only a work around to achieve example scenario.
    const { users } = await HttpService.get(`${Constants.baseUrl}/users/filter?key=email&value=${email}&limit=1`);
    const user = users.find((user) => user.email == email && user.password == password);
    delete user.password;
    return user;
}

function generateToken(user) {
    const payload = { id: user.id, role: 'user' };
    return jsonwebtoken.sign(payload, process.env.jwt_secret ?? "*******");
}

export default {
    generateToken,
    checkUser,
}