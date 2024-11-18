import jwt from "jsonwebtoken";
import ApplicationError from "./errorHandler.middleware.js";


export default (req, res, next) => {
    let token = req.get('authorization');

    // checking token is present or not
    if (!token) {
        throw new ApplicationError("Please login", 401);
    } else {
        try {
            let result = jwt.verify(token, "BFFBCEF58857622AF2939F57C8B16");
            req.user = {
                name: result.name,
                email: result.email,
                user_id: result.user_id
            }
            
        } catch (err) {
            throw new ApplicationError(err,401);
        }

    }
    next();
};