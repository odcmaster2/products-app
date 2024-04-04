const User = require('../models/user.model')
const logger = require('../logger/logger')

exports.findAll = async(req,res) =>  {
    console.log("find all users");

    try {
    const result = await User.find();
    res.status(200).json({data: result});
    logger.debug("success in reading all users");
} catch (err) {
    console.log(`problem, ${err}`)
 }}

exports.findOne = async(req,res) =>  {
    console.log("find user");

    const username = req.params.username;
    try {
        const result= await User.findOne({username: username});
        res.status(200).json({data: result});
    } catch (error) {
        console.log(`problem, ${error}`)
    }

}

exports.create = async(req,res) => {
    console.log("insert user")

    console.log(req.body);
    const newUser = new User ({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    });

    try {
        const result = await newUser.save();
        res.status(200).json({data: result});

        console.log("user saved")
    } catch(err) {
        res.status(400).json({data: err});
        console.log("problem in saving user")
    }

}

exports.update = async(req,res) => {
    const user = req.params.username;
    console.log("update user with username: " , username);

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    }

    try {
        const result = await User.findOneAndUpdate(
            {username: username},
            updateUser,
            {new: true}

        )
        res.status(200).json({data: result});
        console.log("success in updating user with username: " , username);
    }catch(err) {
        res.status(400).json({data: err});
        console.log("problem in update user: ", username )
    }


}

exports.delete = async(req,res) => {
    const username = req.params.username;
    console.log("delete user with username: " , username);
    try {
        const result = await User.findOneAndDelete({username: username});
        res.status(200).json({data: result});
        console.log("success in deleting user with username: " , username);
    } catch (err) {
        res.status(400).json({data: err});
        console.log("problem in deleting user")
    }
}