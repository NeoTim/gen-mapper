const jsonfile = require('jsonfile');
const userfile = __dirname + '/users.json';

class Database {
    read() {
        return new Promise( (resolve, reject) => {
            jsonfile.readFile(userfile, (err, obj) => {
                if (err) {
                    return reject(err)
                }
                return resolve(obj);
            })
        })
    }

    write(data) {
        return new Promise( (resolve, reject) => {
            jsonfile.writeFile(userfile, data, {spaces: 2}, function(err) {
                if (err) return reject(err)
                resolve()
            })
        })
    }

    addUser(userData) {
        return this.read().then(data => {
            if (!userData.id) {
                userData.id = data.users.length;
                data.users.push(userData);
            }

            return this.write(data);
        })
    }

    getUserByEmail(email) {
        return this.read()
            .then(data => {
                return data.users.find(user => {
                    return user.email === email;
                })
            })
            .then(foundUser => {
                if (!foundUser) {
                    return Promise.reject('User not found')
                }
                return foundUser
            })
    }
}


module.exports = new Database();