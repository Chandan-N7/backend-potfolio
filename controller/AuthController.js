const jwt = require("jsonwebtoken")
const User = require('../model/UserModel.js')
const { compare } = require("bcryptjs");


const maxAge = 1000 * 60 * 60 * 24 * 30;
const createJwt = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY,)
}
const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password are required")
        }
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(401).json({ message: "User already exist" })
        }
        const user = await User.create({ email, password });

        res.cookie("jwt", createJwt(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });


        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                admin: user.admin
            }
        })
    } catch (error) {
        console.log("signup error", error)
        return res.status(500).send("Internal Server Error")

    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password are required")
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("invalid credentials")
        }
        const auth = await compare(password, user.password);
        if (!auth) {
            return res.status(400).send("invalid credentials")
        }

        res.cookie("jwt", createJwt(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });


        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                admin: user.admin
            }
        })
    } catch (error) {
        console.log("signup error", error)
        return res.status(500)("Internal Server Error")
    }
}

const getUserInfo = async (req, res, next) => {
    try {
        const userData = await User.findById(req.userId)
        if (!userData) {
            return res.status(404).send("User with the given id is not found")
        }
        return res.status(201).json({
            userData: {
                id: userData.id,
                email: userData.email,
                admin: userData.admin
            }
        });

    } catch (error) {
        console.log("get user info error", error)
        return res.status(500)("Internal Server Error")
    }
}
module.exports = { signup, login, getUserInfo }