const database = require('./database');


class UserModel {
    
    create(model) {
        return new Promise((resolve, reject) => {
            if (!model.email) return reject(new Error('Email is required'));
            
            this.find(model.email)
                .then(data => {
                    if (data) return reject(new Error('User already exists'))
                    return database.read()
                })
                .then(data => {
                    model.id = data.userIndex++;
                    data.users[model.email] = model;
                    return data.write(data);
                })
                .then(()=> {
                    return resolve(model);
                })
                .catch(err => {
                    reject(new Error('There was an error creating a new user'))
                })
        })
    }

    find(email) {
        return database.read()
            .then(data => {
                if (data.users[email]) {
                    return data.users[email];
                }
                return false;
            })
    }

    update(model) {
        return new Promise((resolve, reject) => {
            if (!model.email) return reject(new Error('Email is required'));
            
            this.find(model.email)
                .then(data => {
                    console.log(data)
                    if (!data) return reject(new Error('User does not exist'))
                    return database.read()
                })
                .then(data => {
                    // console.log(data.users)
                    data.users[model.email] = model;
                    return database.write(data);
                })
                .then(()=> {
                    return resolve(model);
                })
                .catch(err => {
                    console.log(err)
                    reject(new Error('There was an error updating user information'))
                })
        })
    }

    remove(model) {
        return new Promise((resolve, reject)=> {
            if (!model.email) return reject(new Error('Email is required'));

            this.find(model.email)
                .then(data => {
                    if (!data) return reject(new Error('User does not exist'));
                    return database.read()
                })
                .then(data => {
                    delete data.users[model.email];
                    
                    return database.write(data);
                })
                .then(()=> {
                    resolve()
                })
                .catch( err => {
                    return reject(new Error('There was an error deleting the user'))
                })
        })
    }
}



const userModel = new UserModel();
module.exports = userModel;