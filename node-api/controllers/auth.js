const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/user");

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email});
    if (userExists) return res.status(403).json({ error: "Email is taken" });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "Signup succes! Please login." });
}

exports.signin = (req, res) => {
    // find user by email
    const {email, password} = req.body
    User.findOne({email}, (error, user) => {
        if(error || !user) {
            return res.status(401).json({
                error: "User with that email does not exist."
            });
        }
        // match email and password
        if(!userSchema.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }

        // generate a token with user id and secret
        const token = jwt.sign({_id: user.id}, process.env.JWT_SECREt);
        // presist the token as 't' in cookie with expiry date
        res.cookie("t", token, {expire: new Date() + 9999});
        // return response with user and token to front end client
        const {_id, name , email} = user;
        return res.json({token, user: {_id, name , email} });
    });
}