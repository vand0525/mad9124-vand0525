// import errors here
const users = require('../models/users.json')

const create = ({name, email}) => {
    const newUser = {
        id: Date.now(),
        name,
        email,
    };

    users.push(newUser);

    return newUser;
}

const getAll = () => users;

module.exports = {
    create,
    getAll,
}