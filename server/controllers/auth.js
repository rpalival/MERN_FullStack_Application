import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import User from "../models/User.js";

// REGISTER USER
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); //this is how we send the savedUser data to the frontend in json format and response code 201
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGGING IN
// FYI: in a company either you will have a 3rd party authentication or a team that does the authentication.

/*
    This function handles user login by:

    Retrieving the email and password from the request body.
    Finding the user in the database using the email.
    Comparing the provided password with the stored hashed password.
    Generating a JWT token if the credentials are valid.
    Returning the token and user information (without the password) in the response.
    Handling errors appropriately by sending error messages in the response.
*/
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password; // so that it doesn't get sent back to frontend
        res.status(200).json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}