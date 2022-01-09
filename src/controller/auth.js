const User = require('../models/user'); 

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if (user) return res.status(400).json({
            message: "user already exist"
        });

        const {
            firstname,
            lastname,
            email,
            password
        } = req.body;

        const _user = new User({ 
            firstname, 
            lastname, 
            email, 
            password,
            username: Math.random().toString() 
        });

        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "Something went wrong"
                });
            }

            if (data) {
                return res.status(201).json({
                    message: "user created successfully"
                });
            }
        })
    })

}