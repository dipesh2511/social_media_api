// all third party imports are here
import jwt from 'jsonwebtoken';
import UserModel from '../model/user.model.js';

export default class UserController {
    registerUser(req, res) {
        let new_user = UserModel.registeringUser(req.body);
        res.status(201).send(new_user);   
    }


    loginUser(req, res) {
        let { email, password } = req.body;
        let user = UserModel.checkingCredentials(email, password);
        let token = jwt.sign(
            {
                name: user.name,
                email: user.email,
                user_id: user.user_id
            },
            "BFFBCEF58857622AF2939F57C8B16",
            {
                expiresIn: "2 days"
            }
        )
        res.set('authorization', `Bearer ${token}`).status(200).send(token);
    }
}