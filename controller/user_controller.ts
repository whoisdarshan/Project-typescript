import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Userservice from '../services/user.services'
const userservice = new Userservice();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const signUp = async (req: Request, res: Response) => {
    try {
        let user = await userservice.getUser({ email: req.body.email, isDelete: false })
        // console.log(user);
        if (user) {
            return res.json({ message: "User is already register." })
        }
        let filepath: any;
        if (req.file) {
            filepath = `${req.file.path}`
        }
        let hashPassword = await bcryptjs.hash(req.body.password, 10);
        user = await userservice.addNewUser({ ...req.body, isDelete: false, password: hashPassword, profileImage: filepath });
        // console.log(user);
        // user.save();
        res.json({ user, message: "User create new account." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        let user = await userservice.getUser({ email: req.body.email, isDelete: false });
        console.log(user);
        if (!user) {
            return res.json({ message: "User invalid " });
        }
        const comparepassword = await bcryptjs.compare(req.body.password, user.password);
        console.log(comparepassword);
        if (!comparepassword) {
            return res.json({ message: "password is incorrect" });
        };
        let payLoad = {
            userId: user._id
        }
        let token = jwt.sign(payLoad, "darshan");
        console.log(token);

        res.json({ token, message: "user login successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        let user = req.user;
        res.json({ user, message: "Get Profile successful" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        let { oldPassword, newPassword, confirmPassword } = req.body;
        let user = await userservice.getUser(req.user._id)
        if (!user) {
            return res.json({ message: "User is not exist" });
        }
        let comparePassword = await bcryptjs.compare(oldPassword, user.password);
        if (!comparePassword) {
            return res.json({ message: "Password is incorrect." })
        }
        if (oldPassword == newPassword) {
            return res.json({ message: "OLD and NEW Password are same " })
        }
        if (newPassword != confirmPassword) {
            return res.json({ message: "NEW and CONFIRM password is not match." })
        }
        let hashNewPassword = await bcryptjs.hash(newPassword, 10)
        user = await userservice.updateUser(req.user._id, { password: hashNewPassword });
        res.json({ user, message: "User update Password success." });
    } catch (error) {

    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        let user = await userservice.getUser(req.user._id)
        if (!user) {
            return res.json({ message: "User is not found." })
        }
        let filepath: any;
        if (req.file) {
            filepath = `${req.file.path}`
        }
        user = await userservice.updateUser(req.user._id, { ...req.body, profileImage: filepath });
        res.json({ message: "User update profile successfull." })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteProfile = async (req: Request, res: Response) => {
    8
    try {
        let user = await userservice.getUser(req.user._id)
        if (!user) {
            return res.json({ message: "User is not found" })
        }
        user = await userservice.updateUser(req.user._id, { isDelete: true });
        res.json({ message: "User delete profile succesful." })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}