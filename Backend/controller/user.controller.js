import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async(req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword
        });
        await createdUser.save();
        res.status(201).json({ user: createdUser._id, message: "User created"});
    } catch (error) {
        res.status(500).json({ message: "User creation failed" });
    }
}

export const login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        } else {
            res.status(200).json({
                message: "Logged in successfully", user: {
                    _id: user._id,
                
                    fullname: user.fullname,
                    email: user.email
                }
            });
        }
    } catch (error) {
        
    }
}