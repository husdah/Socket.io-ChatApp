const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).json({ error: "Please provide all the details" });
        if (!validator.isEmail(email)) return res.status(400).json({ error: "Please provide a valid email" });
        if (!validator.isStrongPassword(password)) return res.status(400).json({ error: "Please provide a strong password" });

        let user = await userModel.findOne({ email });
        if(user) return res.status(400).json({ error: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await userModel.create({ name, email, password: hashedPassword });

        const token = createToken(user._id);
        return res.status(200).json({ _id: user._id, name, email, token });
    
    } catch (error) {
        console.log(error.message);
        //res.status(500).json(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ error: "Please provide all the details" });

        let user = await userModel.findOne({ email });
        if(!user) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = createToken(user._id);
        return res.status(200).json({ _id: user._id, name: user.name, email, token });
    }catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const findUser = async (req,res) => {
    try {
        const user = await userModel.findById(req.params.userId);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { registerUser, loginUser, findUser, getUsers };