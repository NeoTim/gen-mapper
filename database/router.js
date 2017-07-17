const router = require('express').Router();
const database = require('./database');
const Users = require('./usermodel');

router.put('/:id', (req, res)=> {
    if (!req.body.email) {
        return res.sendStatus(404)
    }

    Users.update(req.body)
        .then(user => {
            // console.log(user)
            res.sendStatus(200);
        })
        .catch( err => {
            console.log(err)
            res.json({
                error: err
            })
        })
})

router.post('/login', (req, res)=> {
    
    if (!req.body.email) {
        return res.sendStatus(404)
    }
    
    Users.find(req.body.email)
        .then(user => {
            if (user.password === req.body.password) {
                delete user.password;
                return res.json(user);
            }
        })
        .catch( err => {
            res.sendStatus(404);
        })
});

router.post('/signup', (req, res)=> {
    
    if (!req.body.email || !req.body.password) {
        return res.sendStatus(404)
    }

    const user = {
        email: req.body.email,
        password: req.body.password
    };

    Users.create(user)
        .then(model => {
            delete newUser.password
            res.json(newUser);
        })
        .catch(err => {
            res.json({
                error: err
            });
        })
});




module.exports = router;