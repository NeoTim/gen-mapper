const router = require('express').Router();
const database = require('./database');

router.post('/login', (req, res)=> {
    
    if (!req.body.email) {
        return res.error(404)
    }
    console.log(req.body)

    database.getUserByEmail(req.body.email)
        .then(user => {
            console.log(user)
            if (user.password === req.body.password) {
                delete user.password;
                return res.json(user);
            }
            return res.error(404);
        })
        .catch( err => {
            res.sendStatus(404);
        })
})

module.exports = router;