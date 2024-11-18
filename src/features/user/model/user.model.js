import ApplicationError from "../../../middleware/errorHandler.middleware.js";
export default class UserModel {
    constructor(user_id, name, phone_no, email, password) {
        this.user_id = `user_${user_id}`;
        this.name = name;
        this.phone_no = phone_no;
        this.email = email;
        this.password = password;
    }

    static registeringUser(body) {
        let { name, number, email, password } = body;
        let new_id = Users_db[Users_db.length-1].user_id;
        let id = new_id.split('_');
        let new_user = new UserModel(parseInt(id[1]) + 1, name, number, email, password);
        Users_db.push(new_user);
        return new_user;
    }

    static checkingCredentials(email, password) {
        let result = Users_db.find((user) => {
            return user.email == email && user.password == password;
        });
        if (!result) {
            throw new ApplicationError('Invalid Credentials', 401);
        }
        return {
            name: result.name,
            email: result.email,
            user_id: result.user_id
        }
    }
}

let Users_db = [
    new UserModel('1', "Himanshu Nishad", "1234567890", "himanshu@gmail.com", "12345"),
    new UserModel('2', "Bob Smith", "0987654321", "bob@example.com", "pass456"),
    new UserModel('3', "Carol White", "1122334455", "carol@example.com", "mypassword789"),
    new UserModel('4', "David Brown", "2233445566", "david@example.com", "securepass"),
    new UserModel('5', "Eve Black", "3344556677", "eve@example.com", "evepass321"),
    new UserModel('6', "Dipesh Pohanekar", "7049971284", "dipeshpohanekar1997@gmail.com", "12345"),
];

export {Users_db};

